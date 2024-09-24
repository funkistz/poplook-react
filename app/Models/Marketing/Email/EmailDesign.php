<?php

namespace App\Models\Marketing\Email;

use App\Models\Marketing\Campaign;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailDesign extends Model
{
    protected $connection = 'mysql_marketing';

    use HasFactory;

    protected $fillable = [
        'html'
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class, 'campaign_id', 'id');
    }
}
