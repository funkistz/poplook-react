<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $id_customer = $request->id_customer;
        $addresses = Address::where('id_customer',  $request->id_customer)->get();

        if ($addresses && count($addresses) > 0) {
            return response()->json([
                "data" => $addresses,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No address found"
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
        $address = Address::find($id);

        if (!empty($address)) {
            return response()->json([
                "data" => $address,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No address found"
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
}
