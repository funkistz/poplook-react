<?php

namespace App\Http\Controllers;

use App\Helpers\ApiService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Categories;
use App\Models\CustomPage;
use App\Models\ExitIntentBanner;
use Illuminate\Support\Facades\Route;

class DesktopExitIntentBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data();
        $idCategory = Categories::get_all_categories();
        $listActiveBanner = ExitIntentBanner::getLiveList('desktop');
        $listDraftBanner = ExitIntentBanner::getDraftList('desktop');

        $listBanner = [
            'active' => $listActiveBanner,
            'draft' => $listDraftBanner,
        ];

        return Inertia::render('Admin/Banner/ExitIntentBannerSetting/DesktopIndex', [
            'categoryList' => $category,
            'idCategoryList' => $idCategory,
            'pagesList' => $pages,
            'listBanner'   => $listBanner,
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
                $oldBanner = ExitIntentBanner::find($request->id);

                $oldBanner = new ExitIntentBanner();
                $oldBanner->name = $request->name;
                $oldBanner->description = $request->description;
                $oldBanner->data = $oldBanner->data;
                $oldBanner->active = 0;
                $oldBanner->type = 'desktop';
                $oldBanner->save();
            } else {
                $newBanner = new ExitIntentBanner();
                $newBanner->name = $request->name;
                $newBanner->description = $request->description;
                $newBanner->data = $request->data ? $request->data : '[]';
                $newBanner->active = 0;
                $newBanner->type = 'desktop';
                $newBanner->save();
            }

            return back()->with([
                'type'    => 'success',
                'message' => 'Successfully Added',
            ]);
        } catch (\Throwable  $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
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
        $banner = ExitIntentBanner::find($id);
        $attr = $request->except(['id']);

        try {
            $banner->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Exit Intent Banner has been updated',
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = ExitIntentBanner::find($id);
        if ($result) {
            $result->delete();
            return back()->with([
                'type'    => 'success',
                'message' => 'Successfully Deleted',
            ]);
        }
    }

    public function duplicate(Request $request)
    {
        try {
            $banner                  = ExitIntentBanner::find($request->id);
            $homebanner              = new ExitIntentBanner();
            $homebanner->name        = $request->name;
            $homebanner->description = $request->description;
            $homebanner->type        = 'desktop';
            $homebanner->data        = $banner['data'];
            $homebanner->active      = false;
            $homebanner->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Exit Intent Banner has been successfully duplicate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function activate(Request $request)
    {
        $banner = ExitIntentBanner::firstWhere('id', $request->id);

        try {
            if (!empty($banner)) {
                $banner->active   = true;
                $banner->start_at = $request->start_at;
                $banner->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Exit Intent Banner has been activate',
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
        $menu = ExitIntentBanner::firstWhere('id', $request->id);

        try {
            if (!empty($menu)) {
                $menu->active   = 0;
                $menu->start_at = null;
                $menu->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Exit Intent Banner has been deactivate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
