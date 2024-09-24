<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductAvailability extends Model
{
    use HasFactory;

    protected $table      = 'ps_product_availability';
    protected $primaryKey = 'id_product_availability';

    public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id_product', 'id_product');
    }
}
