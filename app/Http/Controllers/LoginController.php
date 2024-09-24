<?php

namespace App\Http\Controllers;

use App\Helpers\ApiService;
use App\Models\Customer;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $response = ApiService::get('UserAuth/login', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
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
        // $request['id'] = $email;
        // $request['password'] = $password;
        // $request['id_shop'] = $id_shop;
        // $request['id_cart'] = $id_cart;
        $response = ApiService::get('UserAuth/login', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
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

    public function create_token(Request $request)
    {
        $customer = Customer::get_customer_by_email($request->email, $request->password, $request->id_shop);
        $token    = $customer->createToken($customer->email);
        return response()->json(
            [
                'status'  => 200,
                'message' => 'Token Successfully Created.',
                'token'   => $token->plainTextToken,
            ]
        )->setStatusCode(200);

    }
}
