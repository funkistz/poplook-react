<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerTier extends Model
{
    use HasFactory;

    protected $table      = 'ps_customer_tier';
    protected $primaryKey = 'id';

    protected $fillable = [
      'customer_id',
      'netamount',
      'taxtotal',
      'currency',
      'tier',
      'date',
      'giftSilver',
      'giftGold',
      'popped',
      'emailed'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
