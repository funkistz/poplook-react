<?php

namespace App\Http\Controllers\Retail;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use App\Models\Order;
use App\Models\OrderPayment;
use App\Models\Outlet;
use App\Models\Settlement;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SettlementController extends Controller
{
    protected $payment_method_list;

    public function __construct()
    {
        // Fetch the Site Settings object
        $this->payment_method_list = [
            [
                "label" => 'Cash',
                "value" => '1',
            ],
            [
                "label" => 'Credit/Debit',
                "value" => '2',
            ],
            [
                "label" => 'Alipay',
                "value" => '3',
            ],
            [
                "label" => 'MBB QR Pay',
                "value" => '4',
            ],
            [
                "label" => 'Atome',
                "value" => '5',
            ],
            [
                "label" => 'E-wallet Terminal',
                "value" => '6',
            ],
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        DB::enableQueryLog();
        // dd($request->dates);
        $user  = Auth::user();
        $email = $user->email;
        // $email            = 'thecurve@poplook.com';
        $request['email']   = $email;
        $outlet             = Outlet::getOutlet($request);
        $configuration      = Configuration::getConfigurationValue(['PS_PIS_SUCCESS']);
        $pis_list           = Order::getPayInStoreForPayment($configuration, (!empty($outlet->name)) ? $outlet->name : '', $request);
        $settlement_history = Order::getSettlementHistory($configuration, (!empty($outlet->name)) ? $outlet->name : '', $request);
        $orderPayment       = OrderPayment::getPISOrderPayment($pis_list);
        $outlet_list        = Outlet::get(DB::raw('id AS value, name AS label'));
        $query              = DB::getRawQueryLog();
        // dd([$orderPayment]);
        return Inertia::render('Admin/Retail/Settlement/Index', [
            'orderPayment'       => $orderPayment,
            'settlement_history' => $settlement_history,
            'outlet_list'        => (empty($outlet)) ? $outlet_list : false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Inertia::render('Admin/Retail/Settlement/SettlementDetail', [
            'settlement' => $request,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getSettlementHistoryDetail(Request $request, $id)
    {
        $settlement_history = Settlement::find($id);
        // dd($settlement_history);
        return $settlement_history;
        return back()->with([
            'data'    => $settlement_history,
            'type'    => 'success',
            'message' => 'Quantity Successfully Updated.',
        ]);
    }

    public function successSettlement(Request $request)
    {
        $array         = [];
        $date_selected = date_create(str_replace('/', '-', $request->date));
        $date_selected = date_format($date_selected, 'Y-m-d H:i:s');
        $settlement_id = Settlement::insertGetId([
            'date'       => (!empty($request->date)) ? $date_selected : Carbon::now(),
            'data'       => json_encode($request->data),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        // dd($request->orderPayment);
        foreach ($this->payment_method_list as $key => $value) {
            $label = strtolower(str_replace(['/', ' ', '-'], '_', $value['label']));
            if (!empty($request->orderPayment[$label . '_list'])) {
                // array_push($array, $request->orderPayment[$label . '_list']);
                foreach ($request->orderPayment[$label . '_list'] as $row) {
                    array_push($array, $row['id_order']);
                }
            }
        }

        $order = Order::whereIn('id_order', $array)->update([
            'id_settlement' => $settlement_id,
        ]);

        return back()->with([
            'success' => true,
            'message' => 'Settlement has been finalized, data cannot be changed.',
        ]);
    }
}
