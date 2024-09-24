<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\ConfigurationSettingGroup;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConfigurationSetting extends Model
{
    use HasFactory;
    protected $table      = 'configuration_setting';
    protected $primaryKey = 'id';

    public function configuration(): HasOne
    {
        return $this->hasOne(Configuration::class , 'name', 'name');
    }

    public function configurationSettingGroup(): BelongsTo
    {
        return $this->belongsTo(ConfigurationSettingGroup::class, 'id_configuration_setting_group', 'id');

    }
}
