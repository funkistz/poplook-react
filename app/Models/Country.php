<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Country extends Model
{
    use HasFactory;
    protected $table      = 'ps_country';
    protected $primaryKey = 'id_country';

    public function lang()
    {
        return $this->hasOne(CountryLang::class, 'id_country', 'id_country');
    }
    public function address(): HasOne
    {
        return $this->hasOne(Address::class, 'id_country', 'id_country');
    }
    public function countryLang() : HasOne
    {
        return $this->hasOne(CountryLang::class, 'id_country', 'id_country');
    }

    public static function getCountryByShop($id_shop)
    {
        if($id_shop == 1) {
            return Country::with('countryLang')
                ->where('id_country', 136)
                ->orderBy('id_country')
                ->get(['id_country', 'iso_code'])
                ->map(function ($country) {
                    return [
                        'id_country' => $country->id_country,
                        'iso_code' => $country->iso_code,
                        'name' => $country->countryLang->name
                    ];
                });
        } else if($id_shop == 2) {
            return Country::with('countryLang')
                ->where('id_country', 25)
                ->orderBy('id_country')
                ->get(['id_country', 'iso_code'])
                ->map(function ($country) {
                    return [
                        'id_country' => $country->id_country,
                        'iso_code' => $country->iso_code,
                        'name' => $country->countryLang->name
                    ];
                });
        } else if($id_shop == 3) {
            return Country::with('countryLang')
                ->whereNotIn('id_country', [136])
                ->orderBy('id_country')
                ->get(['id_country', 'iso_code'])
                ->map(function ($country) {
                    return [
                        'id_country' => $country->id_country,
                        'iso_code' => $country->iso_code,
                        'name' => $country->countryLang->name
                    ];
                });
        }

        return Country::with('countryLang')
            ->orderBy('id_country')
            ->get(['id_country', 'iso_code'])
            ->map(function ($country) {
                return [
                    'id_country' => $country->id_country,
                    'iso_code' => $country->iso_code,
                    'name' => $country->countryLang->name
                ];
            });


        
    }
}
