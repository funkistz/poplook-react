<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\BannerData;
use App\Models\ExitIntentBanner;
use Carbon\Carbon;

class ExitIntentBannerController extends Controller
{
    public function index(Request $request)
    {
        $shop_id = $request->shop ? $request->shop : '1';
        $shop    = 'myr';

        switch ($request->shop) {
            case 2:
                $shop = 'sgd';
                break;
            case 3:
                $shop = 'usd';
                break;
        }

        $banner = ExitIntentBanner::where('active', 1)->where('start_at', '<=', Carbon::now())->orderBy('start_at', 'desc')->first();

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
                "data"    => $banner,
                "message" => "Success",
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data"    => null,
                "message" => "No banner found",
            ])->setStatusCode(404);
        }
    }

    public function desktop(string $id, Request $request)
    {
        $banner = ExitIntentBanner::activeLive()->where('type', 'desktop')->first();
        $banner_data = New BannerData;
        $data = $banner_data->get($banner, $request->shop_id);
        $array = $data ? $data->data[0]->children : [];
        $domain = env('APP_URL') == 'http://localhost' ? 'http://localhost:8000': env('APP_URL');

        if ($id >= count($array)) {
            return response()->json([
                "action"     => "banners_exit_intent_banner",
                "data"       => null,
                "status"     => true,
                "code"       => 200,
                "message"    => "Success",
            ])->setStatusCode(200);
        }

        return  response()->json([
            "action"     => "banners_exit_intent_banner",
            "data"       => [[
                "href" => $domain . $data->data[0]->children[$id]->block->resource->href,
                "link" => 'en/' . $data->data[0]->children[$id]->block->resource->link,
                "next_position" => ($id + 1) % count($array),
            ]],
            "status"     => true,
            "code"       => 200,
            "message"    => "Success",
        ])->setStatusCode(200);
    }

    public function mobile(string $id, Request $request)
    {
        $banner = ExitIntentBanner::activeLive()->where('type', 'mobile')->first();
        $banner_data = New BannerData;
        $data = $banner_data->get($banner, $request->shop_id);
        $array = $data ? $data->data[0]->children : [];
        $domain = env('APP_URL') == 'http://localhost' ? 'http://localhost:8000': env('APP_URL');

        if ($id >= count($array)) {
            return response()->json([
                "action"     => "banners_exit_intent_banner",
                "data"       => null,
                "status"     => true,
                "code"       => 200,
                "message"    => "Success",
            ])->setStatusCode(200);
        }

        return  response()->json([
            "action"     => "banners_exit_intent_banner",
            "data"       => [[
                "href" => $domain . $data->data[0]->children[$id]->block->resource->href,
                "link" => 'en/' . $data->data[0]->children[$id]->block->resource->link,
                "next_position" => ($id + 1) % count($array),
            ]],
            "status"     => true,
            "code"       => 200,
            "message"    => "Success",
        ])->setStatusCode(200);
    }

}
