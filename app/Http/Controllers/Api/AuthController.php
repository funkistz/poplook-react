<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Helpers\ApiService;

class AuthController extends Controller
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
    public function show(string $id)
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

    public function login(Request $request)
    {
        // $request['password'] = md5($request['password']);
        $response = ApiService::get('UserAuth/login', $request->all());

        if ($response['code'] == 404) {
            return response()->json($response)->setStatusCode($response['code']);
        } else {
            $customer = Customer::where('email', $request->email)->first();

            $token = '';
            if (!$customer->tokens->isEmpty()) {
                $token = $customer->tokens->last()->token;
            } else {
                $token =  $customer->createToken($request->email)->plainTextToken;
            }

            $response['data']['token'] = $token;

            return response()->json($response)->setStatusCode($response['code']);
        }
    }

    public function loginSpecial(Request $request)
    {
        $response = ApiService::get('UserAuth/loginNoPassword', $request->all());

        if ($response['code'] == 404) {
            return response()->json($response)->setStatusCode($response['code']);
        } else {
            $customer = Customer::where('email', $request->email)->first();

            $token = '';
            if (!$customer->tokens->isEmpty()) {
                $token = $customer->tokens->last()->token;
            } else {
                $token =  $customer->createToken($request->email)->plainTextToken;
            }

            $response['data']['token'] = $token;

            return response()->json($response)->setStatusCode($response['code']);
        }
    }

    public function generateToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        // if (!$user || !Hash::check($request->password, $user->password)) {
        //     throw ValidationException::withMessages([
        //         'email' => ['The provided Credentials are incorrect.'],
        //     ]);
        // }

        $token =  $customer->createToken($request->email)->plainTextToken;

        return response()->json([
            "data" => $token,
            "message" => "Token generate Successfully"
        ])->setStatusCode(200);
    }
}
