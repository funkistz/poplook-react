<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categories;
use App\Models\CustomPage;
use App\Models\TopMenu;
use Illuminate\Support\Facades\Route;

class DesktopMenuSettingController extends Controller
{
    public function desktop_preview()
    {
        // $response = Http::timeout(10)->get('/api/home_banner/desktop');
        $request = Request::create('/api/top_menu/desktop', 'GET');
        $response = Route::dispatch($request);
        $response = json_decode($response->getContent(), true);

        return view('preview_desktop_menu', ['data' => $response['data']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data();
        $listActiveBanner = TopMenu::getLiveList('desktop');
        $listDraftBanner = TopMenu::getDraftList('desktop');

        $listBanner = [
            'active' => $listActiveBanner,
            'draft' => $listDraftBanner,
        ];

        return Inertia::render('Admin/MenuSetting/DesktopIndex', [
            'categoryList' => $category,
            'pagesList' => $pages,
            'topMenus'       => $listBanner,
            'env' => env('API_DOMAIN') . env('API_ENDPOINT'),
            'apiKey' => env('API_KEY'),
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
        try {

            if ($request->id) {
                $oldMenu = TopMenu::find($request->id);

                $topMenu = new TopMenu();
                $topMenu->name = $request->name;
                $topMenu->description = $request->description;
                $topMenu->data = $oldMenu->data;
                $topMenu->type = 'desktop';
                $topMenu->active = 0;
                $topMenu->save();
            } else {
                $topMenu = new TopMenu();
                $topMenu->name = $request->name;
                $topMenu->description = $request->description;
                $topMenu->data = $request->data ? $request->data : '[]';
                $topMenu->type = 'desktop';
                $topMenu->active = 0;
                $topMenu->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Menu has been added',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
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
        $topMenu = TopMenu::find($id);
        $attr = $request->except(['id']);

        try {
            $topMenu->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Menu has been updated',
                'params' => [
                    '$attr' => $attr
                ],
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function destroy(string $id)
    {
        $result = TopMenu::find($id);
        if ($result) {
            $result->delete();
            return back()->with([
                'type'    => 'success',
                'message' => 'Successfully Deleted',
            ]);
        }
    }

    public function activate(Request $request)
    {
        $menu = TopMenu::firstWhere('id', $request->id);

        try {
            if (!empty($menu)) {
                $menu->active   = true;
                $menu->start_at = $request->start_at;
                $menu->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Menu has been activate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function deactivate(Request $request)
    {
        $menu = TopMenu::firstWhere('id', $request->id);

        try {
            if (!empty($menu)) {
                $menu->active   = 0;
                $menu->start_at = null;
                $menu->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Menu has been deactivate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function duplicate(Request $request)
    {
        try {
            $banner                  = TopMenu::find($request->id);
            $homebanner              = new TopMenu();
            $homebanner->name        = $request->name;
            $homebanner->description = $request->description;
            $homebanner->type        = 'desktop';
            $homebanner->data        = $banner['data'];
            $homebanner->active      = false;
            $homebanner->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Menu has been successfully duplicate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
