<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Categories extends Model
{
    use HasApiTokens, HasFactory, Notifiable, \App\Http\Traits\ToSelectDataTrait;

    protected $table      = 'ps_category';
    protected $primaryKey = 'id_category';

    public function categoriesLang(): HasOne
    {
        return $this->hasOne(CategoriesLang::class, 'id_category');
    }

    public function categoryProduct(): HasMany
    {
        return $this->hasMany(CategoryProduct::class, 'id_category', 'id_category');
    }

    public static function getCategoryName($id)
    {
        $result = Categories::with(['categoriesLang' => function ($q) {
            $q->where('id_shop', 1);
            $q->where('id_lang', 1);
        }])->find($id);
        return $result;
    }

    public static function getCategoryProduct()
    {
        $result = Categories::with(['categoryProduct'])->paginate();
        return $result;
    }

    public static function getCategoriesList()
    {
        $result = Categories::withWhereHas('categoriesLang', function ($query) {
            $query->where('id_shop', 1);
            $query->where('id_lang', 1);
        })->paginate();
        return $result;
    }

    public static function get_all_categories($value_string = true)
    {
        $categories = Categories::active()->get();

        $cat = [];
        foreach ($categories as $key => $value) {
            $string_val         = (!empty($value_string)) ? ' - ' . $value->categoriesLang()->shop()->first()->name : '';
            $cat[$key]['label'] = $value->id_category . ' - ' . $value->categoriesLang()->shop()->first()->name;
            $cat[$key]['value'] = strval($value->id_category);
        }
        $collection = collect(
            $cat,
        );

        return $collection;
    }

    public static function get_select_data()
    {
        $categories = Categories::where('id_category', '!=', 1)->get();

        $cat = [];
        foreach ($categories as $key => $value) {
            $cat[$key]['label'] = $value->id_category . ' - ' . $value->categoriesLang()->shop()->first()->name;
            $cat[$key]['value'] = $value->id_category . '-' . $value->categoriesLang()->shop()->first()->link_rewrite;
            // $cat[$value->id_parent]['children'][$value->id_category] = $value->id_category . ' - ' . $value->categoriesLang()->shop()->first()->name;
        }
        $collection = collect(
            $cat,
        );

        return $collection;
    }

    public static function get_select_data_active()
    {
        $categories = Categories::where('id_category', '!=', 1)->get();

        $cat = [];
        foreach ($categories as $key => $value) {
            $cat[$key]['label'] = $value->id_category . ' - ' . $value->categoriesLang()->shop()->first()->name;
            $cat[$key]['value'] = $value->id_category . '-' . $value->categoriesLang()->shop()->first()->link_rewrite;
            // $cat[$value->id_parent]['children'][$value->id_category] = $value->id_category . ' - ' . $value->categoriesLang()->shop()->first()->name;
        }
        $collection = collect(
            $cat,
        );

        return $collection;
    }

    public static function get_all_categories_parent()
    {
        $categories = Categories::leftJoin('ps_category_lang', function ($join) {
            $join->on('ps_category.id_category', '=', 'ps_category_lang.id_category');
        })
            ->where('ps_category.active', 1)
            ->get();
        $cat = [];
        foreach ($categories as $key => $value) {
            $cat[$value->id_parent] = $value->id_parent . ' - ' . $value->name;
        }
        return $cat;
    }

    public function scopeToSelectData(Builder $query)
    {
        return $query->active()->toSelect();
        // return $query->leftJoin('ps_category_lang', function ($join) {
        //     $join->on('ps_category.id_category', '=', 'ps_category_lang.id_category');
        // })
        // ->active()
        // ->toSelect();
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('ps_category.active', 1);
    }

    public function scopeToSelect(Builder $query)
    {
        // return $query->get();
        // return $query->get()->map(function ($model) {
        //     return [
        //         'label' => $model->id_parent,
        //         'value' => $model->name,
        //     ];
        // });
        return $query->get()->map(function ($model) {
            return [
                'label' => $model->id_category,
                'value' => $model->categoriesLang()->shop()->first()->name,
            ];
        });
    }
}
