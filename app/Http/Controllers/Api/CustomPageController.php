<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CustomPage;
use App\Helpers\BannerData;

class CustomPageController extends Controller
{
    public function index(Request $request)
    {
        $page = CustomPage::where('url', $request->url)->first();

        $banner_data = new BannerData;
        $data = $banner_data->get($page, $request->shop_id);

        if ($data) {
            # code...
            return response()->json([
                "data"    => $data,
                "message" => "Success",
            ])->setStatusCode(200);
        }
        return response()->json([
            "data"    => null,
            "message" => "No banner found",
        ])->setStatusCode(404);
    }

    public function show(string $id, Request $request)
    {
        $page = CustomPage::find($id);

        $banner_data = new BannerData;
        $data = $banner_data->get($page, $request->shop_id);

        if ($data) {
            # code...
            return response()->json([
                "data"    => $data,
                "message" => "Success",
            ])->setStatusCode(200);
        }
        return response()->json([
            "data"    => null,
            "message" => "No banner found",
        ])->setStatusCode(404);
    }
}
