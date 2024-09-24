<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'ps_top_navigation';

    public static function top_menu($device_type, $id_shop){

        $query = Menu::where('is_active', 1)
        ->where('device_type', $device_type)
        ->orderBy('created_at')
        ->get();

        return $query;
    }
}
