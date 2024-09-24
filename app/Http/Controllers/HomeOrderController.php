<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortColumn = $request->input('sort_by', 'date_upd');
        $sortOrder = $request->input('order_by', 'desc');
        $pagination = $request->input('per_page', 5);
        $searchTerm = $request->input('search');
        $searchBy = $request->input('search_by', 'id_order');
        if($request->cookie('shop') == 0) {
            $query = Order::query()->with(['customer', 'currency', 'orderstate', 'orderstatelang']);
        } else {
            $query = Order::query()->with(['customer', 'currency', 'orderstate', 'orderstatelang'])->Where('id_shop', $request->cookie('shop'));
        }

       

        if ($searchTerm) {
            if($searchBy == 'email') {
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
        $list = $query->paginate($pagination);

        $custom = collect([
            'sort_by' => $sortColumn,
            'order_by' => $sortOrder,
            'search' => $searchTerm,
            'search_by' => $searchBy,
        ]);

        $list = $custom->merge($list);

        // dd($order);
        return Inertia::render('Admin/Order/Index', [
            'list'   => $list,
            'search' => $searchTerm,
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
        $db = DB::getQueryLog();
        
        return Inertia::render('Admin/Order/view', [
            'id'    => $id,
            'titles' => 'Orders Details #' . $id,
            'order' => $order,
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
        $post = $request->post();
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

}
