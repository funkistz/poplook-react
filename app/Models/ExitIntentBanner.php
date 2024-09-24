<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ExitIntentBanner extends Model
{
    use HasFactory;

    protected $table      = 'exit_intent_banner';
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

        $live = ExitIntentBanner::activeLive()->where('type', $type)->first();

        if ($live) {
            $banners->push($live);
        }
        $active = ExitIntentBanner::active()->where('type', $type)->get();

        if ($active) {
            $banners = $banners->merge($active);
        }

        return $banners;
    }

    public static function getDraftList($type)
    {
        $banners = ExitIntentBanner::where('active', '!=', 1)->where('type', $type)->orderBy('created_at', 'DESC')->get();

        return $banners;
    }
}
