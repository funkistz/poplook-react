<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class CategoriesLang extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'ps_category_lang';

    public function categories(){
        return $this->belongsTo(Categories::class, 'id_category');
    }

    public function scopeShop(Builder $query, $id_shop = 1, $id_lang = 1){
        return $query->where('id_shop', $id_shop)
        ->where('id_lang', $id_lang);
    }
}
