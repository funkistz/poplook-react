<?php

namespace App\Models\Search;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Json;

class QueryAnalytic extends Model
{
    use HasFactory;

    protected $fillable = [
      'search_query',
      'searches'
    ];

    protected $casts = [
        'searches' => 'array',
    ];

    public function keywords()
    {
        return $this->hasMany(KeywordAnalytic::class, 'query_analytic_id');
    }
}
