<?php

namespace App\Models;

use App\Models\Marketing\Campaign;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Support\Facades\DB;

class Employee extends Model
{
    use HasFactory;

    protected $table      = 'ps_employee';
    protected $primaryKey = 'id_employee';
    protected $guarded    = ['id_employee'];
    public $timestamps    = false;

    protected $hidden = [
        'passwd', 'remember_token',
    ];

    public function navigationLink(): HasManyThrough
    {
        return $this->HasManyThrough(NavigationLink::class, NavigationLinkRole::class, 'id_role', 'id', 'id_role', 'id_navigation_link')->where('active', 1)->with(['NavigationLinkChildren'])->orderBy('id_navigation_link');
    }

    public function navigationLinkChildren(): HasManyThrough
    {
        return $this->HasManyThrough(NavigationLinkChildren::class, NavigationLink::class, 'id', 'id', 'id_navigation_link', 'id');
    }

    public function role(): HasOne
    {
        return $this->HasOne(Role::class,'id', 'id_role');
        // return $this->HasManyThrough(Role::class, NavigationLinkRole::class, 'id_navigation_link', 'id', 'id_role', 'id_role');
    }

    public function getAuthPassword()
    {
        return $this->passwd;
    }

    public function update_profile($request)
    {
        $this->firstname = $request->firstname;
        $this->lastname  = $request->lastname;
        $this->active    = $request->active;
        $this->save();
        return true;
    }

    public function update_password($request)
    {
        $this->passwd          = md5($request->password);
        $this->last_passwd_gen = Carbon::now();
        $this->save();
        return true;
    }

    public function update_status($request)
    {
        $this->active = $request->active;
        $this->save();
        return true;
    }

    public function update_role($request)
    {
        $this->id_role = $request->id_role;
        $this->save();
        return true;
    }

    public function register($request)
    {
        $this->id_profile               = 1;
        $this->id_lang                  = 1;
        $this->id_role                  = $request->id_role;
        $this->lastname                 = $request->lastname;
        $this->firstname                = $request->firstname;
        $this->email                    = $request->email;
        $this->passwd                   = md5(12345);
        $this->last_passwd_gen          = now()->format('Y-m-d H:i:s');
        $this->stats_date_from          = now()->format('Y-m-d');
        $this->stats_date_to            = now()->addYear()->format('Y-m-d H:i:s');
        $this->bo_color                 = null;
        $this->bo_theme                 = 'default';
        $this->default_tab              = 83;
        $this->bo_width                 = 0;
        $this->bo_show_screencast       = 0;
        $this->active                   = 1;
        $this->id_last_order            = 0;
        $this->id_last_customer_message = 0;
        $this->id_last_customer         = 0;
        $this->save();
        return true;
    }

    public function campaign()
    {
        return $this->hasMany(Campaign::class, 'ps_employee_id', 'id_employee');
    }

    public function getNavigationList($user)
    {
        DB::enableQUeryLog();
        // $result       = NavigationLinkRole::with(['NavigationLink', 'navigationLinkChildren'])->where('id_role', $user->id_role)->get();
        $result = NavigationLinkRole::leftJoin('navigation_link', function ($join) {
            $join->on('navigation_link.id', '=', 'navigation_link_role.id_navigation_link');
        })
            ->leftJoin('navigation_link_children', function ($join) {
                $join->on('navigation_link_children.id', '=', 'navigation_link_role.id_navigation_link_children');
            })->where('id_role', $user->id_role)
            ->orderBy('navigation_link_role.id_navigation_link')
            ->orderBy('navigation_link_role.id_navigation_link_children')
            ->get([
                'navigation_link.id AS parent_id',
                'navigation_link.label AS parent_label',
                'navigation_link.icon AS parent_icon',
                'navigation_link.link AS parent_link',
                'navigation_link_children.id AS children_id',
                'navigation_link_children.label AS children_label',
                'navigation_link_children.link AS children_link',
            ]);
        $query        = DB::getRawQueryLog();
        $result_array = [];
        foreach ($result as $key => $value) {
            $result_array[$value['parent_label']]['parent']['label'] = $value['parent_label'];
            $result_array[$value['parent_label']]['parent']['icon']  = $value['parent_icon'];
            $result_array[$value['parent_label']]['parent']['link']  = $value['parent_link'];
            if ($value['children_id']) {
                $result_array[$value['parent_label']]['children'][$value['children_id']]['label'] = $value['children_label'];
                $result_array[$value['parent_label']]['children'][$value['children_id']]['link']  = $value['children_link'];
            } else {
                $result_array[$value['parent_label']]['children'] = [];
            }
        }
        return $result_array;
    }
}
