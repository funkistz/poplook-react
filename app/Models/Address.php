<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Address extends Model
{
    use HasFactory;

    protected $table      = 'ps_address';
    protected $primaryKey = 'id_address';
    const CREATED_AT      = 'date_add';
    const UPDATED_AT      = 'date_upd';
    protected $fillable   = ['firstname', 'lastname', 'company', 'address1', 'address2', 'postcode', 'city', 'id_country', 'id_state', 'phone', 'is_default'];

    public function order(): HasOne
    {
        return $this->hasOne(Order::class, 'id_address_delivery', 'id_address');
    }

    public function state(): HasOne
    {
        return $this->hasOne(State::class, 'id_state', 'id_state');
    }

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'id_country', 'id_country');
    }

    public function countrylang(): HasOne
    {
        return $this->hasOne(CountryLang::class, 'id_country', 'id_country')->where('id_lang', 1);
    }

    public static function getAddressByCustomerID($id_customer)
    {
        $address = Address::where('id_customer', $id_customer)->get();
        return $address;
    }

    public static function getAllAddress($id_customer)
    {
        $address = Address::with('countryLang')
            ->where([
            ['id_customer', '=', $id_customer],
            ['deleted', '=', 0],
        ])->get();
        return $address;
    }

    public static function setDefaultAddress($id_address, $is_default = 0)
    {
        $address = Address::find($id_address);
        //remove is default to all address
        $alladdress = Address::where('id_customer', $address->id_customer)->update(['is_default' => 0]);
        // end

        $address->is_default = $is_default;
        $address->save();
        return $address;
    }
}
