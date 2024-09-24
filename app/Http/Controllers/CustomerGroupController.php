<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerGroup;
use App\Models\Group;
use App\Models\GroupLang;
use App\Models\GroupShop;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortColumn = $request->input('sort_by', 'id_group');
        $sortOrder  = $request->input('order_by', 'desc');
        $pagination = $request->input('per_page', 100);
        $searchTerm = $request->input('search');
        $searchBy   = $request->input('search_by', 'id_group');

        DB::enableQueryLog();
        $group_list = Group::getGroupPagination($searchTerm, $searchBy, $sortColumn, $sortOrder, $pagination);
        // dd(DB::getRawQueryLog());

        return Inertia::render('Admin/CustomerGroup/Index', [
            'list'   => $group_list,
            'search' => $searchTerm,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $group         = [];
        $customer_list = [];
        $create        = true;
        return Inertia::render('Admin/CustomerGroup/View', [
            'group'         => $group,
            'customer_list' => $customer_list,
            'create'        => $create,
        ]);
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
    public function show(Request $request, string $id)
    {

        $sortColumn = $request->input('sort_by', 'id_group');
        $sortOrder  = $request->input('order_by', 'desc');
        $pagination = $request->input('per_page', 100);
        $searchTerm = $request->input('search');
        $searchBy   = $request->input('search_by', 'id_group');

        $group = Group::with(['groupLang', 'customer'])->find($id);
        DB::enableQueryLog();
        $customer_list       = CustomerGroup::getCustomerGroupPagination($sortColumn, $sortOrder, $pagination, $searchTerm, $searchBy, $id);
        $customer_list_exist = CustomerGroup::getCustomerGroupExist($sortColumn, $sortOrder, $searchTerm, $searchBy, $id);
        $customer_exist      = [];
        foreach ($customer_list_exist as $key => $value) {
            array_push($customer_exist, $value['id_customer']);
        }
        $query  = DB::getRawQueryLog();
        $create = false;
        return Inertia::render('Admin/CustomerGroup/View', [
            'group'         => $group,
            'customer_list' => $customer_list,
            'create'        => $create,
        ]);
    }

    public function getCustomerSelection(Request $request)
    {
        DB::enableQueryLog();
        $id                 = $request->input('id');
        $search             = $request->input('search');
        $customer_selection = Customer::getCustomerGroupSelection($id, $search);
        return response()->json([
            "customer_selection" => $customer_selection,
            "message"            => "Success",
        ])->setStatusCode(200);
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
    public function destroy(string $id, Request $request)
    {
        $id_customer = $request->input('id_customer');
        CustomerGroup::removeCustomerFromGroup($id, $id_customer);
        return back()->with([
            'type'    => 'success',
            'message' => 'Successfully Deleted',
        ]);
    }

    public function updateOrCreate(Request $request)
    {
        $id                   = $request->input('id');
        $name                 = $request->input('name');
        $discount             = $request->input('discount');
        $price_display_method = $request->input('price_display_method');
        $show_price           = $request->input('show_price');

        // update or create new record if group not exist
        $group = Group::updateOrCreate([
            'id_group' => $id,
        ], [
            'reduction'            => $discount,
            'price_display_method' => $price_display_method,
            'show_prices'          => $show_price,
            'date_add'             => Carbon::now(),
            'date_upd'             => Carbon::now(),
        ]);
        // end

        // update or create new record if lang is not exist
        GroupLang::updateOrCreate([
            'id_group' => $group->id_group,
        ], [
            'id_lang' => 1, //always be one since other id_lang is not used based on what i can see, may changes in the future
            'name'    => $name,
        ]);
        // end

        // create each shop for group
        GroupShop::firstOrCreate([
            'id_group' => $group->id_group, 'id_shop' => 1,
        ]);
        GroupShop::firstOrCreate([
            'id_group' => $group->id_group, 'id_shop' => 2,
        ]);
        GroupShop::firstOrCreate([
            'id_group' => $group->id_group, 'id_shop' => 3,
        ]);
        // end
        return to_route('customer_group.show', $group->id_group)->with([
            'type'    => 'success',
            'message' => 'Successfully Updated',
        ]);

        return back()->with([
            'type'    => 'success',
            'message' => 'Successfully Updated',
        ]);
    }

    public function addCustomerToGroup(Request $request)
    {
        $id                   = $request->input('id');
        $id_customer_selected = $request->input('id_customer_selected');
        CustomerGroup::insertCustomerGroup($id, $id_customer_selected);

        return back()->with([
            'type'    => 'success',
            'message' => 'Succesfully added Customer to Group',
        ]);
    }
}
