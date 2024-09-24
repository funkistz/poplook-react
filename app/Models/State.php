<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class State extends Model
{
    use HasFactory;
    protected $table      = 'ps_state';
    protected $primaryKey = 'id_state';

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class, 'id_state', 'id_state');
    }

    public static function getStateByShop($id_country)
    {
        return  State::where('id_country', $id_country)
            ->where('active', 1)
            ->orderBy('position')
            ->get()
            ->map(function ($state) {
                return [
                    'id' => $state->id_state,
                    'zone_id' => $state->id_zone,
                    'name' => $state->name,
                    'iso_code' => $state->iso_code,
                    'tax_behavior' => $state->tax_behavior,
                ];
            });

    }
}
