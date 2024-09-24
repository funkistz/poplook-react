<?php

namespace App\Jobs;

use App\Models\LoyaltyListFilter;
use App\Models\TempLoyaltyList;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class LoyaltyListFilterInsertJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $year;
    protected $last_year;
    protected $tier;
    protected $last_tier;
    protected $id_shop;
    protected $email;
    protected $url;
    protected $process_bronze_list;
    /**
     * Create a new job instance.
     */
    public function __construct($year, $last_year, $tier, $last_tier, $id_shop, $email, $url, $process_bronze_list)
    {
        $this->year                = $year;
        $this->last_year           = $last_year;
        $this->tier                = $tier;
        $this->last_tier           = $last_tier;
        $this->id_shop             = $id_shop;
        $this->email               = $email;
        $this->url                 = $url;
        $this->process_bronze_list = $process_bronze_list;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->id_shop as $key => $value) {
            // gold
            $temp_loyalty_list = TempLoyaltyList::checkDup($this->year, $this->last_year, 3, 2, $value);
            $loyalty_list      = LoyaltyListFilter::checkInsert($this->year, 3, $value, $temp_loyalty_list);
            // silver
            $temp_loyalty_list = TempLoyaltyList::checkDup($this->year, $this->last_year, 2, 3, $value);
            $loyalty_list      = LoyaltyListFilter::checkInsert($this->year, 2, $value, $temp_loyalty_list);
            if (!empty($this->process_bronze_list)) {
                # code...
                $bronze_data       = LoyaltyListFilter::getBronzeListCount($this->year, $value);
                $result            = LoyaltyListFilter::deleteProcessBronzeData($this->year, $value, 1);
                $bronze_list_count = ceil($bronze_data->total / 1000);
                for ($i = 0; $i < $bronze_list_count; $i++) {
                    # code...
                    dispatch((new LoyaltyListBronzeFilterInsertJob($this->year, $value, $i))->onQueue('bronze_list'));
                }
            }
        }

        dispatch((new LoyaltyListSendEmailJob($this->year, $this->id_shop, $this->url, $this->email))->onQueue('bronze_list'));
        // dd($this->id_shop);
    }
}
