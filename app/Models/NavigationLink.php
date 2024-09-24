<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

class NavigationLink extends Model
{
    use HasFactory;

    protected $table    = 'navigation_link';
    protected $fillable = [
        'label',
        'icon',
        'link',
    ];

    public function NavigationLinkChildren(): HasMany
    {
        return $this->hasMany(NavigationLinkChildren::class, 'id_navigation_link', 'id');
    }

    public function NavigationLinkRole(): HasMany
    {
        return $this->hasMany(NavigationLinkRole::class, 'id_navigation_link', 'id');
    }

    public function role(): BelongsToMany
    {
        return $this->BelongsToMany(Role::class, NavigationLinkRole::class, 'id_navigation_link', 'id_role', null, 'id');
        // return $this->HasManyThrough(Role::class, NavigationLinkRole::class, 'id_navigation_link', 'id', null, 'id_role');
    }

    public static function getNavigationLinkByEmployeeProfile($id_profile)
    {
        // DB::enableQueryLog();
        $result = NavigationLink::all();
        // $result = NavigationLink::whereRaw("find_in_set('" . $id_profile . "',id_role)")->get();
        // dd(DB::getRawQueryLog());
        return $result;
    }

    public static function getList($searchTerm, $sortColumn, $sortOrder, $pagination)
    {

        DB::enableQueryLog();
        $query = new NavigationLink;
        // $query = NavigationLink::leftJoin('navigation_link_role', function($join) {
        //     $join->on('navigation_link.id', '=', 'navigation_link_role.id_navigation_link');
        // })->leftJoin('role', function($join){
        //     $join->on('role.id', '=', 'navigation_link_role.id_role');
        // });
        if ($searchTerm) {
            $query->where(function ($subquery) use ($searchTerm) {

            });
        }
        $query->orderBy($sortColumn, $sortOrder);
        // $list = $query->paginate($pagination);
        $list = $query->with(['role', 'navigationLinkChildren'])->paginate($pagination);
        // dd(DB::getRawQueryLog());
        return $list;
    }

    public static function updateStatus($active, $id)
    {
        $result = NavigationLink::where('id', $id)->update(['active' => $active]);
        return $result;
    }
}
