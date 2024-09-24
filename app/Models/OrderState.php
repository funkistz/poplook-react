<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderState extends Model
{
    use HasFactory;

    protected $table = 'ps_order_state';
    protected $primaryKey = 'id_order_state';

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'id_order_state', 'id_order_state');
    }

    public function orderStateLang(): HasOne
    {
        return $this->hasOne(OrderStateLang::class, 'id_order_state', 'id_order_state');
    }
}
