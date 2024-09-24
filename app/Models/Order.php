<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;

    protected $table      = 'ps_orders';
    protected $primaryKey = 'id_order';
    public $timestamps    = false;

    public function customer(): BelongsTo
    {
        return $this->BelongsTo(Customer::class, 'id_customer', 'id_customer');
    }

    public function currency(): HasOne
    {
        return $this->hasOne(Currency::class, 'id_currency', 'id_currency');
    }

    public function shop(): HasOne
    {
        return $this->hasOne(Shop::class, 'id_shop', 'id_shop');
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class, 'id_cart', 'id_cart');
    }

    public function orderstate(): HasOne
    {

        // return $this->hasManyThrough(OrderStateLang::class, OrderState::class,'id_order_state', 'id_order_state', 'current_state')->where('id_lang', 1);
        return $this->hasOne(OrderState::class, 'id_order_state', 'current_state');
    }

    public function orderstatelang(): HasOne
    {
        // return $this->hasManyThrough(OrderStateLang::class,OrderState::class);
        return $this->hasOne(OrderStateLang::class, 'id_order_state', 'current_state')->where('id_lang', 1);
    }

    public function ordernetsuite(): HasOne
    {
        return $this->hasOne(OrderNetsuite::class, 'id_order', 'id_order');
    }

    public function address(): HasOne
    {
        return $this->hasOne(Address::class, 'id_address', 'id_address_delivery');
    }

    public function orderdetail(): HasMany
    {
        return $this->hasMany(OrderDetail::class, 'id_order', 'id_order');
    }

    public function carrier(): HasOne
    {
        return $this->hasOne(Carrier::class, 'id_carrier', 'id_carrier');
    }

    public function orderPaymentByReference(): HasOne
    {
        return $this->hasOne(OrderPayment::class, 'order_reference', 'reference')->orderBy('payment_method');
    }

    public function settlement(): HasOne
    {
        return $this->hasOne(Settlement::class, 'id', 'id_settlement');
    }

    // public function country(): HasOneThrough
    // {
    //     return $this->hasOneThrough(Address::class, Country::class, 'id_country', 'id_country', 'id_country');
    // }

    public static function orderList($sortColumn, $sortOrder, $pagination, $searchTerm, $filterTerm)
    {
        $filter = explode(',', $filterTerm);

        if ($searchTerm) {
            $customer         = new Customer;
            $cust_search_list = $customer->get_customer_id_by_search($searchTerm, $pagination);
        }
        DB::enableQueryLog();
        $query = Order::select('ps_orders.*');
        if ($searchTerm) {
            # code...
            $query->whereIn('id_customer', $cust_search_list);
        }
        if ($filterTerm) {
            $query->where(function ($subquery) use ($filter) {
                foreach ($filter as $key => $value) {
                    # code...
                    $column = explode('|', $value);
                    $subquery->where('ps_orders.' . $column[0], $column[1]);
                }
            });
        }
        if ($sortColumn == 'firstname') {
            # code...
        } else {
            $query->orderBy($sortColumn, $sortOrder);
        }
        $list = $query->with(['customer' => function ($q) use ($sortColumn, $sortOrder, $searchTerm) {
            if ($sortColumn == 'firstname') {
                # code...
                $q->orderBy($sortColumn, $sortOrder);
            }
        }, 'currency', 'orderstate', 'orderstatelang'])->paginate($pagination);
        $db = DB::getQueryLog();
        return $list;
    }

    public static function getCountOrderByMonth($request)
    {
        $currentMonth = Carbon::now()->month;
        $currentYear  = Carbon::now()->year;

        if ($request->cookie('shop') == 0) {
            $query = Order::whereMonth('date_add', $currentMonth)
                ->whereYear('date_add', $currentYear)
                ->count();

            $results = Customer::selectRaw('COUNT(*) as total_order, MONTHNAME(date_add) as month_name')
                ->where('date_add', '>=', now()->subMonths(5))
                ->groupByRaw('MONTH(date_add), YEAR(date_add), MONTHNAME(date_add)')
                ->get();
        } else {
            $query = Order::whereMonth('date_add', $currentMonth)
                ->whereYear('date_add', $currentYear)
                ->where('id_shop', $request->cookie('shop'))
                ->count();

            $results = Customer::selectRaw('COUNT(*) as total_order, MONTHNAME(date_add) as month_name')
                ->where('date_add', '>=', now()->subMonths(5))
                ->groupByRaw('MONTH(date_add), YEAR(date_add), MONTHNAME(date_add)')
                ->get();
        }

        $results = $results->sortByDesc(function ($result) {
            return strtotime($result->date_add);
        });

        $cat = [];
        foreach ($results as $key => $value) {
            $cat[$key] = $value->total_order;
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

    public static function getTotalSaleByMonth($request)
    {
        $currentMonth = Carbon::now()->month;
        $currentYear  = Carbon::now()->year;

        if ($request->cookie('shop') == 0) {
            $query = Order::whereMonth('date_add', $currentMonth)
                ->whereYear('date_add', $currentYear)
                ->sum('total_paid');

            $results = Order::select(DB::raw('SUM(total_paid) as sum_paid'), DB::raw('MONTH(date_add) as month'))
                ->where('date_add', '>=', now()->subMonths(5))
                ->groupBy(DB::raw('MONTH(date_add)'))
                ->orderBy(DB::raw('MONTH(date_add)'), 'desc')
                ->get();
        } else {
            $query = Order::whereMonth('date_add', $currentMonth)
                ->where('id_shop', $request->cookie('shop'))
                ->whereYear('date_add', $currentYear)
                ->sum('total_paid');

            $results = Order::select(DB::raw('SUM(total_paid) as sum_paid'), DB::raw('MONTH(date_add) as month'))
                ->where('id_shop', $request->cookie('shop'))
                ->where('date_add', '>=', now()->subMonths(5))
                ->groupBy(DB::raw('MONTH(date_add)'))
                ->orderBy(DB::raw('MONTH(date_add)'), 'desc')
                ->get();
        }

        $cat = [];
        foreach ($results as $key => $value) {
            $cat[$key] = (float) $value->sum_paid;
        }

        $collection = collect(
            $cat,
        );

        return [
            'data'         => (float) $query,
            'date'         => Carbon::now(),
            'recent_count' => $collection,
        ];
    }

    public static function getWeekSale($request)
    {
        $current    = Carbon::now()->subDay(1);
        $recentDate = Carbon::now()->subDays(5);

        if ($request->cookie('shop') == 0) {
            $results = Order::selectRaw('DATE(date_add) AS day, SUM(total_paid) AS sale')
                ->whereBetween('date_add', [$recentDate, $current])
                ->groupByRaw('DATE(date_add)')
                ->orderBy('day')
                ->get();
        } else {
            $results = Order::selectRaw('DATE(date_add) AS day, SUM(total_paid) AS sale')
                ->whereBetween('date_add', [$recentDate, $current])
                ->where('id_shop', $request->cookie('shop'))
                ->groupByRaw('DATE(date_add)')
                ->orderBy('day')
                ->get();
        }

        $results = $results->map(function ($item) {
            $item->sale = (float) $item->sale;
            return $item;
        });

        return $results;
    }

    public static function getOrdersUser($id, $req)
    {
        $pagination = $req->input('per_page', 5);
        $search     = $req->search;
        if ($search != null) {
            $order = Order::query()->with(['ordernetsuite', 'orderstate', 'orderstatelang', 'carrier'])->where('id_order', $search);
            $order->whereHas('orderstate', function ($subquery) {
                $subquery->where('paid', true);
            });
            $order  = $order->paginate($pagination);
            $custom = collect([
                'search' => $search,
            ]);
            $order = $custom->merge($order);
        } else {
            $order = Order::query()->with(['ordernetsuite', 'orderstate', 'orderstatelang', 'carrier'])->where('id_customer', $id);
            $order->whereHas('orderstate', function ($subquery) {
                $subquery->where('paid', true);
            });

            $order = $order->paginate($pagination);

        }

        return $order;
    }

    public static function getPayInStore($pis_config, $sortColumn, $sortOrder, $pagination, $searchTerm, $outlet_detail)
    {
        foreach ($pis_config as $key => $value) {
            $pis_status[] = $value->value;
        }

        $query = Order::whereIn('current_state', $pis_status);
        if ($searchTerm) {
            $query->Where('reference', 'like', '%' . $searchTerm . '%');
            $query->orWhere('id_order', $searchTerm);
        }
        if (!empty($outlet_detail)) {
            $query->where('payment', 'like', '%' . $outlet_detail . '%');
        }
        $query->whereNull('id_settlement');
        $query->orderBy($sortColumn, $sortOrder);
        $list = $query->with(['customer', 'orderstatelang'])->paginate($pagination);
        return $list;
    }

    public static function updateCurrentState($id_order, $success_state)
    {
        $order = Order::where('id_order', $id_order)->update([
            'date_upd'      => date('Y-m-d H:i:s'),
            'current_state' => $success_state,
        ]);
        return $order;
    }

    public static function getPayInStoreForPayment($pis_config, $outlet_detail, $data)
    {
        foreach ($pis_config as $key => $value) {
            $pis_status[] = $value->value;
        }

        if (empty($outlet_detail) && !empty($data->outlet)) {
            $outlet_detail = Outlet::find($data->outlet);
            $outlet_detail = $outlet_detail->name;
        }

        $query = Order::leftJoin('ps_order_payment', 'ps_order_payment.order_reference', '=', 'ps_orders.reference')
            ->whereIn('current_state', $pis_status);

        if (!empty($data->dates)) {
            $date = date_create(str_replace('/', '-', $data->dates));
            $date = date_format($date, 'Y-m-d');

            $query->whereBetween('ps_order_payment.date_add', [$date . ' 09:00:00', $date . ' ' . $data->times]);
        }
        if (!empty($outlet_detail)) {
            $query->where('payment', 'like', '%' . $outlet_detail . '%');
        }
        $query->whereNull('ps_orders.id_settlement');
        // $list = $query->with(['orderPaymentByReference'])->get();
        $query->orderBy('ps_order_payment.payment_method', 'asc');
        $list = $query->get();
        // dd($list);
        return $list;
    }

    public static function getSettlementHistory($pis_config, $outlet_detail, $data)
    {
        foreach ($pis_config as $key => $value) {
            $pis_status[] = $value->value;
        }
        if (empty($outlet_detail) && !empty($data->outlet)) {
            $outlet_detail = Outlet::find($data->outlet);
            $outlet_detail = $outlet_detail->name;
        }

        DB::enableQueryLog();
        $query = Order::whereIn('current_state', $pis_status);
        if (!empty($outlet_detail)) {
            $query->where('payment', 'like', '%' . $outlet_detail . '%');
        }
        $query->whereNotNull('id_settlement');
        $result           = $query->with(['settlement'])->get();
        $db               = DB::getRawQueryLog();
        $settlement_array = [];
        foreach ($result as $key => $value) {
            $total           = 0;
            $data            = json_decode($value->settlement->data);
            $date            = date($value->settlement->date);
            $settlement_date = date_format($value->settlement->created_at, 'd/m/Y');
            foreach ($data->paymentList as $key => $row) {
                $keys  = $key . '_entry';
                $total = $total + $data->settlement_list->$keys;

                $settlement_array[$value->settlement->id][$key] = [
                    'amount' => $data->settlement_list->$keys,
                ];
                $settlement_array[$value->settlement->id]['total']        = $total;
                $settlement_array[$value->settlement->id]['date']         = $date;
                $settlement_array[$value->settlement->id]['date_created'] = $settlement_date;
            }
        }
        // dd([$settlement_array]);
        return $settlement_array;
    }
}
