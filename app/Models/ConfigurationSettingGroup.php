<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ConfigurationSettingGroup extends Model
{
    use HasFactory;
    protected $table      = 'configuration_setting_group';
    protected $primaryKey = 'id';

    public function configurationSetting(): HasMany
    {
        return $this->hasMany(ConfigurationSetting::class, 'id_configuration_setting_group', 'id');
    }
}
