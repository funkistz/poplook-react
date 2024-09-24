<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class CustomPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
        'description',
        'data',
        'active',
    ];

    public function scopeDesktop(Builder $query): void
    {
        $query->where('type', 'desktop');
    }

    public function scopeMobile(Builder $query): void
    {
        $query->where('type', 'mobile');
    }

    public static function get_select_data()
    {
        $categories = CustomPage::get();

        $cat = [];
        foreach ($categories as $key => $value) {
            $cat[$key]['label'] = $value->name;
            $cat[$key]['value'] = $value->id . '-' . $value->url;
        }
        $collection = collect(
            $cat,
        );

        return $collection;

    }

    public static function get_select_data_without_id()
    {
        $categories = CustomPage::get();

        $cat = [];
        foreach ($categories as $key => $value) {
            $cat[$key]['label'] = $value->name;
            $cat[$key]['value'] = $value->url;
        }
        $collection = collect(
            $cat,
        );

        return $collection;
    }
}
