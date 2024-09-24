<?php

namespace App\Http\Controllers\Dashboard;

use App\Helpers\DataTableCustom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Logo;

class SettingLogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = collect([
            'model' => Logo::class,
            'searchableFields' => ['name'],
            'column' => 'status' 
        ]);
        $list = DataTableCustom::applyFilters($request, $data->toArray());

        return Inertia::render('Admin/Settings/Logo/Index', [
            'list' => $list
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
        $attr = $request->toArray();
        $attr['status'] = 0;
        $result = Logo::create($attr);
        if($result) {
            return back()->with([
                'type' => 'success',
                'message' => 'Logo has been added',
            ]);
        }        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        return Inertia::render('Admin/Settings/Logo/View', [
            
        ]);
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
        $topMenu = Logo::find($id);
        $attr = $request->except(['id', 'status']);

        try {
            $topMenu->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Successfull Update Logo'
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = Logo::find($id);
        if ($result) {
            $result->delete();
            return back()->with([
                'type' => 'success',
                'message' => 'Successfull Delete Logo'
            ]);
        }
    }

    public function live(Request $request)
    {
        try {
            $id = $request->id;
            Logo::where('id', '!=', $id)->update(['status' => 0]);
            Logo::where('id', $id)->update(['status' => 1]);

            return back()->with([
                'type' => 'success',
                'message' => 'Successfull Update Live Logo',
                'status' => true
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Something Wrong!',
            ]);
        }
    }
}
