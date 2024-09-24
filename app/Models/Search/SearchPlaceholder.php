<?php

namespace App\Models\Search;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchPlaceholder extends Model
{
    use HasFactory;

    protected $fillable = [
        'placeholder',
        'schedule',
        'is_active'
    ];
}
