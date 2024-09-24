<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categories;
use App\Models\CustomPage;
use App\Models\FooterBanner;

class MobileFooterBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data();
        $idCategory = Categories::get_all_categories();
        $listActiveBanner = FooterBanner::getLiveList('mobile');
        $listDraftBanner = FooterBanner::getDraftList('mobile');

        $listBanner = [
            'active' => $listActiveBanner,
            'draft' => $listDraftBanner,
        ];

        return Inertia::render('Admin/Banner/FooterBannerSetting/MobileIndex', [
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
                $oldBanner = FooterBanner::find($request->id);

                $oldBanner = new FooterBanner();
                $oldBanner->name = $request->name;
                $oldBanner->description = $request->description;
                $oldBanner->data = $oldBanner->data;
                $oldBanner->active = 0;
                $oldBanner->type = 'mobile';
                $oldBanner->width = $request->width;
                $oldBanner->position = $request->position;
                $oldBanner->save();
            } else {
                $newBanner = new FooterBanner();
                $newBanner->name = $request->name;
                $newBanner->description = $request->description;
                $newBanner->data = $request->data ? $request->data : '[]';
                $newBanner->active = 0;
                $newBanner->type = 'mobile';
                $newBanner->width = '100';
                $newBanner->position = 'bottom';
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
        $banner = FooterBanner::find($id);
        $attr = $request->except(['id']);

        // dd($attr);

        try {
            $banner->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Footer Banner has been updated',
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
        $result = FooterBanner::find($id);
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
            $banner                  = FooterBanner::find($request->id);
            $homebanner              = new FooterBanner();
            $homebanner->name        = $request->name;
            $homebanner->description = $request->description;
            $homebanner->type        = 'mobile';
            $homebanner->data        = $banner['data'];
            $homebanner->active      = false;
            $homebanner->width       = $banner['width'];
            $homebanner->position    = $banner['position'];
            $homebanner->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Footer Banner has been successfully duplicate',
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
        $banner = FooterBanner::firstWhere('id', $request->id);

        try {
            if (!empty($banner)) {
                $banner->active   = true;
                $banner->start_at = $request->start_at;
                $banner->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Footer Banner has been activate',
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
        $menu = FooterBanner::firstWhere('id', $request->id);

        try {
            if (!empty($menu)) {
                $menu->active   = 0;
                $menu->start_at = null;
                $menu->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Footer Banner has been deactivate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
