<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 'ps_order_detail';
    protected $primaryKey = 'id_order_detail';
    public $timestamps = false;

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'id_order', 'id_order');
    }

    public static function updateQty($param){
        foreach ($param as $key => $value) {
            # code...
            $order = OrderDetail::find($key);
            $order->product_quantity = $value;
            $order->save();
        }
        return true;
    }
}
