<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class CategoryProduct extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table      = 'ps_category_product';
    protected $primaryKey = 'id_category';
    public $timestamps    = false;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Categories::class, 'id_category', 'id_category');
    }

    public function categoriesLang(): HasOne
    {
        return $this->hasOne(CategoriesLang::class, 'id_category');
    }

    public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id_product', 'id_product');
    }

    public function productLang(): HasOne
    {
        return $this->hasOne(ProductLang::class, 'id_product', 'id_product');
    }

    public static function getCategoryProduct($id, $sortColumn, $sortOrder, $pagination, $searchTerm)
    {
        $queries = CategoryProduct::where('id_category', $id);
        if ($sortColumn != 'active') {
            $queries->orderBy($sortColumn, $sortOrder);
        }
        $result = $queries->with(['product' => function ($q) use ($sortColumn, $sortOrder, $searchTerm) {
            if ($sortColumn == 'active') {
                # code...
                $q->orderBy($sortColumn, $sortOrder);
            }
        }, 'productLang', 'categoriesLang'])->paginate($pagination);
        return $result;
    }

    public static function updatePosition($id, $product_arr)
    {
        if (!$product_arr || !$id) {
            return false;
        }
        foreach ($product_arr as $key => $value) {
            CategoryProduct::where('id_category', $id)->where('id_product', $key)->update(['position' => $value['position']]);
        }
    }

    public static function deleteProduct($id_category, $product_list)
    {
        DB::enableQueryLog();
        // $product = implode(',', $product_list);
        $result  = CategoryProduct::where('id_category', $id_category)->whereIn('id_product', $product_list)->delete();
        dd(DB::getRawQueryLog());

        return $result;
    }
}
