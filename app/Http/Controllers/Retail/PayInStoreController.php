<?php

namespace App\Http\Controllers\Retail;

use App\Helpers\ApiService;
use App\Helpers\NetsuiteApi;
use App\Http\Controllers\Controller;
use App\Models\Configuration;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Outlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PayInStoreController extends Controller
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

        // $split_email = explode('@', Auth::user()->email);
        $sortColumn = $request->input('sort_by', 'id_order');
        $sortOrder  = $request->input('order_by', 'asc');
        $pagination = $request->input('per_page', 50);
        $searchTerm = $request->input('search');

        DB::enableQueryLog();
        $user  = Auth::user();
        $email = $user->email;
        // $email         = 'thecurve@poplook.com';
        $outlet         = Outlet::where('email', $email)->first();
        $configuration  = Configuration::getConfigurationValue(['PS_PIS_KIV', 'PS_PIS_FAIL', 'PS_PIS_SUCCESS']);
        $outlet_detail  = Outlet::find($request->input('outlet'));
        $outlet_details = '';
        if (!empty($outlet_detail)) {
            $outlet_details = $outlet_detail->name;
        }
        $pis_list    = Order::getPayInStore($configuration, $sortColumn, $sortOrder, $pagination, $searchTerm, (!empty($outlet->name)) ? $outlet->name : $outlet_details);
        $outlet_list = Outlet::get(DB::raw('id AS value, name AS label'));
        $db          = DB::getRawQueryLog();
        // dd($outlet_detail);

        return Inertia::render('Admin/Retail/PayInStore/Index', [
            'pis_list'    => $pis_list,
            'outlet_list' => (empty($outlet)) ? $outlet_list : false,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        DB::enableQueryLog();
        $order = Order::with(['customer', 'orderdetail', 'currency', 'orderstatelang', 'shop', 'address', 'address.countrylang', 'address.state', 'cart', 'orderPaymentByReference'])->find($id);
        // dd($order);
        $db = DB::getQueryLog();
        return Inertia::render('Admin/Retail/PayInStore/Edit', [
            'id'             => $id,
            'titles'         => 'Orders Details #' . $id,
            'order'          => $order,
            'payment_method' => $this->payment_method_list,
        ]);
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
        $post  = $request->post();
        $order = OrderDetail::updateQty($post);
        return back()->with([
            'type'    => 'success',
            'message' => 'Quantity Successfully Updated.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updateOrderPayInStore(Request $request)
    {
        // Validation rules
        $rules = [
            'payment_method' => 'required',
            'approval_code'  => 'required',
        ];

        // Custom error messages
        $messages = [
            'payment_method.required' => 'Choose Payment Method',
            'approval_code.required'  => 'Enter Approval Code',
        ];

        // Validate the request data
        $validatedData   = $request->validate($rules, $messages);
        $pymnt_meth_list = $this->payment_method_list;

        $id_order = $request->id_order;
        DB::enableQueryLog();
        $pis_config = Configuration::where(function ($query) {
            $query->orWhere('name', 'PS_PIS_KIV');
            $query->orWhere('name', 'PS_PIS_FAIL');
            $query->orWhere('name', 'PS_PIS_SUCCESS');
        })->get();
        $order             = Order::find($id_order);
        $outlet            = Outlet::where('name', 'like', '%' . $order->payment . '%')->first();
        $pis_success_order = Order::where('current_state', $pis_config[2]['value'])->count();
        $pis_trx_id        = str_pad($pis_success_order, 7, '0', STR_PAD_LEFT);
        $get               = DB::getRawQueryLog();

        foreach ($pymnt_meth_list as $key => $value) {
            if ($validatedData['payment_method'] == $value['value']) {
                $payment_method = $value['label'];
            }
        }

        $param['id_order']           = $order->id_order;
        $param['transaction_status'] = 1;
        $param['payment_type']       = 'pay_in_store';
        $param['pis_payment_type']   = $payment_method;
        $param['transaction_id']     = $order->id_order;
        $param['total_paid']         = $order->total_paid;
        $param['pis_trx_id']         = $validatedData['approval_code'];
        $param['device_type']        = 1;
        $param['approval_code']      = $validatedData['approval_code'];

        $response = ApiService::get('Carts/OrderStep5', $param);

        $url      = "http://dev3.poplook.com/netsuite/sales/pushInvoices?output=debug&id=" . (int) $order->id_order;
        $response = NetsuiteApi::callRestApi($url);
        dump($response);

        return to_route('payInStore.index', ['outlet' => $outlet->id])->with([
            'type'    => 'success',
            'message' => 'Pay In Store Payment Succesfully Updated',
        ]);

        // return back()->with([
        //     'type'    => 'success',
        //     'message' => 'Pay In Store Payment Succesfully Updated',
        // ]);
    }
}
