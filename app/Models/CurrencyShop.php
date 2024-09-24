<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrencyShop extends Model
{
    use HasFactory;

    protected $table = 'ps_currency_shop';

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'id_currency');
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'id_shop');
    }


}
