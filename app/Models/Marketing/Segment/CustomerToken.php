<?php

namespace App\Models\Marketing\Segment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerToken extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';

    protected $fillable = [
      'customer_profile_id',
      'shop_id',
      'is_guest',
      'token',
      'type',
        'is_valid'
    ];

    public function customerProfile()
    {
        return $this->belongsTo(CustomerProfile::class, 'customer_profile_id');
    }

    public static function getCountIsvalidCustomerToken()
    {
        return CustomerToken::where('type','webpush')->where('is_valid',1)->count();
    }

}
