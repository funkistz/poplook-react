<?php

namespace App\Models\Marketing\Logs;

use App\Models\Marketing\Campaign;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignEmailLogs extends Model
{
    protected $connection = 'mysql_marketing';

    use HasFactory;

    protected $fillable = [
      'campaign_id',
      'customer_profile_id',
      'email',
      'status',
      'is_open',
      'is_clicked',
      'mail_status',
      'error_logs'
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class, 'campaign_id');
    }
}
