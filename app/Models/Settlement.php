<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Settlement extends Model
{
    use HasFactory;
    protected $table      = 'settlement';
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
        'data'
    ];

    public function order():HasMany
    {
        return $this->hasMany(Order::class, 'id_settlement', 'id');
    }
}
