<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categories;
use App\Models\CustomPage;
use App\Models\CountdownBanner;
use Illuminate\Support\Facades\Route;

class MobileCountDownBannerController extends Controller
{
    public function mobile_preview()
    {
        $request = Request::create('/api/countdown_banner/mobile', 'GET');
        $response = Route::dispatch($request);
        $response = json_decode($response->getContent(), true);

        return view('welcome', ['data' => $response['data']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data();
        $idCategory = Categories::get_all_categories();
        $listActiveBanner = CountdownBanner::getLiveList('mobile');
        $listDraftBanner = CountdownBanner::getDraftList('mobile');

        $listBanner = [
            'active' => $listActiveBanner,
            'draft' => $listDraftBanner,
        ];

        return Inertia::render('Admin/Banner/CountdownBannerSetting/MobileIndex', [
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
                $oldBanner = CountdownBanner::find($request->id);

                $oldBanner = new CountdownBanner();
                $oldBanner->name = $request->name;
                $oldBanner->description = $request->description;
                $oldBanner->data = $oldBanner->data;
                $oldBanner->active = 0;
                $oldBanner->type = 'mobile';
                $oldBanner->save();
            } else {
                $newBanner = new CountdownBanner();
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
        $banner = CountdownBanner::find($id);
        $attr = $request->except(['id']);

        try {
            $banner->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Countdown Banner has been updated',
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
        $result = CountdownBanner::find($id);
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
            $banner                  = CountdownBanner::find($request->id);
            $homebanner              = new CountdownBanner();
            $homebanner->name        = $request->name;
            $homebanner->description = $request->description;
            $homebanner->type        = 'mobile';
            $homebanner->data        = $banner['data'];
            $homebanner->active      = false;
            $homebanner->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Countdown Banner has been successfully duplicate',
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
        $banner = CountdownBanner::firstWhere('id', $request->id);

        try {
            if (!empty($banner)) {
                $banner->active   = true;
                $banner->start_at = $request->start_at;
                $banner->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Countdown Banner has been activate',
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
        $menu = CountdownBanner::firstWhere('id', $request->id);

        try {
            if (!empty($menu)) {
                $menu->active   = 0;
                $menu->start_at = null;
                $menu->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Countdown Banner has been deactivate',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
