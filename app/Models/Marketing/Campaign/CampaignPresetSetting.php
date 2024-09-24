<?php

namespace App\Models\Marketing\Campaign;

use App\Models\Marketing\Campaign;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignPresetSetting extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';

    protected $fillable = [
       'campaign_id',
       'loyalty_level',
       'shop_id'
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class, 'campaign_id');
    }
}
