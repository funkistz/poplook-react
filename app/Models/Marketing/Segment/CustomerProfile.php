<?php

namespace App\Models\Marketing\Segment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerProfile extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';

    public $fillable = [
        'ps_customer_id',
        'name',
        'email',
        'shop_id',
        'is_subscribed_email',
        'is_subscribed_whatsapp',
        'is_web_notification',
        'is_app_notification'
    ];

    public function segment()
    {
        return $this->hasMany(SegmentGroupTarget::class, 'customer_profile_id', 'id');
    }

    public function token()
    {
        return $this->hasMany(CustomerToken::class, 'customer_profile_id', 'id');
    }
}
