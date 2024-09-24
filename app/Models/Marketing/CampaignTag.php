<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignTag extends Model
{
    protected $connection = 'mysql_marketing';

    use HasFactory;

    protected $fillable = ['tag_name', 'tag_color', 'relationships'];

    protected $casts = [
        'relationships' => 'array',
    ];

    public function campaign()
    {
        return $this->belongsToMany(Campaign::class, '', 'id')
            ->whereJsonContains('relationships', 'id');
    }
}
