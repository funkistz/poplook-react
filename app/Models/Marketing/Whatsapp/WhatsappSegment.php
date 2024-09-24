<?php

namespace App\Models\Marketing\Whatsapp;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhatsappSegment extends Model
{
    use HasFactory;

    protected $connection = 'mysql_marketing';

    protected $fillable = [
        'country_code',
        'phone_no',
        'opt_in',
    ];
}
