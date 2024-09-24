<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $table = 'ps_stock_available';

    protected $primaryKey = 'id_stock_available';

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product', 'id_product');
    }
}
