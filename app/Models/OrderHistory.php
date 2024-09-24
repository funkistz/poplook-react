<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class OrderHistory extends Model
{
    use HasFactory;
    protected $table      = 'ps_order_history';
    protected $primaryKey = 'id_order_history';
    public $timestamps     = false;

    public static function updateOrderHistory($id_order, $pis_config)
    {
        $user          = Auth::user();
        $order_history = OrderHistory::changeIdOrderState($id_order, $pis_config[2]['value'], $user->id_employee);
        // OrderHistory::addWithemail(true, false, $context);
        return $order_history;
    }

    public static function changeIdOrderState($id_order, $success_state, $user)
    {
        $order_history = OrderHistory::insert([
            'id_employee'    => $user,
            'id_order'       => $id_order,
            'id_order_state' => $success_state,
            'date_add'       => date('Y-m-d H:i:s'),
        ]);

        $order = Order::updateCurrentstate($id_order, $success_state);
        return $order_history;
    }

    public static function addWithemail()
    {

    }
}
