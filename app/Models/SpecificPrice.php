<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SpecificPrice extends Model
{
    use HasFactory;

    protected $table      = 'ps_specific_price';
    protected $primaryKey = 'id_specific_price';

    public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id_product', 'id_product');
    }
}
