<?php

namespace App\Http\Controllers;

use App\Models\HomeBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\View\View;

class HomeBannerController extends Controller
{
    public function desktop_preview()
    {
        // $response = Http::timeout(10)->get('/api/home_banner/desktop');
        $request = Request::create('/api/home_banner/desktop', 'GET');
        $response = Route::dispatch($request);
        $response = json_decode($response->getContent(), true);

        // dd($response);

        return view('welcome', ['data' => $response['data']]);
    }

    public function mobile_preview()
    {
        $request = Request::create('/api/home_banner/mobile', 'GET');
        $response = Route::dispatch($request);
        $response = json_decode($response->getContent(), true);

        // dd($response);

        return view('welcome', ['data' => $response['data']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $result = HomeBanner::InsertBanner($request);
        if (!empty($result)) {
            # code...
            return response()->json([
                "status"  => 'success',
                "message" => "Record Successfully add.",
            ])->setStatusCode(200);
        }
        return response()->json([
            "status"  => 'error',
            "message" => "Something went wrong.",
        ]);
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
        $result = HomeBanner::updateBanner($request->all(), $id);
        if (!empty($result)) {
            # code...
            return response()->json([
                "status"  => 'success',
                "message" => "Successfully Updated.",
            ])->setStatusCode(200);
        }
        return response()->json([
            "status"  => 'error',
            "message" => "Something went wrong.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = HomeBanner::RemoveBanner($id);
        if (!empty($result)) {
            # code...
            return response()->json([
                "status"  => 'success',
                "message" => "Record Successfully Deleted.",
            ]);
        }
        return response()->json([
            "status"  => 'error',
            "message" => "Something went wrong.",
        ])->setStatusCode(200);
    }

    public function activateBanner(Request $request)
    {
        $result = HomeBanner::activateBanner($request);
        if (!empty($result)) {
            # code...
            return response()->json([
                "status"  => 'success',
                "message" => "Record Successfully Activated.",
            ])->setStatusCode(200);
        }
        return response()->json([
            "status"  => 'error',
            "message" => "Something went wrong.",
        ]);
    }

    public function deactivateBanner(Request $request, $id)
    {
        $result = HomeBanner::deactivateBanner($id);
        if (!empty($result)) {
            # code...
            return response()->json([
                "status"  => 'success',
                "message" => "Record Successfully deactivated.",
            ])->setStatusCode(200);
        }
        return response()->json([
            "status"  => 'error',
            "message" => "Something went wrong.",
        ]);
    }

    public function allBannerWithStatusGroup(Request $request)
    {
        $banner_list = HomeBanner::allBannerWithStatusGroup($request->all());
        return $banner_list;
    }

    public function activeBanner(Request $request)
    {
        $banner_list = HomeBanner::activeBanner();
        return $banner_list;
    }

    public function draftBanner(Request $request)
    {
    }
}
