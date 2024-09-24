<?php

namespace App\Models\Marketing\Campaign;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignEmail extends Model
{
    use HasFactory;
    protected $connection = 'mysql_marketing';

    protected $fillable = [
        'campaign_id',
        'from',
        'reply_to',
        'subject',
        'preheader',
    ];

}
