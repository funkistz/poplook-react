<?php

namespace App\Models\Marketing\Design;

use App\Models\Marketing\Campaign\CampaignDesign;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateDesign extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';

    protected $fillable = [
      'template_name',
      'template_type',
      'content',
      'html',
      'is_dynamic',
      'sg_id',
      'tw_id'
    ];

    public function campaign()
    {
        return $this->hasOne(CampaignDesign::class, 'template_design_id');
    }

    public function scopeType(Builder $query, $type = null): void
    {
        $query->where('template_type', $type);
    }

}
