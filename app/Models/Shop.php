<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shop extends Model
{
    use HasFactory;

    protected $table = 'ps_shop';
    protected $primaryKey = 'id_shop';

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function currency()
    {
        return $this->hasOne(CurrencyShop::class, 'id_shop');
    }

    public static function getAllShop()
    {
        $shop = Shop::get();

        $result = [];
        foreach ($shop as $key => $value) {
            $result[$key]['value'] = strval($value->id_shop);
            $result[$key]['label'] = $value->name;
        }
        $collection = collect(
            $result,
        );

        return $collection;
    }
}
