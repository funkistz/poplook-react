<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerNetsuite extends Model
{
    use HasFactory;

    protected $table = 'ps_customer_netsuite';
    protected $primaryKey = 'id_customer_netsuite';
    public $timestamps = false;

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }
}
