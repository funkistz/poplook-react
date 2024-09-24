<?php

namespace App\Http\Controllers;

use App\Helpers\ApiService;
use App\Models\Banner;
use App\Models\Categories;
use App\Models\CustomPage;
use App\Models\HomeBanner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MobileBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data();
        $listActiveBanner = HomeBanner::getLiveList('mobile');
        $listDraftBanner = HomeBanner::getDraftList('mobile');

        $listBanner = [
            'active' => $listActiveBanner,
            'draft' => $listDraftBanner,
        ];

        return Inertia::render('Admin/Banner/BannerSetting/MobileIndex', [
            'categoryList' => $category,
            'pagesList' => $pages,
            'listBanner'   => $listBanner,
            'env' => env('API_DOMAIN') . env('API_ENDPOINT'),
            'apiKey' => env('API_KEY'),
        ]);
    }

    public function store(Request $request)
    {
        try {
            if ($request->id) {
                $oldBanner = HomeBanner::find($request->id);

                $oldBanner = new HomeBanner();
                $oldBanner->name = $request->name;
                $oldBanner->description = $request->description;
                $oldBanner->data = $oldBanner->data;
                $oldBanner->active = 0;
                $oldBanner->type = 'mobile';
                $oldBanner->save();
            } else {
                $newBanner = new HomeBanner();
                $newBanner->name = $request->name;
                $newBanner->description = $request->description;
                $newBanner->data = $request->data ? $request->data : '[]';
                $newBanner->active = 0;
                $newBanner->type = 'mobile';
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

    public function update(Request $request, string $id)
    {
        $banner = HomeBanner::find($id);
        $attr = $request->except(['id']);

        try {
            $banner->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Banner has been updated',
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
        $result = HomeBanner::find($id);
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
            $banner                  = HomeBanner::find($request->id);
            $homebanner              = new HomeBanner();
            $homebanner->name        = $request->name;
            $homebanner->description = $request->description;
            $homebanner->type        = 'mobile';
            $homebanner->data        = $banner['data'];
            $homebanner->active      = false;
            $homebanner->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Banner has been successfully duplicate',
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
        $banner = HomeBanner::firstWhere('id', $request->id);

        try {
            if (!empty($banner)) {
                $banner->active   = true;
                $banner->start_at = $request->start_at;
                $banner->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Banner has been activate',
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
        $menu = HomeBanner::firstWhere('id', $request->id);

        try {
            if (!empty($menu)) {
                $menu->active   = 0;
                $menu->start_at = null;
                $menu->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Banner has been deactivate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
