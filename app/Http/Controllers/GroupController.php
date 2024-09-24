<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupLang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortColumn = $request->input('sort', 'name');
        $sortOrder = $request->input('order', 'asc');
        $pagination = $request->input('perpage', 5);
        $searchTerm = $request->input('search');
        $query = GroupLang::query()->with(['group'])->where('id_lang','1');

        if ($searchTerm) {
            $query->where(function ($subquery) use ($searchTerm) {
                $subquery->where('name', 'like', '%' . $searchTerm . '%');
            });
        }
        
        $query->orderBy($sortColumn, $sortOrder);
        $list = $query->with(['group'])->paginate($pagination);

        return Inertia::render('Group/Index', [
            'list' => $list,
            'search' => $searchTerm, 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $find = GroupLang::where('id_group', $id)->get();
            foreach($find as $result) {
                $result->update_name($request['name']);
            }
            return back()->with([
                'type'    => 'success',
                'message' => 'Group Name Changed!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Something Wrong!',
            ]);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function listGroup()
    {
        $list = Group::get_list_group();

        return response()->json($list)->setStatusCode(200);
    }
}
