<?php

namespace App\Http\Controllers;

use App\Models\NavigationLink;
use App\Models\NavigationLinkChildren;
use App\Models\NavigationLinkRole;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortColumn      = $request->input('sort_by', 'label');
        $sortOrder       = $request->input('order_by', 'asc');
        $pagination      = $request->input('per_page', 20);
        $searchTerm      = $request->input('search');
        $navigation_link = Role::getList($searchTerm, $sortColumn, $sortOrder, $pagination);
        // dd($navigation_link);
        return Inertia::render('Admin/Role/Index', [
            'list'   => $navigation_link,
            'search' => $searchTerm,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $navigation_link = NavigationLink::where('active', 1)->get();
        $create          = true;
        return Inertia::render('Admin/Role/View', [
            'create'          => $create,
            'navigation_link' => $navigation_link,
        ]);
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
        $role            = Role::with(['navigationLink', 'navigationLinkChildren'])->find($id);
        $navigation_link = NavigationLinkChildren::getSelection();
        // $navigation_link = NavigationLink::where('active', 1)->get();
        // dd($navigation_link);
        return Inertia::render('Admin/Role/View', [
            'role'            => $role,
            'navigation_link' => $navigation_link,
        ]);
    }

    public function updateOrCreate(Request $request)
    {
        $id                          = $request->input('id');
        $name                        = $request->input('name');
        $id_navigation_children_link = $request->input('id_navigation_children_link');
        $action                      = $request->input('action');
        $id_navigation_link          = [];
        $explode_nav_link            = [];
        foreach ($id_navigation_children_link as $key => $value) {
            $explode_nav                                       = explode('-', $value);
            $explode_nav_link['id_navigation_link'][]          = $explode_nav[0];
            $explode_nav_link['id_navigation_link_children'][] = $explode_nav[1];
        }

        $role = Role::updateOrCreate(
            [
                'id' => $id,
            ],
            [
                'name'   => $name,
                'action' => $action,
            ],
        );
        NavigationLinkRole::createNavigationRoleThroughRole($role->id, $explode_nav_link);
        if (!empty($role->id)) {
            return redirect(route('role.index'))->with([
                'type'    => 'success',
                'message' => 'Record Succesfully updated',
            ]);
            // return to_route('role.index')->with([
            //     'type'    => 'success',
            //     'message' => 'Record Successfully Update.',
            // ]);
        }
        return to_route('role.index')->with([
            'type'    => 'success',
            'message' => 'Record Successfully Create.',
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $navigation_link_role = NavigationLinkRole::where('id_role', $id)->delete();
            $role                 = Role::destroy($id);

            return back()->with([
                'type'    => 'success',
                'message' => 'Record successfully deleted.',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type'    => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
