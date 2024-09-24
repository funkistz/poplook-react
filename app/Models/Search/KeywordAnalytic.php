<?php

namespace App\Models\Search;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeywordAnalytic extends Model
{
    use HasFactory;

    protected $fillable = [
      'keyword',
      'clicks',
      'searches'
    ];

    protected $casts = [
       'searches' => 'array',
       'clicks' => 'array'
    ];

    public function queryanalytic()
    {
        return $this->belongsTo(QueryAnalytic::class, 'query_analytic_id');
    }
}
