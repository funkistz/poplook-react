<?php

namespace App\Services\Marketing\Segments;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class CustomerFilterService
{
    public function noOrder($month = 3, $shop)
    {

    }

    public function testExportBigData()
    {
        //logic test in progress

        $today = Carbon::now()->format('Y-m-d');
        $threeMonth = Carbon::now()->subMonths(3);
        $cs = [];
        $cust = Customer::whereDoesntHave('order', function ($query) use ($threeMonth){
            $query->where('date_add', '>=', $threeMonth);
        })->where('id_shop', '=', 1)->chunk(100, function ($customers) use ($today){


            $filePath = 'public/test/'.$today.'.txt';
            foreach ($customers as $customer)
            {
                $data = [
                  "id" => $customer->id_customer,
                  "email" => $customer->email,
                  "order" => $customer->order
                ];

                Storage::put($filePath, implode(" ", $data));
            }

        });
    }
}
