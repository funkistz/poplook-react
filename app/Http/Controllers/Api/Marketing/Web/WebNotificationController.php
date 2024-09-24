<?php

namespace App\Http\Controllers\Api\Marketing\Web;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Marketing\Segment\CustomerProfile;
use App\Models\Marketing\Segment\CustomerToken;
use Illuminate\Http\Request;

class WebNotificationController extends Controller
{
    public function storeToken(Request $request)
    {
        $user = $request->user_id;
        $existingToken = CustomerToken::where([
            ['token', '=', $request->token],
            ['type','=', $request->type]
        ])->first();

        if ($user)
        {
            $customer = CustomerProfile::where([
                ['ps_customer_id', '=' ,$user],
                ['shop_id', '=', $request->shop_id]
            ])->first();

            if (!empty($customer) && empty($existingToken))
            {
                $token = CustomerToken::where([
                    ['customer_profile_id','=',$customer->id],
                    ['type', '=', $request->type]
                ])->first();

                if (!empty($token))
                {
                    if ($token->token !== $request->token)
                    {
                        $token->update([
                           'token' => $request->token
                        ]);
                    }
                }else{
                    $customer->token()->create([
                       'token' => $request->token,
                       'type'  => $request->type
                    ]);
                }
            }else if(!empty($customer) && !empty($existingToken))
            {
                if ($existingToken->customer_id != $customer->id)
                {
                    $existingToken->update([
                        'customer_profile_id' => $customer->id,
                        'is_guest' => false,
                    ]);
                }

            } else{

                $cs = Customer::where([
                    ['id_customer', '=', $user],
                    ['id_shop', '=', $request->shop_id]
                ])->first();

                if (!empty($cs))
                {
                    $profile = CustomerProfile::create([
                        'ps_customer_id' => $user,
                        'name' => $cs->firstname.' '.$cs->lastname,
                        'email' => $cs->email,
                        'shop_id' => $request->shop_id,
                        'is_web_notifications' => true,
                    ]);

                    if (empty($existingToken))
                    {
                        $profile->token()->create([
                            'token' => $request->token,
                            'type'  => $request->type,
                        ]);
                    }else{
                        $existingToken->update([
                            'customer_profile_id' => $profile->id,
                        ]);
                    }
                }

            }
        }else{

            if (empty($existingToken))
            {
                $newToken = CustomerToken::create([
                   'token' => $request->token,
                   'type'  => $request->type,
                    'shop_id' => $request->shop_id,
                    'is_guest' => true,

                ]);
            }
        }

        return response()->json([
            'data' => $request->token,
            'status' => true,
            'code' => 200,
            'message' =>  "Success",
        ]);
    }
}
