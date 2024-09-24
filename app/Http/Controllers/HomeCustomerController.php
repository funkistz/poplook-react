<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Group;
use App\Models\GroupLang;
use App\Models\Shop;
use App\Models\CartRule;
use App\Models\LoyaltyListFilter;
use App\Models\Address;
use App\Models\Order;

use App\Services\Marketing\Email\DynamicEmailService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Helpers\ApiService;
use App\Helpers\ApiHelper;
use App\Helpers\DataTableCustom;
use App\Helpers\NetsuiteApi;
use App\Models\OrderState;

class HomeCustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $sortColumn = $request->input('sort_by', 'firstname');
        // $sortOrder = $request->input('order_by', 'asc');
        // $pagination = $request->input('per_page', 5);
        // $searchTerm = $request->input('search');
        // if($request->cookie('shop') == 0) {
        //     $query = Customer::query()->with(['shop']);
        // } else {
        //     $query = Customer::query()->with(['shop'])->Where('id_shop', $request->cookie('id_shop'));
        // }

        // if ($searchTerm) {
        //     $query->where(function ($subquery) use ($searchTerm) {
        //         $subquery->where('email', 'like', '%' . $searchTerm . '%')
        //             ->orWhere('lastname', 'like', '%' . $searchTerm . '%')
        //             ->orWhere('firstname', 'like', '%' . $searchTerm . '%');
        //     });
        // }

        // $query->orderBy($sortColumn, $sortOrder);
        // $list = $query->with(['group'])->paginate($pagination);

        // $custom = collect([
        //     'sort_by' => $sortColumn,
        //     'order_by' => $sortOrder,
        //     'search' => $searchTerm,
        // ]);
        // $list = $custom->merge($list);

        $data = collect([
            'model' => Customer::class,
            'relationships' => ['shop'],
            'column' => 'firstname',
            'order' => 'asc',
            'searchableFields' => ['firstname', 'lastname', 'email'],
            'cookieField' => $request->cookie('id_shop'),
        ]);

        $list = DataTableCustom::applyFilters($request, $data->toArray());

        return Inertia::render('Admin/Customer/Index', [
            'list' => $list,
            // 'search' => $searchTerm,
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
    public function show(string $id, Request $request)
    {
        $custom = Customer::query()->with(['group'])->find($id);
        $customer = Customer::find($id);
        $group = Group::get_list_group();
        $address = Address::getAllAddress($id);

        $custom = collect([
            'group' => $custom->group,
        ]);
        $customer = $custom->merge($customer);

        // Tier modified
        $tier = LoyaltyListFilter::getLoyaltyByYear($customer['email'], 1);
        if($tier == null) {
            $customer['loyalty']= null;
        } else {
            $customer['loyalty']= $tier->tier;
        }

        return Inertia::render('Admin/Customer/View', [
            'customer' => $customer,
            'listGroup' => $group,
            'address' => $address,
            'dev' => env('APP_URL'),
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
        try {
            Customer::find($id)->update_profile($request);
            return back()->with([
                'type'    => 'success',
                'message' => 'Profile Changed!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Something Wrong!',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function changePassword(Request $request)
    {
        try {
            $customer = Customer::find($request->id_customer);
            $customer->update_password($request);
            return back()->with([
                'type'    => 'success',
                'message' => 'Password Changed!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Something Wrong!',
            ]);
        }
    }

    public function changeGroup(Request $request)
    {
        try {
            $customer = Customer::find($request->id_customer);
            $customer->group()->sync($request->group);
            return back()->with([
                'type'    => 'success',
                'message' => 'Group Updated!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Something Wrong!',
            ]);
        }
    }

    public function generetaVoucher(Request $request)
    {

        $email = new DynamicEmailService();

        $result = DB::table('ps_customer as c')
            ->leftJoin('ps_customer_tier as ct', function($join) {
                $join->on('c.id_customer', '=', 'ct.customer_id')
                    ->where('ct.id', '=', DB::raw("(SELECT MAX(id) FROM ps_customer_tier ctt WHERE ctt.customer_id = ct.customer_id)"));
            })
            ->select('ct.tier', 'c.id_customer', 'c.email','c.firstname','c.lastname', 'c.id_shop')
            ->where('c.id_customer', '=', $request->customer_id)
            ->first();



        if ($result) {
            $request['tier'] = $result->tier ?? 1;
            $response = ApiHelper::moduleApi()->post('poplookloyaltyprogram/lp_birthday_api_testing.php', $request->all());
            if($response) {
                $code =  json_decode($response['data'][0], true);

                $data = [
                  'code' => $code['code'],
                  'tier' => $result->tier ?? 1,
                  'email' => $result->email,
                  'name' => trim($result->firstname . ' ' . $result->lastname),
                  'shop_id' => $result->id_shop
                ];

                $email->birthdayEmailSendOut($data);

                return back()->with([
                    'type'    => 'success',
                    'message' => 'Successfull added voucher',
                ]);
            }

        } else {
            return back()->with([
                'type'    => 'error',
                'message' => 'No data found for the given customer ID',
            ]);
        }
    }

    public function setDefaultAddress(string $id, Request $request)
    {
        $result = Address::setDefaultAddress($id, $request->value);
        if($result) {
            return back()->with([
                'type'    => 'success',
                'message' => 'Successfull update default address',
            ]);
        }

        return back()->with([
            'type'    => 'error',
            'message' => 'Something Wrong!',
        ]);

    }

   public function updateAddress(Request $request) {
        $banner = Address::find($request->id_address);
        $attr = $request->except(['id']);

        try {
            $banner->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Address has been updated',
                'params' => [
                    '$attr' => $attr
                ],
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
   }
}
