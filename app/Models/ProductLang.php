<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ProductLang extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table      = 'ps_product_lang';
    protected $primaryKey = 'id_lang';

    const CREATED_AT = 'date_add';
    const UPDATED_AT = 'date_upd';
    public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id_product', 'id_product');
    }

    public function CategoryProduct(): HasMany
    {
        return $this->hasMany(CategoryProduct::class, 'id_product', 'id_product');
    }
}
