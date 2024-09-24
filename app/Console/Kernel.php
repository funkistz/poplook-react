<?php

namespace App\Console;

use App\Jobs\LoyaltyListFilterInsertJob;
use App\Jobs\TempLoyaltyListJob;
use App\Models\TempLoyaltyList;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        
        // MY
        $schedule->call(function () {
            $curr_year      = date('Y');
            $default_year   = '11/12/' . $curr_year;
            $last_year      = '11/12/' . date('Y', strtotime($default_year . '-1 year'));
            $only_last_year = date('Y', strtotime($default_year . '-1 year'));
            $year_tran      = '&to=' . $default_year . '&from=' . $last_year;

            $prev_last_year = '11/12/' . date('Y', strtotime($last_year . '-1 year'));
            $last_year_tran = '&to=' . $last_year . '&from=' . $prev_last_year;
            // get tier lower since the highest tier was selected
            $prev_last_year_tran = '&to=' . $last_year . '&from=' . $prev_last_year;
            $prev_only_last_year = date('Y', strtotime($default_year . '-1 year'));
            $id_shop             = 5;

            $tier_type     = "&tier=3";
            $amount        = $this->tierAmountRange($id_shop, 3);
            $temp_deleted  = TempLoyaltyList::deleteTempLoyaltyList($curr_year, $id_shop, 3);
            $url           = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $year_tran . $amount . $tier_type;
            $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $last_year_tran . $amount . $tier_type;
            dispatch(new TempLoyaltyListJob($url, $curr_year, $id_shop, 3))->onQueue('silver_gold_list');
            dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, $id_shop, 3))->onQueue('silver_gold_list');

            $tier_type     = "&tier=2";
            $amount        = $this->tierAmountRange($id_shop, 2);
            $temp_deleted  = TempLoyaltyList::deleteTempLoyaltyList($curr_year, $id_shop, 2);
            $url           = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $year_tran . $amount . $tier_type;
            $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $last_year_tran . $amount . $tier_type;
            dispatch(new TempLoyaltyListJob($url, $curr_year, $id_shop, 2))->onQueue('silver_gold_list');
            dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, $id_shop, 2))->onQueue('silver_gold_list');

            $redirect_url = '';
            dispatch(new LoyaltyListFilterInsertJob($curr_year, $only_last_year, 3, 2, $id_shop, '', $redirect_url, false))->onQueue('silver_gold_list_process');
            dispatch(new LoyaltyListFilterInsertJob($curr_year, $only_last_year, 2, 3, $id_shop, '', $redirect_url, true))->onQueue('silver_gold_list_process');
        })->daily();

        // SG
        $schedule->call(function () {
            $curr_year      = date('Y');
            $default_year   = '11/12/' . $curr_year;
            $last_year      = '11/12/' . date('Y', strtotime($default_year . '-1 year'));
            $only_last_year = date('Y', strtotime($default_year . '-1 year'));
            $year_tran      = '&to=' . $default_year . '&from=' . $last_year;

            $prev_last_year = '11/12/' . date('Y', strtotime($last_year . '-1 year'));
            $last_year_tran = '&to=' . $last_year . '&from=' . $prev_last_year;
            // get tier lower since the highest tier was selected
            $prev_last_year_tran = '&to=' . $last_year . '&from=' . $prev_last_year;
            $prev_only_last_year = date('Y', strtotime($default_year . '-1 year'));
            $id_shop             = 6;

            $tier_type     = "&tier=3";
            $amount        = $this->tierAmountRange($id_shop, 3);
            $temp_deleted  = TempLoyaltyList::deleteTempLoyaltyList($curr_year, $id_shop, 3);
            $url           = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $year_tran . $amount . $tier_type;
            $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $last_year_tran . $amount . $tier_type;
            dispatch(new TempLoyaltyListJob($url, $curr_year, $id_shop, 3))->onQueue('silver_gold_list');
            dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, $id_shop, 3))->onQueue('silver_gold_list');

            $tier_type     = "&tier=2";
            $amount        = $this->tierAmountRange($id_shop, 2);
            $temp_deleted  = TempLoyaltyList::deleteTempLoyaltyList($curr_year, $id_shop, 2);
            $url           = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $year_tran . $amount . $tier_type;
            $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $last_year_tran . $amount . $tier_type;
            dispatch(new TempLoyaltyListJob($url, $curr_year, $id_shop, 2))->onQueue('silver_gold_list');
            dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, $id_shop, 2))->onQueue('silver_gold_list');

            $redirect_url = '';
            dispatch(new LoyaltyListFilterInsertJob($curr_year, $only_last_year, 3, 2, $id_shop, '', $redirect_url, false))->onQueue('silver_gold_list_process');
            dispatch(new LoyaltyListFilterInsertJob($curr_year, $only_last_year, 2, 3, $id_shop, '', $redirect_url, true))->onQueue('silver_gold_list_process');
        })->daily();

        // INTL
        $schedule->call(function () {
            $curr_year      = date('Y');
            $default_year   = '11/12/' . $curr_year;
            $last_year      = '11/12/' . date('Y', strtotime($default_year . '-1 year'));
            $only_last_year = date('Y', strtotime($default_year . '-1 year'));
            $year_tran      = '&to=' . $default_year . '&from=' . $last_year;

            $prev_last_year = '11/12/' . date('Y', strtotime($last_year . '-1 year'));
            $last_year_tran = '&to=' . $last_year . '&from=' . $prev_last_year;
            // get tier lower since the highest tier was selected
            $prev_last_year_tran = '&to=' . $last_year . '&from=' . $prev_last_year;
            $prev_only_last_year = date('Y', strtotime($default_year . '-1 year'));
            $id_shop             = 7;

            $tier_type     = "&tier=3";
            $amount        = $this->tierAmountRange($id_shop, 3);
            $temp_deleted  = TempLoyaltyList::deleteTempLoyaltyList($curr_year, $id_shop, 3);
            $url           = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $year_tran . $amount . $tier_type;
            $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $last_year_tran . $amount . $tier_type;
            dispatch(new TempLoyaltyListJob($url, $curr_year, $id_shop, 3))->onQueue('silver_gold_list');
            dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, $id_shop, 3))->onQueue('silver_gold_list');

            $tier_type     = "&tier=2";
            $amount        = $this->tierAmountRange($id_shop, 2);
            $temp_deleted  = TempLoyaltyList::deleteTempLoyaltyList($curr_year, $id_shop, 2);
            $url           = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $year_tran . $amount . $tier_type;
            $url_last_year = 'https://4809454.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=229&deploy=1&channel=' . $id_shop . $last_year_tran . $amount . $tier_type;
            dispatch(new TempLoyaltyListJob($url, $curr_year, 6, 2))->onQueue('silver_gold_list');
            dispatch(new TempLoyaltyListJob($url_last_year, $only_last_year, 6, 2))->onQueue('silver_gold_list');

            $redirect_url = '';
            dispatch(new LoyaltyListFilterInsertJob($curr_year, $only_last_year, 3, 2, $id_shop, '', $redirect_url, false))->onQueue('silver_gold_list_process');
            dispatch(new LoyaltyListFilterInsertJob($curr_year, $only_last_year, 2, 3, $id_shop, '', $redirect_url, true))->onQueue('silver_gold_list_process');
        })->daily();
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

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
