<?php

namespace App\Helpers;

use App\Models\CustomerGroup;
use Illuminate\Support\Facades\DB;

class Component
{

    public static function getCustomerGroupSelection($modal, $id, $search)
    {
        if (empty($search)) {
            return [];
        }
        $customer_exist = CustomerGroup::where('id_group', $id)->get('id_customer');
        $query          = $modal::whereNotIn('id_customer', $customer_exist);
        if ($search) {
            $query->where(function ($subquery) use ($search) {
                $subquery->where('email', 'like', '%' . $search . '%');
                $subquery->orWhere('firstname', 'like', '%' . $search . '%');
                $subquery->orWhere('lastname', 'like', '%' . $search . '%');
            });
            // $query->where('email', 'like', '%' . $search . '%');
        }
        $query->leftJoin('ps_shop', 'ps_shop.id_shop', '=', 'ps_customer.id_shop');
        $query->limit(1000);
        $result = $query->with(['shop'])
            ->select(DB::raw('email as label, ps_shop.name AS group_name, id_customer AS value'))
            ->get();

        // return $result;
        $data = [];
        foreach ($result as $key => $value) {
            $data[$value->group_name][] = $value;
        }
        return $data;
    }

    public static function getSelection($modal, $param)
    {
        DB::enableQueryLog();
        if (empty($param[0])) {
            return [];
        }
        
        $query = $modal::where($param[0][0], $param[0][1]);
        if (!empty($param['search'])) {
            $query->where(function ($subquery) use ($param) {
                $subquery->where('email', 'like', '%' . $param['search'] . '%');
                $subquery->orWhere('firstname', 'like', '%' . $param['search'] . '%');
                $subquery->orWhere('lastname', 'like', '%' . $param['search'] . '%');
            });
            // $query->where('email', 'like', '%' . $search . '%');
        }
        $query->leftJoin('ps_shop', 'ps_shop.id_shop', '=', 'ps_customer.id_shop');
        $query->limit(1000);
        $result = $query->with(['shop'])
            ->select(DB::raw($param['select']))
            ->get();

        return $result;
        $data = [];
        foreach ($result as $key => $value) {
            $data[$value->group_name][] = $value;
        }
        return $data;
    }
}
