<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class CustomerGroup extends Model
{
    use HasFactory;

    protected $table      = 'ps_customer_group';
    protected $primaryKey = 'id_customer_group';
    protected $fillable = [
        'id_group', 'id_customer_group'
    ];

    public function shop(): HasOneThrough
    {
        return $this->HasOneThrough(Shop::class, Customer::class, 'id_customer', 'id_shop', 'id_customer', 'id_shop');
    }

    public function group(): HasMany
    {
        return $this->hasMany(Group::class, 'id_group', 'id_group');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public static function getCustomerGroupPagination($sortColumn, $sortOrder, $pagination, $searchTerm, $searchBy, $id = 0)
    {

        if (!empty($id)) {
            $query = CustomerGroup::where('id_group', $id);
        } else {
            $query = new CustomerGroup;
        }
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
        $list = $query->with(['customer','shop'])->paginate($pagination);

        return $list;
    }

    public static function getCustomerGroupExist($sortColumn, $sortOrder, $searchTerm, $searchBy, $id = 0)
    {

        if (!empty($id)) {
            $query = CustomerGroup::where('id_group', $id);
        } else {
            $query = new CustomerGroup;
        }
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
        $list = $query->with(['customer'])->get(['id_customer']);

        return $list;
    }

    public static function insertCustomerGroup($id_group, $id_customer_selected)
    {
        $data = [];
        foreach ($id_customer_selected as $key => $value) {
            array_push($data, [
                'id_group' => $id_group,
                'id_customer' => $value
            ]);
        }
        $query = CustomerGroup::insert($data);
    }

    public static function removeCustomerFromGroup($id_group, $id_customer){
        if (empty($id_group)) {
            return false;
        }
        if (empty($id_customer)) {
            return false;
        }
        CustomerGroup::where('id_group', $id_group)->whereIn('id_customer',$id_customer)->delete();
    }
}
