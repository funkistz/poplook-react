<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class AuthController extends Controller
{

    /**
     * Remove the specified resource from storage.
     */
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
