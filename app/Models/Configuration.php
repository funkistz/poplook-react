<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Configuration extends Model
{
    use HasFactory;
    protected $table = 'ps_configuration';
    protected $primaryKey = 'id_configuration';
    public $timestamps = false;


    public function configurationSetting(): BelongsTo
    {
        return $this->belongsTo(ConfigurationSetting::class);
    }

    public function updateConfig($request)
    {
        $this->value = $request['configuration']['value'];
        $this->date_upd = Carbon::now();
        $this->save();

        return true;
    }

    public static function getConfigurationValue($name = [])
    {
        if (!is_array($name)) {
            $result = Configuration::where('name', $name)->get();
        }else if(is_array($name)){
            $query = Configuration::query();
            foreach($name as $val){
                $query = $query->orWhere('name', $val);
            }
            $result = $query->get();
        }
        return $result;
    }

}
