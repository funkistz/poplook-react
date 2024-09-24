<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $id_customer = $request->id_customer;
        $customer = Customer::where('id_customer',  $request->id_customer)->get();

        if ($customer && count($customer) > 0) {
            return response()->json([
                "data" => $customer,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No Customer found"
            ])->setStatusCode(404);
        }
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
        $Customer = Customer::find($id);

        if (!empty($Customer)) {
            return response()->json([
                "data" => $Customer,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No Customer found"
            ])->setStatusCode(404);
        }
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

    public function check_connection(Request $request)
    {

        return response()->json([
            "message" => "Connection Success"
        ])->setStatusCode(200);
    }
}
