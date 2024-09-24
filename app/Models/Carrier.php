<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Carrier extends Model
{
    use HasFactory;

    protected $table = 'ps_carrier';
    protected $primaryKey = 'id_carrier';
    
    public function order(): HasOne
    {
        return $this->hasOne(Order::class, 'id_carrier', 'id_carrier');
    }
}
