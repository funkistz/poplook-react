<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class NavigationLinkRole extends Model
{
    use HasFactory;
    protected $table    = 'navigation_link_role';
    protected $fillable = [
        'id_navigation_link',
        'id_role',
    ];

    public function role(): BelongsTo
    {
        return $this->BelongsTo(Role::class, 'id_role', 'id');
    }

    public function navigationLink(): BelongsTo
    {
        return $this->BelongsTo(NavigationLink::class, 'id_navigation_link', 'id');
    }

    public function navigationLinkChildren(): BelongsTo
    {
        return $this->BelongsTo(NavigationLinkChildren::class, 'id_navigation_link_children', 'id');
    }

    public static function createNavigationRole($id_navigation_link, $id_role)
    {
        DB::enableQueryLog();
        $result = NavigationLinkRole::where('id_navigation_link', $id_navigation_link)
        // ->whereIn('id_role', $id_role)
            ->delete();
        // $result->delete();
        $insert_param = [];
        $insert_arr   = [];
        foreach ($id_role as $key => $value) {
            $insert_arr = [
                'id_navigation_link' => $id_navigation_link,
                'id_role'            => $value,
            ];
            array_push($insert_param, $insert_arr);
        }
        NavigationLinkRole::insert($insert_param);
        return $result;
    }

    public static function createNavigationRoleThroughRole($id_role, $explode_nav_link)
    {
        DB::enableQueryLog();
        $result = NavigationLinkRole::where('id_role', $id_role)
            ->delete();

        $insert_param = [];
        $insert_arr   = [];
        foreach ($explode_nav_link['id_navigation_link'] as $key => $value) {
            $insert_arr = [
                'id_navigation_link'          => $value,
                'id_navigation_link_children' => $explode_nav_link['id_navigation_link_children'][$key],
                'id_role'                     => $id_role,
            ];
            array_push($insert_param, $insert_arr);
        }
        NavigationLinkRole::insert($insert_param);
        return $result;
    }

    public static function getNavigationLinkSelection($role)
    {
        $query = NavigationLinkRole::leftJoin('navigation_link', function ($join) {
            $join->on('navigation_link.id', '=', 'navigation_link_role.id_navigation_link');
        })
            ->leftJoin('navigation_link_children', function ($join) {
                $join->on('navigation_link_children.id', '=', 'navigation_link_role.id_navigation_link_children');
            })->where('id_role', $role->id)->get(['navigation_link.id AS parent_id', 'navigation_link.label AS parent_label', 'navigation_link.link AS parent_link', 'navigation_link_children.id AS children_id', 'navigation_link_children.label AS children_label', 'navigation_link_children.link AS children_link']);

        $result_array = [];
        foreach ($query as $key => $value) {
            $result_array[$value['parent_label']][$value['parent_id']]['label'] = $value['parent_label'];
            $result_array[$value['parent_label']][$value['parent_id']]['link']  = $value['parent_link'];
            if ($value['children_id']) {
                $result_array[$value['parent_label']]['children'][$value['children_id']]['label'] = $value['children_label'];
                $result_array[$value['parent_label']]['children'][$value['children_id']]['link']  = $value['children_link'];
            } else {
                $result_array[$value['parent_label']]['children'] = [];
            }
        }
        return $result_array;
        return $query;
    }
}
