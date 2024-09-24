<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TrackingController extends Controller
{
    public function test(Request $request)
    {
        Log::debug($request);

        return '';
    }
}
