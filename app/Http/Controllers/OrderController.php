<?php

namespace App\Http\Controllers;

use App\Helpers\ApiService;
use Illuminate\Http\Request;

class OrderController extends Controller
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function order_history(int $id, int $total_item, int $p, Request $request){
        // webapi/Orders/histories/customer/' . $id . '/n/' . $total_items . '/p/1' . APIKEY
        return $request;
    }

    public function order_step_1(Request $request){
        $response = ApiService::get('Carts/OrderStep1', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
    public function order_step_2(Request $request){
        $response = ApiService::get('Carts/OrderStep2', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
    public function order_step_3(Request $request){
        $response = ApiService::get('Carts/OrderStep3', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
    public function order_step_4(Request $request){
        $response = ApiService::get('Carts/OrderStep4', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
}
