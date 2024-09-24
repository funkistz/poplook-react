<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CartRule;

class CartRuleController extends Controller
{
    public function getVoucherByUser($id, Request $req)
    {
        $response = CartRule::getVoucherByUser($id, $req);
        return response()->json($response)->setStatusCode(200);
    }
}
