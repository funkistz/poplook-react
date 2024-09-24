<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupLang extends Model
{
    use HasFactory;

    protected $table      = 'ps_group_lang';
    protected $primaryKey = 'id_group';
    public $timestamps    = false;
    protected $fillable   = [
        'id_group', 'id_lang','name',
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'id_group');
    }

    public function update_name($request)
    {
        $this->name = $request;
        $this->save();
        return true;
    }
}
