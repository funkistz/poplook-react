<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;

class CMSController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function sendEmail(Request $request)
    {
        $response = ApiService::get('SendEmail/mailto', $request->all());

        return response()->json($response)->setStatusCode($response['code']);
    }
}
