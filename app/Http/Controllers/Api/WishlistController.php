<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request['id_cart'] = $id;
        // $response = ApiService::put('Wishlists/addProduct', $request->all());

        // return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $request['customer'] = $id;
        $response = ApiService::get('Wishlists/list', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request['id_wishlist'] = $id;
        $response = ApiService::put('Wishlists/addProduct', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $request['id_wishlist'] = $id;
        $response = ApiService::delete('Wishlists/removeProduct', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function addToCart(Request $request, string $id)
    {
        $request['id_wishlist'] = $id;
        $response = ApiService::put('Wishlists/addProductCart', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
}
