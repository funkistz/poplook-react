<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $response = ApiService::get('Orders/histories/customer/' . $request->id_customer, $request->all());

        return response()->json($response)->setStatusCode($response['code']);
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
        $response = ApiService::get('Orders/order', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
    }

    public function cancel(string $id, Request $request)
    {
        $request['id_order'] = $id;
        $response = ApiService::post('Orders/cancel', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function repay(string $id, Request $request)
    {
        $request['id_cart'] = $id;
        $response = ApiService::get('Orders/PayNowFromOrder', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function getTotalOrderByMonth(Request $req)
    {
        $response = Order::getCountOrderByMonth($req);
        return response()->json($response)->setStatusCode(200);
    }

    public function getTotalSaleByMonth(Request $req)
    {
        $response = Order::getTotalSaleByMonth($req);
        return response()->json($response)->setStatusCode(200);
    }

    public function getWeekSale(Request $req)
    {
        $response = Order::getWeekSale($req);
        return response()->json($response)->setStatusCode(200);
    }

    public function getRecentOrder(Request $request)
    {
        if($request->cookie('shop') == 0) {
            $response  = Order::with(['customer', 'orderdetail', 'orderstatelang'])
                ->orderBy('date_add', 'desc')
                ->limit(5)
                ->get();
        } else {
            $response  = Order::with(['customer', 'orderdetail', 'orderstatelang'])
                ->where('id_shop', $request->cookie('shop'))
                ->orderBy('date_add', 'desc')
                ->limit(5)
                ->get();
        }
       
        return response()->json($response)->setStatusCode(200);
    }

    public function getOrdersUser($id, Request $req) 
    {
        $response = Order::getOrdersUser($id, $req);
        return response()->json($response)->setStatusCode(200);
    }
}
