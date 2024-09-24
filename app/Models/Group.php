<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Group extends Model
{
    use HasFactory;

    protected $table      = 'ps_group';
    protected $primaryKey = 'id_group';
    protected $fillable   = [
        'id_group', 'reduction', 'show_prices', 'price_display_methmod', 'date_add', 'date_upd'
    ];
    public $timestamps = false;

    public function groupLang(): HasOne
    {
        return $this->hasOne(GroupLang::class, 'id_group');
    }

    public function groupShop(): HasOne
    {
        return $this->hasOne(GroupShop::class, 'id_group');
    }

    public function customer(): BelongsToMany
    {
        return $this->belongsToMany(Customer::class, 'ps_customer_group', 'id_group', 'id_customer');
    }

    // public function customerGroup(): BelongsTo
    // {
    //     return $this->belongsTo(CustomerGroup::class, 'id_grop', 'id_group');
    // }

    public static function getGroupPagination($searchTerm, $searchBy, $sortColumn, $sortOrder, $pagination)
    {

        $query = new Group;
        if ($searchTerm) {
            if ($searchBy == 'email') {
                $query->whereHas('customer', function ($subquery) use ($searchTerm, $searchBy) {
                    $subquery->where($searchBy, 'like', '%' . $searchTerm . '%');
                });
            } else {
                $query->where(function ($subquery) use ($searchBy, $searchTerm) {
                    $subquery->where($searchBy, 'like', '%' . $searchTerm . '%');
                });
            }
        }

        $query->orderBy($sortColumn, $sortOrder);
        $list = $query->with(['groupLang'])->paginate($pagination);

        return $list;
    }

    public static function get_list_group()
    {
        $categories = Group::with(['groupLang'])->get();
        $cat        = [];

        foreach ($categories as $key => $value) {
            $cat[$key]['label'] = $value->groupLang->name;
            $cat[$key]['value'] = strval($value->id_group);
        }
        $collection = collect(
            $cat,
        );

        return $collection;
    }
}
