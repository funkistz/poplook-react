<?php

namespace App\Models;

use App\Models\Product\Image;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use HasApiTokens, HasFactory, Notifiable, Searchable;

    protected $table      = 'ps_product';
    protected $primaryKey = 'id_product';
    public $timestamps = false;
    const CREATED_AT = 'date_add';
    const UPDATED_AT = 'date_upd';

    public function toSearchableArray()
    {
        return [
          'id' => (int) $this->id_product,
          'name' => $this->productLang == null ? '' : $this->productLang->name,
          'description' => $this->productLang == null ? '' : $this->productLang->description,
        ];
    }
    public function categoryProduct(): HasMany
    {
        return $this->hasMany(CategoryProduct::class, 'id_product', 'id_product');
    }

    public function productLang(): HasOne
    {
        return $this->hasOne(ProductLang::class, 'id_product', 'id_product');
    }

    public function productAvailability(): HasOne
    {
        return $this->hasOne(ProductAvailability::class, 'id_product', 'id_product');
    }

    public function stock():HasOne
    {
        return $this->hasOne(Stock::class, 'id_product', 'id_product');
    }

    public function productImage()
    {
        return $this->hasMany(ProductImage::class, 'id_product', 'id_product');
    }

    public function specificPrice(): HasMany
    {
        return $this->hasMany(SpecificPrice::class, 'id_product', 'id_product');
    }

    public function category()
    {
        return $this->belongsTo(Categories::class, 'id_category_default');
    }

    public function image()
    {
        return $this->hasMany(Image::class, 'id_product');
    }

}
