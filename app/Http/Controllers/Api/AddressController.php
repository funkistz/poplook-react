<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;
use App\Models\Address;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request['id'] = $request['id_customer'];
        $response = ApiService::get('Addresses/customer', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = ApiService::put('Addresses/addAddress', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $request['id'] = $id;
        $response = ApiService::get('Addresses/address', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request['id_address'] = $id;
        $response = ApiService::post('Addresses/updateAddress', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $request['id_address'] = $id;
        $response = ApiService::delete('Addresses/deleteAddress', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }

    public function set_default_address(Request $request){
        $address = Address::setDefaultAddress($request->id_address, $request->value);
        if (!empty($address)) {
            # code...
            $response = [
                'code' => 200,
                'message' => 'Record successfully updated.'
            ];
        }else{
            $response = [
                'code' => 500,
                'message' => 'Something went wrong, please try again.'
            ];
        }
        return response()->json($response)->setStatusCode($response['code']);
    }
}
