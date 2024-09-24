<?php

namespace App\Http\Controllers;

use App\Helpers\DataTableCustom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Outlet;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = collect([
            'model' => Outlet::class,
            'searchableFields' => ['name'],
            'column' => 'position',
            'order' => 'asc',
        ]);
        $list = DataTableCustom::applyFilters($request, $data->toArray());

        return Inertia::render('Admin/Outlet/Index', [
            'list' => $list,
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
        $request->validate([
            'name' => 'required',
            'image' => 'required',
            'address' => 'required',
            'link' => 'required',
            'phone' => 'required',
            'status' => 'required',
        ]);
        
        $attr = $request->toArray();
        $attr['position'] = Outlet::count() + 1;
        $result = Outlet::create($attr);
      
        if($result) {
            return back()->with([
                'type' => 'success',
                'message' => 'Outlet has been added',
            ]);
        }     
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
        $request->validate([
            'name' => 'required',
            'image' => 'required',
            'address' => 'required',
            'link' => 'required',
            'phone' => 'required',
            'status' => 'required',
        ]);

        $outlet = Outlet::find($id);
        $attr = $request->except(['id', 'position']);

        try {
            $outlet->update($attr);
            return back()->with([
                'type' => 'success',
                'message' => 'Successfull Update Outlet'
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
        $result = Outlet::find($id);
        if ($result) {
            $result->delete();
            return back()->with([
                'type' => 'success',
                'message' => 'Successfull Delete Outlet'
            ]);
        }
    }

    public function changePosition(Request $request, string $id)
    {
        try {
            $vacancy = Outlet::find($id);
            $vacancy->updatePosition($request->position);

            return back()->with([
                'type' => 'success',
                'message' => 'Outlet has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function changeActive(Request $request, string $id)
    {
        try {
            $outlet = Outlet::find($id);
            $outlet->status = $request->status;
            $outlet->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Outlet has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
