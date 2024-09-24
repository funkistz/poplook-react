<?php

namespace App\Http\Controllers\Api\Marketing\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\Marketing\Whatsapp\WhatsappSegment;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\Count;

class WhatsappSegmentController extends Controller
{
    public function storePhoneNumber(Request $request) 
    {

        $country_code = '+'.$request->country_code;
        $phone_no = $request->phone_no;

        $find = WhatsappSegment::where('country_code', $country_code)->where('phone_no', $phone_no)->get();

        if(count($find) == 0) {
            $result = WhatsappSegment::create([
                'country_code' => $country_code,
                'phone_no' => $phone_no,
                'opt_in' => true,
             ]);

            return response()->json([
                'data' => $result,
                'status' => true,
                'code' => 200,
                'message' =>  "Success",
            ]);
        }

        return response()->json([
            'data' => $find,
            'status' => true,
            'code' => 200,
            'message' =>  "Existing data",
        ]);
    }
}
