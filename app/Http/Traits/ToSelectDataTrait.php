<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait ToSelectDataTrait
{

    public function scopeToSelectData(Builder $query)
    {
        return $query->get()->map(function ($model) {
            return [
                'label' => $model->name,
                'value' => $model->id,
            ];
        });
    }

    public function scopeToSelectDataCode(Builder $query)
    {
        return $query->get()->map(function ($model) {
            return [
                'label' => $model->name,
                'value' => $model->code,
            ];
        });
    }
}
