<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TopMenu;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HomeTopMenuController extends Controller
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

        $menu = TopMenu::where('active', 1)->where('start_at', '<=', Carbon::now())->orderBy('start_at', 'desc')->first();

        if ($menu) {

            $menu->data = json_decode($menu->data);

            foreach ($menu->data as $key => $data) {
                if ($data->children) {
                    foreach ($data->children as $key2 => $child) {
                        if ($child->block && $child->block->resource) {
                            $child->block->resource = $child->block->resource->{$shop};
                        }
                    }
                }
            }

            return response()->json([
                "data" => $menu,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No menu found"
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

        $menu = TopMenu::activeLive()->where('type', 'desktop')->first();

        if ($menu) {
            $menu->data = json_decode($menu->data);

            foreach($menu->data as $key => $item) {
                if(isset($item->shops) && is_array($item->shops)) {
                    if(in_array($shop, $item->shops)) {
                        $item->resource = $item->resource->{$shop};
                        if($item->block) {
                            foreach($item->block as $key2 => $block) {
                                if(isset($block->shops) && is_array($block->shops)) {
                                    if(in_array($shop, $block->shops)) {
                                        if($block->children) {
                                            foreach($block->children as $key3 => $child) {
                                                if(isset($child->shops) && is_array($child->shops)) {
                                                    if(in_array($shop, $child->shops)) {
                                                        if ($child->block && $child->block->resource) {
                                                            if (!is_array($child->block->resource)) {
                                                                $child->block->resource = $child->block->resource->{$shop};
                                                            } else {
                                                                $temp = [];
                                                                foreach ($child->block->resource as $key3 => $resource) {
                                                                    // dd($resource);
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
                                        $block->children = [];
                                    }
                                } else {
                                    $block->children = [];
                                }
                            }
                        } else {
                            $item->block = [];
                        }
                    } else {
                        $item->block = [];
                        $item->resource = [];
                    }
                } else {
                    $item->resource = [];
                    $item->block = [];
                }
            }

            return response()->json([
                "data" => $menu,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No Menu found"
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

        $menu = TopMenu::activeLive()->where('type', 'mobile')->first();

        if ($menu) {

            $menu->data = json_decode($menu->data);

            foreach($menu->data as $key => $item) {
                if(isset($item->shops) && is_array($item->shops)) {
                    if(in_array($shop, $item->shops)) {
                        $item->resource = $item->resource->{$shop};
                        if($item->block) {
                            foreach($item->block as $key2 => $block) {
                                if(isset($block->shops) && is_array($block->shops)) {
                                    if(in_array($shop, $block->shops)) {
                                        if($block->children) {
                                            foreach($block->children as $key3 => $child) {
                                                if(isset($child->shops) && is_array($child->shops)) {
                                                    if(in_array($shop, $child->shops)) {
                                                        if ($child->block && $child->block->resource) {
                                                            if (!is_array($child->block->resource)) {
                                                                $child->block->resource = $child->block->resource->{$shop};
                                                            } else {
                                                                $temp = [];
                                                                foreach ($child->block->resource as $key3 => $resource) {
                                                                    // dd($resource);
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
                                        $block->children = [];
                                    }
                                } else {
                                    $block->children = [];
                                }
                            }
                        } else {
                            $item->block = [];
                            // $item->resource = [];
                        }
                    } else {
                        $item->block = [];
                        $item->resource = [];
                    }
                } else {
                    $item->resource = [];
                    $item->block = [];
                }
            }

            return response()->json([
                "data" => $menu,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No Menu found"
            ])->setStatusCode(404);
        }
    }
}
