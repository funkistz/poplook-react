<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CountryLang extends Model
{
    use HasFactory;
    protected $table      = 'ps_country_lang';
    protected $primaryKey = 'id_country';

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'id_country', 'id_country');
    }
}
