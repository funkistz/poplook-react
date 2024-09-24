<?php

namespace App\Models;

use App\Models\Customer\PhoneNumber;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table      = 'ps_customer';
    protected $primaryKey = 'id_customer';

    public const CREATED_AT = 'date_add';
    public const UPDATED_AT = 'date_upd';

    protected $fillable = [
        'id_shop',
        'id_lang',
        'email',
        'secure_key',
        'passwd',
        'birthday',
        'firstname',
        'lastname',
        'newsletter',
        'optin',
        'deviceType',
        'tokenId',
        'enable_push_notification',
        'is_risk',
    ];

    public function shop(): HasOne
    {
        return $this->hasOne(Shop::class, 'id_shop', 'id_shop');
    }

    public function group(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'ps_customer_group', 'id_customer', 'id_group');
    }

    public function cart()
    {
        return $this->hasMany(Cart::class, 'id_customer', 'id_customer');
    }

    public function order(): HasMany
    {
        return $this->hasMany(Order::class, 'id_customer', 'id_customer');
    }

    public function netsuite(): HasOne
    {
        return $this->hasOne(CustomerNetsuite::class, 'id_customer', 'id_customer');
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class, 'id_customer', 'id_customer');
    }

    public function cart_rule(): HasMany
    {
        return $this->hasMany(CartRule::class, 'id_customer', 'id_customer');
    }

    public function phoneNumber(): HasOne
    {
        return $this->hasOne(PhoneNumber::class, 'id_customer', 'id_customer');
    }

    public static function get_customer_by_email($email, $password, $id_shop)
    {
        $customer = Customer::where('email', $email)
            ->where('id_shop', $id_shop)
            ->where('passwd', $password)
            ->first();
        return $customer;
    }

    public function scopeByEmail(Builder $query, $email): void
    {
        $query->where('id_shop', $email);
    }

    public function update_password($request)
    {
        $this->passwd          = md5($request->password);
        $this->last_passwd_gen = Carbon::now();
        $this->date_upd        = Carbon::now();
        $this->save();
        return true;
    }

    public function update_profile($request)
    {
        $this->firstname                           = $request->firstname;
        $this->lastname                            = $request->lastname;
        $request->store ? $this->is_store_customer = $request->store : false;
        $this->date_upd                            = Carbon::now();
        $this->save();
        return true;
    }

    public function get_customer_id_by_search($searchTerm)
    {
        $customer = Customer::where('firstname', 'like', '%' . $searchTerm . '%')
            ->orWhere('lastname', 'like', '%' . $searchTerm . '%')
            ->orWhere('email', 'like', '%' . $searchTerm . '%')
            ->pluck('id_customer');
        return $customer;
    }

    public static function getCountCustomerByMonth($request)
    {
        $currentMonth = Carbon::now()->month;
        $currentYear  = Carbon::now()->year;

        if($request->cookie('shop') == 0) {
            $query = Customer::whereMonth('date_add', $currentMonth)
                ->whereYear('date_add', $currentYear)
                ->count();

            $results = Customer::selectRaw('COUNT(*) as total_customer, MONTHNAME(date_add) as month_name')
                ->where('date_add', '>=', now()->subMonths(5))
                ->groupByRaw('MONTH(date_add), YEAR(date_add), MONTHNAME(date_add)')
                ->get();
        } else {
            $query = Customer::whereMonth('date_add', $currentMonth)
                ->whereYear('date_add', $currentYear)
                ->where('id_shop', $request->cookie('shop'))
                ->count();

            $results = Customer::selectRaw('COUNT(*) as total_customer, MONTHNAME(date_add) as month_name')
                ->where('date_add', '>=', now()->subMonths(5))
                ->where('id_shop', $request->cookie('shop'))
                ->groupByRaw('MONTH(date_add), YEAR(date_add), MONTHNAME(date_add)')
                ->get();
        }


        $results = $results->sortByDesc(function ($result) {
            return strtotime($result->date_add);
        });

        $cat = [];
        foreach ($results as $key => $value) {
            $cat[$key] = $value->total_customer;
        }

        $collection = collect(
            $cat,
        );

        return [
            'data'         => $query,
            'date'         => Carbon::now(),
            'recent_count' => $collection,
        ];
    }

    public static function getCustomerGroupSelection($id, $search)
    {
        if (empty($search)) {
            return [];
        }
        $customer_exist = CustomerGroup::where('id_group', $id)->get('id_customer');
        $query          = Customer::whereNotIn('id_customer', $customer_exist);
        if ($search) {
            $query->where(function ($subquery) use ($search) {
                $subquery->where('email', 'like', '%' . $search . '%');
                $subquery->orWhere('firstname', 'like', '%' . $search . '%');
                $subquery->orWhere('lastname', 'like', '%' . $search . '%');
            });
            // $query->where('email', 'like', '%' . $search . '%');
        }
        $query->leftJoin('ps_shop', 'ps_shop.id_shop', '=', 'ps_customer.id_shop');
        $query->limit(1000);
        $result = $query->with(['shop'])
            ->select(DB::raw('email as label, ps_shop.name AS group_name, id_customer AS value'))
            ->get();

        // return $result;
        $data = [];
        foreach ($result as $key => $value) {
            $data[$value->group_name][] = $value;
        }
        return $data;
    }

    public function tier()
    {
        return $this->hasMany(CustomerTier::class, 'customer_id', 'id_customer' );
    }
}
