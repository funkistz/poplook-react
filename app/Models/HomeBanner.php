<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class HomeBanner extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'home_banners';
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

        $live = HomeBanner::activeLive()->where('type', $type)->first();

        if ($live) {
            $banners->push($live);
        }
        $active = HomeBanner::active()->where('type', $type)->get();

        if ($active) {
            $banners = $banners->merge($active);
        }

        return $banners;
    }

    public static function getDraftList($type)
    {
        $banners = HomeBanner::where('active', '!=', 1)->where('type', $type)->orderBy('created_at', 'DESC')->get();

        return $banners;
    }

    // public static function getBannerId()
    // {
    //     $banner = new HomeBanner();
    //     return $banner->find(1);
    // }

    // public static function updateBanner($param, $id)
    // {
    //     if (empty($param)) {
    //         # code...
    //         return false;
    //     }
    //     $homebanner              = HomeBanner::find($id);
    //     $homebanner->name        = (!empty($param['name'])) ? $param['name'] : null;
    //     $homebanner->description = (!empty($param['description'])) ? $param['description'] : null;
    //     $homebanner->data        = (!empty($param['data'])) ? $param['data'] : null;
    //     $homebanner->start_at    = (!empty($param['start_at'])) ? $param['start_at'] : null;
    //     $homebanner->save();

    //     return true;
    // }

    // public static function InsertBanner($param)
    // {
    //     if (empty($param)) {
    //         # code...
    //         return false;
    //     }
    //     $homebanner              = new HomeBanner();
    //     $homebanner->name        = (!empty($param['name'])) ? $param['name'] : null;
    //     $homebanner->description = (!empty($param['description'])) ? $param['description'] : null;
    //     $homebanner->data        = (!empty($param['data'])) ? $param['data'] : null;
    //     $homebanner->active      = false;
    //     $homebanner->save();
    //     return true;
    // }

    // public static function DuplicateBanner($param)
    // {
    //     if (empty($param)) {
    //         # code...
    //         return false;
    //     }
    //     $banner                  = HomeBanner::find($param['id']);
    //     $homebanner              = new HomeBanner();
    //     $homebanner->name        = $param['name'];
    //     $homebanner->description = $param['description'];
    //     $homebanner->data        = $banner['data'];
    //     $homebanner->active      = false;
    //     $homebanner->save();
    //     return true;
    // }

    // public static function RemoveBanner($param)
    // {

    //     if (empty($param)) {
    //         # code...
    //         return false;
    //     }

    //     $homebanner = HomeBanner::find($param);
    //     if ($homebanner) {
    //         $homebanner->delete();
    //         return true;
    //     }

    //     return false;
    // }

    // public static function activateBanner($param)
    // {
    //     $banner = HomeBanner::find($param['id']);
    //     if (!empty($banner)) {
    //         # code...
    //         $banner->active   = true;
    //         $banner->start_at = $param['start_at'];
    //         $banner->save();
    //         return true;
    //     }
    //     return false;
    // }

    // public static function deactivateBanner($id)
    // {
    //     $banner = HomeBanner::firstWhere('id', $id);
    //     if (!empty($banner)) {
    //         # code...
    //         $banner->active   = 0;
    //         $banner->start_at = null;
    //         $banner->save();
    //         return true;
    //     }
    //     return false;
    // }

    public static function allBannerWithStatusGroup()
    {
        $banner        = HomeBanner::all();
        $active_banner = HomeBanner::activeBanner();
        $draft_banner  = HomeBanner::draftBanner();

        $banner_list = array();
        foreach ($banner as $key => $value) {
            # code...
            $status = 'draft';
            if ($value->active) {
                # code...
                $status = 'active';
            }
            // $banner_list[$status][$value->id]['name']        = $value->name;
            // $banner_list[$status][$value->id]['status']      = $value->active;
            // $banner_list[$status][$value->id]['data']        = $value->data;
            // $banner_list[$status][$value->id]['description'] = $value->description;
            // $banner_list[$status][$value->id]['start_at']    = $value->start_at;
            $banner_list[$status][] = $value;
        }
        $collection = collect(
            $banner_list,
        );
        $banner_list['active'] = $active_banner;
        $banner_list['draft']  = $draft_banner;

        return $banner_list;
    }

    public static function activeBanner()
    {
        DB::enableQueryLog();
        $banner = HomeBanner::where('active', 1)
            ->where('start_at', '>=', '(select start_at
        from home_banners hbs
        where start_at <= now()
        and active = 1
        order by start_at desc
        limit 1)')
            ->limit(3)->orderBy('start_at', 'asc')
            ->get();

        $banner = DB::select('SELECT *
            FROM home_banners
            WHERE active = 1
            AND start_at >= (select start_at
        from home_banners hbs
        where start_at <= now()
        and active = 1
        order by start_at desc
        limit 1)
        ORDER BY start_at ASC');
        $qlog = DB::getQueryLog();

        return $banner;
    }

    public static function draftBanner()
    {
        $banner = HomeBanner::where('active', 0)->orderBy('updated_at', 'desc')->get();

        return $banner;
    }
}
