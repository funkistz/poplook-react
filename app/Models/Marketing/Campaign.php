<?php

namespace App\Models\Marketing;

use App\Models\Employee;
use App\Models\Marketing\Campaign\CampaignDesign;
use App\Models\Marketing\Campaign\CampaignEmail;
use App\Models\Marketing\Campaign\CampaignPresetSetting;
use App\Models\Marketing\Campaign\CampaignSegment;
use App\Models\Marketing\Email\EmailDesign;
use App\Models\Marketing\Logs\CampaignEmailLogs;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $connection = 'mysql_marketing';

    use HasFactory;

    protected $fillable = [
      'ps_employee_id',
      'uuid',
      'campaign_name',
      'campaign_category',
      'campaign_type',
      'activation_status',
      'start_date',
      'start_time',
      'campaign_status',
        'type',
        'is_preset',
        'preset_type',
        'is_lock'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'ps_employee_id', 'id_employee');
    }

    public function template()
    {
        return $this->hasOne(CampaignDesign::class, 'campaign_id', 'id');
    }
    public function emailDesign()
    {
        return $this->hasOne(EmailDesign::class, 'campaign_id', 'id');
    }

    public function mail()
    {
        return $this->hasOne(CampaignEmail::class, 'campaign_id', 'id');
    }

    public function segment()
    {
        return $this->hasOne(CampaignSegment::class, 'campaign_id', 'id');
    }

    public function preset()
    {
        return $this->hasOne(CampaignPresetSetting::class, 'campaign_id', 'id');
    }

    public function tags()
    {
        return $this->belongsToMany(CampaignTag::class, 'relationship', 'id', '')
            ->whereJsonContains('campaign_tags.relationships',$this->id);
    }

    public function logs()
    {
        return $this->hasMany(CampaignEmailLogs::class, 'campaign_id', 'id');
    }


}
