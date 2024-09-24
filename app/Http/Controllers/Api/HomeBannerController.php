<?php

namespace App\Http\Controllers\Api;

use App\Helpers\BannerData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HomeBanner;
use Carbon\Carbon;

class HomeBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

        $banner = HomeBanner::where('active', 1)->where('start_at', '<=', Carbon::now())->orderBy('start_at', 'desc')->first();

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

        $banner = HomeBanner::activeLive()->where('type', 'desktop')->first();
        $banner_data = New BannerData;
        $data = $banner_data->get($banner, $request->shop_id);
        
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

        // if ($banner) {

        //     $banner->data = json_decode($banner->data);

        //     foreach ($banner->data as $key => $data) {
        //         if(isset($data->shops) && is_array($data->shops)) {
        //             if(in_array($shop, $data->shops)) {
        //                 if ($data->children) {
        //                     foreach ($data->children as $key2 => $child) {
        //                         if(isset($child->shops) && is_array($child->shops)) {
        //                             if(in_array($shop, $child->shops)) {
        //                                 if ($child->block && $child->block->resource) {
        //                                     if (!is_array($child->block->resource)) {
        //                                         $child->block->resource = $child->block->resource->{$shop};
        //                                     } else {
        //                                         $temp = [];
        //                                         foreach ($child->block->resource as $key3 => $resource) {
        //                                             array_push($temp, $resource->{$shop});
        //                                             $resource = $resource->{$shop};
        //                                         }
        //                                         $child->block->resource = $temp;
        //                                     }
        //                                 }
        //                             } else {
        //                                 $child->block = [];
        //                             }
        //                         } else {
        //                             $child->block = [];
        //                         }
        //                     }
        //                 }
        //             } else {
        //                 $data->children = [];
        //             }
        //         } else {
        //             $data->children = [];
        //             // if ($data->children) {
        //             //     foreach ($data->children as $key2 => $child) {
        //             //         if ($child->block && $child->block->resource) {
        //             //             if (!is_array($child->block->resource)) {
        //             //                 $child->block->resource = $child->block->resource->{$shop};
        //             //             } else {
        //             //                 $temp = [];
        //             //                 foreach ($child->block->resource as $key3 => $resource) {
        //             //                     // dd($resource);
        //             //                     array_push($temp, $resource->{$shop});
        //             //                     $resource = $resource->{$shop};
        //             //                 }
        //             //                 $child->block->resource = $temp;
        //             //             }
        //             //         }
        //             //     }
        //             // }
        //         }
        //     }

        //     return response()->json([
        //         "data" => $banner,
        //         "message" => "Success"
        //     ])->setStatusCode(200);
        // } else {
        //     return response()->json([
        //         "data" => null,
        //         "message" => "No banner found"
        //     ])->setStatusCode(404);
        // }
    }

    public function mobile(Request $request)
    {
        $banner = HomeBanner::activeLive()->where('type', 'mobile')->first();
        $banner_data = New BannerData;
        $data = $banner_data->get($banner, $request->shop_id);
        
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
