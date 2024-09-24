<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupShop extends Model
{
    use HasFactory;

    protected $table      = 'ps_group_shop';
    protected $primaryKey = 'id_group';
    protected $fillable   = [
        'id_group', 'id_shop',
    ];
    public $timestamps = false;

    public function group():BelongsTo
    {
        return $this->belongsTo(Group::class, 'id_group');
    }
}
