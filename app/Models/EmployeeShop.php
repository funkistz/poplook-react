<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeShop extends Model
{
    use HasFactory;

    protected $table = 'ps_employee_shop';
    public $timestamps = false;

    public function addShopUser($id, $shop) 
    {
        $this->id_employee = $id;
        $this->id_shop = $shop;
        $this->save();
        return true;
    }

    public function addShop($id, $shop)
    {
        $shop = new EmployeeShop();
        $shop->id_employee = $id;
        $shop->id_shop = $shop;
        $shop->save();
        return true;
    }
}


