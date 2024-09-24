<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class TopMenu extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'top_menus';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'description',
        'data',
        'start_at',
    ];

    public function scopeDesktop(Builder $query): void
    {
        $query->where('type', 'desktop');
    }

    public function scopeMobile(Builder $query): void
    {
        $query->where('type', 'mobile');
    }

    public function scopeActiveLive(Builder $query): void
    {
        $query->where('active', 1)->whereRaw('start_at <= NOW()')->orderBy('start_at', 'DESC');
    }

    public function scopeActive(Builder $query): void
    {
        $query->where('active', 1)->whereRaw('start_at > NOW()')->orderBy('start_at', 'ASC');
    }

    public static function getLiveList($type)
    {
        $banners = collect();

        $live = TopMenu::activeLive()->where('type', $type)->first();

        if ($live) {
            $banners->push($live);
        }
        $active = TopMenu::active()->where('type', $type)->get();

        if ($active) {
            $banners = $banners->merge($active);
        }

        return $banners;
    }

    public static function getDraftList($type)
    {
        $banners = TopMenu::where('active', '!=', 1)->where('type', $type)->orderBy('created_at', 'DESC')->get();

        return $banners;
    }

    // public static function allWithStatusGroup()
    // {
    //     $top_menus        = TopMenu::all();
    //     $active_top_menu = TopMenu::activeTopMenu();
    //     $draft_top_menu  = TopMenu::draftTopMenu();

    //     $top_menu_list = array();
    //     foreach ($top_menus as $key => $value) {
    //         # code...
    //         $status = 'draft';
    //         if ($value->active) {
    //             # code...
    //             $status = 'active';
    //         }
    //         // $banner_list[$status][$value->id]['name']        = $value->name;
    //         // $banner_list[$status][$value->id]['status']      = $value->active;
    //         // $banner_list[$status][$value->id]['data']        = $value->data;
    //         // $banner_list[$status][$value->id]['description'] = $value->description;
    //         // $banner_list[$status][$value->id]['start_at']    = $value->start_at;
    //         $top_menu_list[$status][] = $value;
    //     }
    //     $collection = collect(
    //         $top_menu_list,
    //     );
    //     $top_menu_list['active'] = $active_top_menu;
    //     $top_menu_list['draft']  = $draft_top_menu;

    //     return $top_menu_list;
    // }
    // public static function activeTopMenu()
    // {
    //     $top_menu = TopMenu::where('active', 1)
    //         ->where('start_at', '>=', '(select start_at
    //     from home_banners hbs
    //     where start_at <= now()
    //     and active = 1
    //     order by start_at desc
    //     limit 1)')
    //         ->limit(3)->orderBy('start_at', 'asc')
    //         ->get();

    //     return $top_menu;
    // }
    // public static function draftTopMenu()
    // {
    //     $top_menu = TopMenu::where('active', 0)->orderBy('updated_at', 'desc')->get();

    //     return $top_menu;
    // }
}
