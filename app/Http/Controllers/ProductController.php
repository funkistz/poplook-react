<?php

namespace App\Http\Controllers;

use App\Helpers\ApiService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
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
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function category(string $id, int $id_shop, int $page, int $max, int $order, Request $request){
        // return 'test';
        $param = '';
        if (!empty($request['color_id'])) {
            // $apiURL = "Products/category/id/$id/shop/$shop_id/num_page/$page/num_list/$max/sort_options/$order/full/1?api_version=$this->api_version&size=$size&color=$request['color_id']";
            $param = '&color=' . $request['color_id'];
        } else if (!empty($size)) {
            $param = '&product_attribute=' . $size;
        } else if (!empty($request['color_id']) && !empty($size)) {
            # code...
            $param = '&' . $size . $request['color_id'];
        }

        if (!empty($user_tier)) {
            $param = $param . '&user_id=' . $request['user_id'] . '&tier=' . $request['user_tier'];
        }
        // Products/category/id/$id/shop/$shop_id/num_page/$page/num_list/$max/sort_options/$order/full/1?api_version=$this->api_version$param
        $request['param'] = $param;
        
        $response = ApiService::get("Products/category/id/$id/shop/$id_shop/num_page/$page/num_list/$max/sort_options/$order/full/1", $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
    
    public function view(int $id, int $id_shop, int $id_lang, Request $request){
        
        $response = ApiService::get("Products/details/id/$id/shop/$id_shop/lang/$id_lang/full/1/api_version/desktop", $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
}
