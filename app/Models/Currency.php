<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Currency extends Model
{
    use HasFactory;
    protected $table = 'ps_currency';
    protected $primaryKey = 'id_currency';

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'id_currency', 'id_currency');
    }

    public function shop()
    {
        return $this->hasOne(CurrencyShop::class, 'id_currency');
    }
}
