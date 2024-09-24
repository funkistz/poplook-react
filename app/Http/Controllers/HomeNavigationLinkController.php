<?php

namespace App\Http\Controllers;

use App\Models\NavigationLink;
use App\Models\NavigationLinkChildren;
use App\Models\NavigationLinkRole;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeNavigationLinkController extends Controller
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
        $navigation_link = NavigationLink::getList($searchTerm, $sortColumn, $sortOrder, $pagination);
        // dd($navigation_link);
        return Inertia::render('Admin/NavigationLink/Index', [
            'list'   => $navigation_link,
            'search' => $searchTerm,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $role   = Role::get(['id AS value', 'name AS label']);
        $create = true;
        return Inertia::render('Admin/NavigationLink/View', [
            // 'navigation' => $navigation,
            'create' => $create,
            'role'   => $role,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $label   = $request->input('label');
        $icon    = $request->input('icon');
        $id_role = '';
        if (!empty($request->input('id_role'))) {
            # code...
            $id_role = implode(',', $request->input('id_role'));
        }
        $link = $request->input('link');

        NavigationLink::create([
            'label'   => $label,
            'icon'    => $icon,
            'id_role' => $id_role,
            'link'    => $link,
        ]);
        return to_route('navigation_link.index')->with([
            'type'    => 'success',
            'message' => 'New Navigation Link Added.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role       = Role::get(['id AS value', 'name AS label']);
        $navigation = NavigationLink::with(['role', 'NavigationLinkChildren'])->find($id);
        // dd($navigation);
        return Inertia::render('Admin/NavigationLink/View', [
            'navigation' => $navigation,
            'role'       => $role,
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

    public function updateOrCreate(Request $request)
    {
        $id          = $request->input('id');
        $label       = $request->input('label');
        $icon        = $request->input('icon');
        $id_role     = $request->input('id_role');
        $link        = $request->input('link');
        $single_link = $request->input('single_link');
        if (!empty($single_link) && empty($link)) {
            $link = strtolower(str_replace(' ', '_', $label)) . '.index';
        }
        // dd($link);
        $navigation_result = NavigationLink::updateOrCreate(
            [
                'id' => $id,
            ],
            [
                'label' => $label,
                'icon'  => $icon,
                // 'id_role' => $id_role,
                'link'  => $link,
            ],
        );

        if (!empty($single_link)) {
            $navigation_children_exist  = NavigationLinkChildren::where('id_navigation_link', $navigation_result->id)->first();
            $navigation_children_result = NavigationLinkChildren::updateOrCreate(
                [
                    'id' => (!empty($navigation_children_exist->id_navigation_link)) ? $navigation_children_exist->id_navigation_link : $navigation_children_exist,
                ],
                [
                    'id_navigation_link' => $navigation_result->id,
                    'label'              => $label,
                    'link'               => $link,
                ],
            );
        }

        // NavigationLinkRole::createNavigationRole($navigation_result['id'], $id_role);
        if (!empty($id) || !empty($navigation_result->id)) {
            $navigation_id = $id;
            if (!empty($navigation_result->id)) {
                $navigation_id = $navigation_result->id;
            }
            return to_route('navigation_link.show', $navigation_id)->with([
                'type'    => 'success',
                'message' => 'Record Successfully Update.',
            ]);
        }
        if (!empty($single_link)) {
            return to_route('navigation_link.index')->with([
                'type'    => 'success',
                'message' => 'Record Successfully Create.',
            ]);
        }
        return to_route('navigation_link.index')->with([
            'type'    => 'success',
            'message' => 'Record Successfully Create.',
        ]);
    }

    public function updateOrCreateChild(Request $request)
    {
        $id                 = $request->input('id');
        $id_navigation_link = $request->input('id_navigation_link');
        $label              = $request->input('label');
        $custom_link        = $request->input('custom_link');
        if (empty($custom_link)) {
            $link = strtolower(str_replace(' ', '_', $label)) . '.index';
        }
        if (!empty($custom_link)) {
            $link = $custom_link;
        }
        $navigation_result = NavigationLinkChildren::updateOrCreate(
            [
                'id' => $id,
            ],
            [
                'id_navigation_link' => $id_navigation_link,
                'label'              => $label,
                'link'               => $link,
            ],
        );
        // NavigationLinkRole::createNavigationRole($navigation_result['id'], $id_role);
        if (!empty($id)) {
            # code...
            return to_route('navigation_link.show', $id_navigation_link)->with([
                'type'    => 'success',
                'message' => 'Record Successfully Update.',
            ]);
        }
        return to_route('navigation_link.show', $id_navigation_link)->with([
            'type'    => 'success',
            'message' => 'Record Successfully Create.',
        ]);
    }

    public function updateStatus(Request $request)
    {
        try {
            $active          = $request->input('active');
            $id              = $request->input('id');
            $navigation_link = NavigationLink::find($id);
            if (!empty($navigation_link)) {
                $navigation_link->active = $active;
                $navigation_link->save();
            }

            return back()->with([
                'type'    => 'success',
                'message' => 'Status for ' . $navigation_link->label . ' has been successfully updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type'    => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $navgation_link_role     = NavigationLinkRole::where('id_navigation_link', $id)->delete();
            $navgation_link_children = NavigationLinkChildren::where('id_navigation_link', $id)->delete();
            $navigation_link         = NavigationLink::destroy($id);

            return back()->with([
                'type'    => 'success',
                'message' => 'Record has been successfully Delete',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type'    => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function destoryChild(string $id)
    {
        try {
            $navigation_link_children = NavigationLinkChildren::destroy($id);
            $navigation_link_role     = NavigationLinkRole::where('id_navigation_link_children', $id)->delete($id);

            return back()->with([
                'type'    => 'success',
                'message' => 'Record has been successfully Delete',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type'    => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
