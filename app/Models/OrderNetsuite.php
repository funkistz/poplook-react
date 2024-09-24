<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderNetsuite extends Model
{
    use HasFactory;

    protected $table = 'ps_order_netsuite';
    protected $primaryKey = 'id_order_netsuite';

    public function order(): HasOne
    {
        return $this->hasOne(Order::class, 'id_order', 'id_order');
    }
}
