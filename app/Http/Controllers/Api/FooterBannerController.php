<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;
use App\Helpers\BannerData;
use App\Models\FooterBanner;
use Carbon\Carbon;

class FooterBannerController extends Controller
{
    public function index(Request $request)
    {
        $shop_id = $request->shop ? $request->shop : '1';
        $shop = 'myr';

        switch ($request->shop) {
            case 2:
                $shop = 'sgd';
                break;
            case 3:
                $shop = 'usd';
                break;
        }

        $banner = FooterBanner::where('active', 1)->where('start_at', '<=', Carbon::now())->orderBy('start_at', 'desc')->first();

        if ($banner) {

            $banner->data = json_decode($banner->data);

            foreach ($banner->data as $key => $data) {

                if ($data->children) {
                    foreach ($data->children as $key2 => $child) {
                        if ($child->block && $child->block->resource) {
                            $child->block->resource = $child->block->resource->{$shop};
                        }
                    }
                }
            }

            return response()->json([
                "data" => $banner,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No banner found"
            ])->setStatusCode(404);
        }
    }

    public function desktop(Request $request)
    {
        $banner = FooterBanner::activeLive()->where('type', 'desktop')->first();
        $banner_data = new BannerData;
        $data = $banner_data->get($banner, $request->shop_id, $request->input('categoryId'));
        $data->width = (int) $data->width;

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

    public function mobile(Request $request)
    {
        $banner = FooterBanner::activeLive()->where('type', 'mobile')->first();
        $banner_data = new BannerData;
        $data = $banner_data->get($banner, $request->shop_id, $request->input('categoryId'));
        $data->width = (int) $data->width;

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
