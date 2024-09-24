<?php

namespace App\Models\Marketing\Campaign;

use App\Models\Marketing\Campaign;
use App\Models\Marketing\Design\TemplateDesign;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignDesign extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';

    protected $fillable = [
        'campaign_id',
        'template_design_id',
    ];


    public function campaign()
    {
        return $this->belongsTo(Campaign::class, 'campaign_id', 'id');
    }
    public function template()
    {
        return $this->belongsTo(TemplateDesign::class, 'template_design_id');
    }

}
