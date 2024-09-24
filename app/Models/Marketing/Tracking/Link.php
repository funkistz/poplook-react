<?php

namespace App\Models\Marketing\Tracking;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $connection = 'mysql_marketing';

    use HasFactory;

    protected $fillable = [
        'link',
        'link_uuid'
    ];
}
