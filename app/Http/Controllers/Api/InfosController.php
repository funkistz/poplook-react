<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\State;

class InfosController extends Controller
{
    public function Country(Request $req)
    {

        $shop = $req->shop;
        if($shop == 1) {
            $result = (object)[
                'country' => Country::getCountryByShop(1),
                'state' => State::getStateByShop(136),
            ];

            return response()->json([
                "action" => "infos_countries",
                "data" => $result,
                "status"=> true,
                "code"=> 200,
                "message" => "Success"
            ])->setStatusCode(200);
        } else if($shop == 2) {
            $result = (object)[
                'country' => Country::getCountryByShop(2),
                'state' => [],
            ];

            return response()->json([
                "action" => "infos_countries",
                "data" => $result,
                "status"=> true,
                "code"=> 200,
                "message" => "Success"
            ])->setStatusCode(200);

        } else if($shop == 3) {
            $result = (object)[
                'country' => Country::getCountryByShop(3),
                'state' => [],
            ];

            return response()->json([
                "action" => "infos_countries",
                "data" => $result,
                "status"=> true,
                "code"=> 200,
                "message" => "Success"
            ])->setStatusCode(200);

        }

        $result = (object)[
            'country' => Country::getCountryByShop(null),
            'state' => [],
        ];

        return response()->json([
            "action" => "infos_countries",
            "data" => $result,
            "status"=> true,
            "code"=> 200,
            "message" => "Success"
        ])->setStatusCode(200);
    }
}
