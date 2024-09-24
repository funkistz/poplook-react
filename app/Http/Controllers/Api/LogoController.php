<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Logo;

class LogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = Logo::where('status', 1)->first();
        $domain = env('APP_URL') == 'http://localhost' ? 'http://localhost:8000': env('APP_URL');

        // Not found
        if($result) {
            $result->logo = $domain . $result->logo;
            $result->icon = $domain . $result->icon;
            return response()->json([
                "data" => $result,
                "message" => "Success"
            ])->setStatusCode(200);
        }

        $result = (object)[
            'logo' => $domain . '/poplook_logo.png',
            'icon' => $domain . '/PL_ICON.png',
        ];

        return response()->json([
            "data" => $result,
            "message" => "Success"
        ])->setStatusCode(200);
    }
}
