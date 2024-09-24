<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderStateLang extends Model
{
    use HasFactory;

    protected $table = 'ps_order_state_lang';
    protected $primaryKey = 'id_order_state';

    public function orderState(): BelongsTo
    {
        return $this->belongsTo(OrderState::class, 'id_order_state', 'id_order_state');
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'id_order_state', 'id_order_state');
    }
}
