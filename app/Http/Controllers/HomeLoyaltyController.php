<?php

namespace App\Http\Controllers;

use App\Jobs\LoyaltyListExportJob;
use App\Jobs\LoyaltyListFilterInsertJob;
use App\Jobs\TempLoyaltyListJob;
use App\Models\LoyaltyListFilter;
use App\Models\TempLoyaltyList;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Rap2hpoutre\FastExcel\FastExcel;

class HomeLoyaltyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchTerm          = '';
        $response            = [];
        $fetch_filter_button = $request->fetch_filter_button;
        $year                = $request->input('year_sel', date('Y'));
        $tier                = $request->input('tier', 3);
        $sortColumn          = $request->input('sort', 'amount_now');
        $sortOrder           = $request->input('order', 'asc');
        $show                = $request->input('perpage', 50);
        $searchTerm          = $request->input('search');
        $filter_tier         = $request->input('filter_tier');
        // dd([$sortColumn,$sortOrder]);

        // check if shop is from filter or from DT
        if ($request->filter_shop) {
            # code...
            $id_shop = $request->filter_shop;
        } else {
            if (!empty($request->filter_id_shop)) {
                # code...
                $id_shop = $request->filter_id_shop;
            } else {
                $id_shop = 5;
            }
        }

        DB::enableQueryLog();
        // $bronze_data       = LoyaltyListFilter::getBronzeListCount(2023, 5);
        // $result            = LoyaltyListFilter::deleteProcessBronzeData(2023, 5, 1);
        // $bronze_list_count = ceil($bronze_data->total / 1000);
        // for ($i = 0; $i < $bronze_list_count; $i++) {
        //     # code...
        //     $loyalty_list = LoyaltyListFilter::getProcessBronzeData(2023, 5, $i);
        // }

        // dd(DB::getRawQueryLog());
        if (!empty($fetch_filter_button)) {
            // $this->getLoyaltySavedSearch($request);
            $this->getNewLoyaltySavedSearch($request);

            $response['data']         = [];
            $response['per_page']     = $show;
            $response['from']         = 1;
            $response['to']           = $show;
            $response['current_page'] = 1;
            $response['current_year'] = Date('Y');

            $data['notification'] = 1;
            $data['data_fetch']   = 1;
        } else {
            $response   = LoyaltyListFilter::getLoyaltyList($year, $filter_tier, $id_shop, 1, $show, $searchTerm, $sortColumn, $sortOrder);
            $last_fetch = LoyaltyListFilter::getLastFetched($year, $filter_tier, $id_shop, 1, $show);
            if (!empty($last_fetch)) {
                if (!empty($last_fetch['created_at'])) {
                    $data['last_fetch'] = date_format($last_fetch['created_at'], 'd-m-Y H:i:s');
                    // get date interval
                    $date1                       = new DateTime(date('Y-m-d H:i:s'));
                    $date2                       = new DateTime($last_fetch['created_at']);
                    $last_interval               = $date1->diff($date2);
                    $data['last_fetch_interval'] = $last_interval->d . ' Days ' . $last_interval->i . ' Minutes ' . $last_interval->s . ' Second';
                }
            }
            $data['notification'] = 0;
        }
        // dd(DB::getQueryLog());
        $date_list = [];
        for ($i = 0; $i < 5; $i++) {
            $time = strtotime("-$i year", time());
            # code...
            $date_list[] = Date('Y', $time);
        }
        $data['year_list'] = $date_list;

        return Inertia::render('Admin/Loyalty/Index', [
            'list'    => $response,
            'search'  => $searchTerm,
            'request' => $request,
            'param'   => $data,
        ]);
    }

    public function getNewLoyaltySavedSearch($request)
    {
        $default_year = '';
        $last_year    = '';
        $year_tran    = '';
        $amount       = '';
        $tier         = [2, 3];
        $id_shop      = [5, 6, 7];
        $user         = Auth::user();

        // if ($request->filter_id_shop) {
        //     # code...
        //     $id_shop = $request->filter_id_shop;
        // }

        if (!empty($request->year_sel)) {
            # code...
            $year = explode('|', $request->year_sel);
            if (is_array($year) && count($year) > 1) {
                # code...
                $year_tran = '&to=' . $year[1] . '&from=' . $year[0];
            } else {
                # code...
                $default_year   = '10/12/' . $year[0];
                $last_year      = '11/12/' . date('Y', strtotime($default_year . '-1 year'));
                $only_last_year = date('Y', strtotime($default_year . '-1 year'));
                $year_tran      = '&to=' . $default_year . '&from=' . $last_year;

                $default_last_year = '10/12/' . date('Y', strtotime($last_year));
                $prev_last_year = '11/12/' . date('Y', strtotime($last_year . '-1 year'));
                $last_year_tran = '&to=' . $default_last_year . '&from=' . $prev_last_year;
                // get tier lower since the highest tier was selected
                $prev_last_year_tran = '&to=' . $last_year . '&from=' . $prev_last_year;
                $prev_only_last_year = date('Y', strtotime($default_year . '-1 year'));
            }
        }
        // TempLoyaltyList::truncate();
        if (!empty($year[0])) {
            foreach ($id_shop as $key => $id_shop_val) {
                $deleted = $this->deleteTemptLoyaltyList($year[0], $id_shop_val, 3);
                //loyalty list current year or selected year
                // gold tier
                $tier_type = "&tier=3";
                $amount    = $this->tierAmountRange($id_shop_val, 3);
                $url       = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop_val . $year_tran . $amount . $tier_type;
                dispatch(new TempLoyaltyListJob($url, $year[0], $id_shop_val, 3))->onQueue('silver_gold_list');
                // dump($url);

                //loyalty list last year based on year above
                $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop_val . $last_year_tran . $amount . $tier_type;
                dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, $id_shop_val, 3))->onQueue('silver_gold_list');

                // loyalty list last year for one tier up or one tier down based on tier selected
                // silver
                $deleted   = $this->deleteTemptLoyaltyList($year[0], $id_shop_val, 2);
                $tier_type = "&tier=2";
                $amount    = $this->tierAmountRange($id_shop_val, 2);
                $url       = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop_val . $year_tran . $amount . $tier_type;
                dispatch(new TempLoyaltyListJob($url, $year[0], $id_shop_val, 2))->onQueue('silver_gold_list');

                $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop_val . $last_year_tran . $amount . $tier_type;
                dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, $id_shop_val, 2))->onQueue('silver_gold_list');

                // $bronze_data = LoyaltyListFilter::getBronzeData($year[0], $id_shop);

                // Mail::to('hazree@poplook.com')->send(new \App\Mail\LoyaltyListFinish('hazree@poplook.com', $year[0], 3, $id_shop_val, $redirect_url));
            }

            if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
                $redirect_url = "https://" . $_SERVER['HTTP_HOST'] . '/loyalty';
            } else {
                $redirect_url = "http://" . $_SERVER['HTTP_HOST'] . '/loyalty';
            }
            // dispatch(new LoyaltyListFilterInsertJob($year[0], $only_last_year, 3, 2, $id_shop_val, 'hazree@poplook.com', $redirect_url, false))->onQueue('silver_gold_list_process');
            dispatch(new LoyaltyListFilterInsertJob($year[0], $only_last_year, 2, 3, [5, 6, 7], $user->email, $redirect_url, true))->onQueue('silver_gold_list_process');

        }

    }

    public function deleteTemptLoyaltyList($year, $id_shop, $tier)
    {
        // DB::enableQueryLog();
        $temp_deleted = TempLoyaltyList::deleteTempLoyaltyList($year, $id_shop, $tier);
        // dd(DB::getQueryLog());
        return $temp_deleted;
    }

    public function tierAmountRange($id_shop, $tier)
    {

        //myr
        if ($id_shop == 5) {
            $amount_bronze = 0;
            $amount_silver = 3999.99;
            if ($tier == 1) {
                # code...
                $amount_bronze = 799.99;
                $amount_silver = 0;
            } elseif ($tier == 2) {
                # code...
                $amount_bronze = 799.99;
                $amount_silver = 3999.99;
            }
            //sgd
        } else if ($id_shop == 6) {
            $amount_bronze = 0;
            $amount_silver = 1299.99;
            if ($tier == 1) {
                # code...
                $amount_bronze = 249.99;
                $amount_silver = 0;
            } elseif ($tier == 2) {
                # code...
                $amount_bronze = 249.99;
                $amount_silver = 1299.99;
            }
            //usd
        } else if ($id_shop == 7) {
            $amount_bronze = 0;
            $amount_silver = 999.99;
            if ($tier == 1) {
                # code...
                $amount_bronze = 199.99;
                $amount_silver = 0;
            } elseif ($tier == 2) {
                # code...
                $amount_bronze = 199.99;
                $amount_silver = 999.99;
            }
        }
        if (!empty($amount_bronze) || !empty($amount_silver)) {
            # code...
            $amount = "&amount_bronze=$amount_bronze&amount_silver=$amount_silver";
        }
        return $amount;
    }

    public function exportLoyalty(Request $request)
    {
        $year    = ($request->input('year_sel')) ? $request->input('year_sel') : date('Y');
        $tier    = $request->input('filter_tier');
        $id_shop = $request->input('filter_shop');
        $user    = Auth::user();

        if ($tier == 3) {
            $tier_name = 'GOLD';
        } elseif ($tier == 2) {
            $tier_name = 'SILVER';
        } else {
            $tier_name = 'BRONZE';
        }

        if ($id_shop == 7) {
            $shop = 'INTL';
        } elseif ($id_shop == 6) {
            $shop = 'SG';
        } else {
            $shop = 'MY';
        }

        if ($tier == 1) {
            if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
                $redirect_url = "https://" . $_SERVER['HTTP_HOST'] . '/loyalty/export_download';
            } else {
                $redirect_url = "http://" . $_SERVER['HTTP_HOST'] . '/loyalty/export_download';
            }
            dispatch(new LoyaltyListExportJob($year, $tier, $id_shop, $redirect_url, $user->email));
            return back()->withSuccess('Export started!');
        } else {
            $loyaltylist = LoyaltyListFilter::getLoyaltyListForExport($year, $tier, $id_shop);
            return (new FastExcel($loyaltylist))->download('loyalty_list_' . $year . '_' . $tier_name . '_' . $shop . '.xlsx');
            // return (new LoyaltyListExport($year, $tier, $id_shop))->download('loyalty_list_' . $year . '_' . $tier_name . '_' . $shop . '.xlsx');
        }

    }

    public function exportDownload(Request $request, $file_name)
    {
        $file = public_path('export/' . $file_name);

        return Response::download($file);
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
        // $Customer = Customer::find($id);

        // if (!empty($Customer)) {
        //     return response()->json([
        //         "data"    => $Customer,
        //         "message" => "Success",
        //     ])->setStatusCode(200);
        // } else {
        //     return response()->json([
        //         "data"    => null,
        //         "message" => "No Customer found",
        //     ])->setStatusCode(404);
        // }
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

    public function check_connection(Request $request)
    {

        return response()->json([
            "message" => "Connection Success",
        ])->setStatusCode(200);
    }
}
