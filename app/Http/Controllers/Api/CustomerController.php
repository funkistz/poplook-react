<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json('index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return response()->json('store');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $request['id'] = $id;
        $response = ApiService::get('Customers/customer', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request['id_customer'] = $id;
        $response = ApiService::post('Customers/editProfile', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
    }

    public function account_deletion(Request $request)
    {
        $response = ApiService::delete('UserAuth/account_deletion', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function loyalty(Request $request, string $id)
    {
        $request['id_customer'] = $id;
        $response = ApiService::get('Customers/loyalty', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function getTotalUserByMonth(Request $req)
    {
        $response = Customer::getCountCustomerByMonth($req);;
        return response()->json($response)->setStatusCode(200);
    }
}
