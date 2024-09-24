<?php

namespace App\Models\Marketing\Segment;

use App\Models\Marketing\Campaign\CampaignSegment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SegmentGroup extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';


    protected $fillable = [
        'id_employee',
        'group_name',
        'status',
        'id_shop',
        'generate_type',
    ];
    public function campaign()
    {
        return $this->hasMany(CampaignSegment::class, 'segment_group_id');
    }

    public function target()
    {
        return $this->hasMany(SegmentGroupTarget::class, 'segment_group_id');
    }

    public static function getSegmentGroupSelectData()
    {
        $categories = SegmentGroup::get();

        $cat = [];
        foreach ($categories as $key => $value) {
            $cat[$key]['label'] = $value->group_name;
            $cat[$key]['value'] = strval($value->id);
        }
        $collection = collect(
            $cat,
        );

        return $collection;
    }

}
