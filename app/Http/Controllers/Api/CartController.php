<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;
use App\Models\Customer;
use App\Models\Shop;
use App\Models\Cart;
use App\Models\Currency;
use App\Models\Address;
use App\Services\ContextService;

class CartController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $request['id'] = $id;
        $response = ApiService::get('Carts/cart', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request['id_cart'] = $id;
        $response = ApiService::put('Carts/add', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::delete('Carts/removeProduct', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function orderStep1(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::get('Carts/OrderStep1', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function orderStep2(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::get('Carts/OrderStep2', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function orderStep3(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::get('Carts/OrderStep3', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function orderStep4(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::get('Carts/OrderStep4', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function orderStep5(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::get('Carts/OrderStep5', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function validateVoucher(string $id, Request $request)
    {
        $request['cart'] = $id;
        $response = ApiService::get('Vouchers/validate', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function removeVoucher(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::delete('Carts/removeVoucher', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function updateOrderSummary(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::get('Carts/updateOrderSummary', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
}
