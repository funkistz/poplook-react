<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

class Role extends Model
{
    use HasFactory;

    protected $table    = 'role';
    protected $fillable = [
        'id',
        'name',
        'action',
    ];

    public function employee(): HasMany
    {
        return $this->hasMany(Employee::class, 'id', 'id_role');
    }

    public function navigationLinkRole(): HasMany
    {
        return $this->hasMany(NavigationLinkRole::class, 'id_role', 'id');
    }

    public function navigationLink(): HasManyThrough
    {
        return $this->HasManyThrough(NavigationLink::class, NavigationLinkRole::class, 'id_role', 'id', null, 'id_navigation_link');
    }

    public function navigationLinkChildren(): HasManyThrough
    {
        return $this->HasManyThrough(NavigationLinkChildren::class, NavigationLinkRole::class, 'id_role', 'id', null, 'id_navigation_link_children')->orderBy('id');
    }

    public static function getList($searchTerm, $sortColumn, $sortOrder, $pagination)
    {

        $query = new Role;
        // $query->leftJoin('role AS r', 'r.id','=','navigationlink.id_role');
        if ($searchTerm) {
            $query->where(function ($subquery) use ($searchTerm) {
                // $subquery->where('firstname', 'like', '%' . $searchTerm . '%')
                //     ->orWhere('lastname', 'like', '%' . $searchTerm . '%')
                //     ->orWhere('email', 'like', '%' . $searchTerm . '%');
            });
        }

        $query->orderBy($sortColumn, $sortOrder);
        $list = $query->paginate($pagination);
        return $list;
    }

    public static function getRoleSelection()
    {
        $result = Role::all();

        $role_selection = [];
        $val            = [];
        foreach ($result as $key => $value) {
            $val[] = "{value:" . $value['id'] . ",label:" . $value['name'] . "}";
            // array_push($role_selection,$val);
        }
        return $val;
    }

    public static function getRoleFilter()
    {
        $role = Role::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->orderBy('name')
            ->get()
            ->prepend((object)['value' => '', 'label' => 'All'])
            ->push((object)['value' => '0', 'label' => '-']);

        return $role;
    }
}
