<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Customer;
use App\Models\Marketing\Segment\CustomerProfile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function register(Request $request)
    {

        $request->validate([
            'password' => ['required', 'confirmed', Password::min(8)],
            'email' => ['required'],
            'first_name' => ['required'],
            'surname' => ['required'],
            'dob' => ['required', 'date'],
            'phone_number' => ['required', 'unique:customer_phone_numbers'],
            'country_code' => ['required'],
            'shop' => ['required']
        ]);

        if ($this->existingAccountValidate($request->email, $request->shop))
        {
            return response()->json([
                'status' => 200,
                'email_exists' => true
            ]);
        }

//        $phone = $this->phoneNumberValidation($request);
//
//        if ()

        $customer = Customer::create([
            'id_shop' => 1,
            'id_lang' => 1,
            'email' => $request->email,
            'passwd' => md5($request->password),
            'secure_key' => md5(uniqid(rand(), true)),
            'birthday' => Carbon::parse($request->dob)->format('Y-m-d'),
            'firstname' => $request->first_name,
            'lastname' => $request->surname,
            'newsletter' => $request->newsletter,
            'optin' => $request->newsletter,
            'deviceType' => $request->deviceType,
            'date_add' => Carbon::now(),
            'date_upd' => Carbon::now()
        ]);

        if ($request->push_notification)
        {
            $customer->update([
                'enable_push_notification' => true,
                'tokenId' => $request->push_token
            ]);

            $profile = CustomerProfile::create([
                'ps_customer_id' => $customer->id,
                'name' => $request->first_name.' '.$request->surname,
                'email' => $request->email,
                'is_app_notification' => true,
                'shop_id' => $request->shop
            ]);

            $profile->token()->create([
                'token' => $request->push_token,
                'type' => 'app'
            ]);
        }

        $phone =  $customer->phoneNumber()->create([
           'phone_number' => $request->phone_number,
           'country_code' => $request->country_code
        ]);

        if (!empty($customer)){
            return response()->json([
                'status' => 200,
                'is_registered' => true,
                'token' => $customer->createToken('new_user')->plainTextToken,
                'message' => 'Thank you!, your account has been created'
            ]);
        }

        //TODO: adding push to netsuite and send out welcome email.

        return response()->json([
            'status' => 200,
            'is_registered' => false,
            'token' => null,
            'message' => 'Oops, something wrong. Please try again'
        ]);

    }

    public function phoneNumberValidation(Request $request)
    {

        $request->validate([
            'phone_number' => ['required'],
            'country_code' => ['required']
        ]);

        $phone = Customer\PhoneNumber::where([
            ['phone_number', '=', $request->phone_number],
            ['country_code', '=', $request->country_code]
        ])->first();

        if (empty($phone))
        {
            return response()->json([
               "status" => 200,
               "is_exists" => false,
            ]);
        }

        return response()->json([
            "status" => 200,
            "is_exists" => true,
        ]);
    }

    public function existingAccountValidate($email, $id_shop = 1)
    {
        $customer = Customer::where([
            ['email', '=', $email],
            ['id_shop', '=', $id_shop]
        ])->first();

        if (empty($customer)) {
            return false;
        }

        return true;
    }

    public function countryCodeLists()
    {

        $countries = Country::where('active', true)->with('lang')->get();

        $country = [];
        foreach($countries as $co) {
            $data = [
                'country_name' => $co->lang->name,
                'country_code' => "+".$co->call_prefix
            ];

            array_push($country, $data);

        }

        return response()->json($country);

    }
}
