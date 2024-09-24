<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CountdownBanner;
use Carbon\Carbon;

class CountdownBannerController extends Controller
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

        $banner = CountdownBanner::where('active', 1)->where('start_at', '<=', Carbon::now())->orderBy('start_at', 'desc')->first();

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
        $shop = 'myr';

        switch ($request->shop_id) {
            case 2:
                $shop = 'sgd';
                break;
            case 3:
                $shop = 'usd';
                break;
        }

        $banner = CountdownBanner::activeLive()->where('type', 'desktop')->first();

        if ($banner) {

            $banner->data = json_decode($banner->data);

            foreach ($banner->data as $key => $data) {
                if(isset($data->shops) && is_array($data->shops)) {
                    if(in_array($shop, $data->shops)) {
                        if ($data->children) {
                            foreach ($data->children as $key2 => $child) {
                                if(isset($child->shops) && is_array($child->shops)) {
                                    if(in_array($shop, $child->shops)) {
                                        if ($child->block && $child->block->resource) {
                                            if (!is_array($child->block->resource)) {
                                                $child->block->resource = $child->block->resource->{$shop};
                                            } else {
                                                $temp = [];
                                                foreach ($child->block->resource as $key3 => $resource) {
                                                    array_push($temp, $resource->{$shop});
                                                    $resource = $resource->{$shop};
                                                }
                                                $child->block->resource = $temp;
                                            }
                                        }
                                    } else {
                                        $child->block = [];
                                    }
                                } else {
                                    $child->block = [];
                                }
                            }
                        }
                    } else {
                        $data->children = [];
                    }
                } else {
                    $data->children = [];
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

    public function mobile(Request $request)
    {
        $shop = 'myr';

        switch ($request->shop_id) {
            case 2:
                $shop = 'sgd';
                break;
            case 3:
                $shop = 'usd';
                break;
        }

        $banner = CountdownBanner::activeLive()->where('type', 'mobile')->first();

        if ($banner) {

            $banner->data = json_decode($banner->data);

            foreach ($banner->data as $key => $data) {
                if(isset($data->shops) && is_array($data->shops)) {
                    if(in_array($shop, $data->shops)) {
                        if ($data->children) {
                            foreach ($data->children as $key2 => $child) {
                                if(isset($child->shops) && is_array($child->shops)) {
                                    if(in_array($shop, $child->shops)) {
                                        if ($child->block && $child->block->resource) {
                                            if (!is_array($child->block->resource)) {
                                                $child->block->resource = $child->block->resource->{$shop};
                                            } else {
                                                $temp = [];
                                                foreach ($child->block->resource as $key3 => $resource) {
                                                    array_push($temp, $resource->{$shop});
                                                    $resource = $resource->{$shop};
                                                }
                                                $child->block->resource = $temp;
                                            }
                                        }
                                    } else {
                                        $child->block = [];
                                    }
                                } else {
                                    $child->block = [];
                                }
                            }
                        }
                    } else {
                        $data->children = [];
                    }
                } else {
                    $data->children = [];
                    // if ($data->children) {
                    //     foreach ($data->children as $key2 => $child) {
                    //         if ($child->block && $child->block->resource) {
                    //             if (!is_array($child->block->resource)) {
                    //                 $child->block->resource = $child->block->resource->{$shop};
                    //             } else {
                    //                 $temp = [];
                    //                 foreach ($child->block->resource as $key3 => $resource) {
                    //                     // dd($resource);
                    //                     array_push($temp, $resource->{$shop});
                    //                     $resource = $resource->{$shop};
                    //                 }
                    //                 $child->block->resource = $temp;
                    //             }
                    //         }
                    //     }
                    // }
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
}
