<?php

namespace App\Models\Marketing\Segment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SegmentGroupTarget extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';

    protected $fillable = [
      'segment_group_id',
      'customer_profile_id',
    ];

    public function segment()
    {
        return $this->belongsTo(SegmentGroup::class, 'segment_group_id');
    }

    public function customer()
    {
        return $this->belongsTo(CustomerProfile::class, 'customer_profile_id');
    }
}
