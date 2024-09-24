<?php

namespace App\Models\Product;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $table = 'ps_image';
    protected $primaryKey = 'id_image';

    public function product()
    {
        $this->belongsTo(Product::class, 'id_product');
    }
}
