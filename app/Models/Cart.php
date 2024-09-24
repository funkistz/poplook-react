<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'ps_cart';

    protected $primaryKey = 'id_cart';

    const CREATED_AT = 'date_add';
    const UPDATED_AT = 'date_upd';

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer', 'id_customer');
    }

    public function order(): HasOne
    {
        return $this->hasOne(Order::class, 'id_cart', 'id_cart');
    }

    public function customers(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'id_customer', 'id_customer');
    }

}
