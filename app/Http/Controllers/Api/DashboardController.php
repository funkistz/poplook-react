<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ApiService;
use App\Models\Configuration;
use App\Models\Customer;
use App\Models\Order;

class DashboardController extends Controller
{
    public function customer_count_by_shop () 
    {
        $result = [];

         // Count the number of orders in each state
        $myr = Customer::where('id_shop', 1)->count();
        $sgd = Customer::where('id_shop', 2)->count();
        $usd = Customer::where('id_shop', 3)->count();

         // Calculate the total number of orders
        $total = $myr + $sgd +$usd;

         // Calculate the percentages and store the results in the result array
        $result['myr'] = $myr;
        $result['sgd'] = $sgd;
        $result['usd'] = $usd;

        // Format and rounding number
        $myr_format = number_format($myr/$total * 100, 2);
        $sgd_format = number_format($sgd/$total * 100, 2);
        $usd_format = number_format($usd/$total * 100, 2);
        $result['myr_percentage'] = intval(round($myr_format));
        $result['sgd_percentage'] = intval(round($sgd_format));
        $result['usd_percentage'] = intval(round($usd_format));
        $result['total'] = $myr + $sgd +$usd;
        
        return response()->json($result)->setStatusCode(200);
    }

    public function order_count_by_status () 
    {
        $ps_fail_id = 838;
        $ps_success_id = 839;
        $ps_pending_id = 840;
        $result = [];

        // Fetch the values from Configuration based on their IDs
        $fail_list = Configuration::where('id_configuration',$ps_fail_id)->pluck('value')->first();
        $success_list = Configuration::where('id_configuration',$ps_success_id)->pluck('value')->first();
        $pending_list = Configuration::where('id_configuration',$ps_pending_id)->pluck('value')->first();

        // Count the number of orders in each state
        $fail = Order::whereIn('current_state', array_map('intval', explode(',', $fail_list)))->count();
        $pending = Order::whereIn('current_state', array_map('intval', explode(',', $pending_list)))->count();
        $success = Order::whereIn('current_state', array_map('intval', explode(',', $success_list)))->count();

        // Calculate the total number of orders
        $total = $pending + $fail +$success;

        // Calculate the percentages and store the results in the result array
        $result['pending'] = $pending;
        $result['fail'] = $fail;
        $result['success'] = $success;

        // Format and rounding number
        $fail_format = number_format($fail/$total * 100, 2);
        $pending_format = number_format($pending/$total * 100, 2);
        $success_format = number_format($success/$total * 100, 2);
        $result['fail_percentage'] = intval(round($fail_format));
        $result['pending_percentage'] = intval(round($pending_format));
        $result['success_percentage'] = intval(round($success_format));
        $result['total'] = $pending + $fail + $success;

        return response()->json($result)->setStatusCode(200);
    }
}

