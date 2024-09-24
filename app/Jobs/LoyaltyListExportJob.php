<?php

namespace App\Jobs;

use App\Models\LoyaltyListFilter;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Rap2hpoutre\FastExcel\FastExcel;

class LoyaltyListExportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $year;
    protected $tier;
    protected $id_shop;
    protected $url;
    protected $email;
    /**
     * Create a new job instance.
     */
    public function __construct($year, $tier, $id_shop, $url, $email)
    {
        $this->year    = $year;
        $this->tier    = $tier;
        $this->id_shop = $id_shop;
        $this->url     = $url;
        $this->email   = $email;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        if ($this->tier == 3) {
            $tier_name = 'GOLD';
        } elseif ($this->tier == 2) {
            $tier_name = 'SILVER';
        } else {
            $tier_name = 'BRONZE';
        }

        if ($this->id_shop == 7) {
            $shop = 'INTL';
        } elseif ($this->id_shop == 6) {
            $shop = 'SG';
        } else {
            $shop = 'MY';
        }
        $dir_path = public_path('export');
        if (!file_exists($dir_path)) {
            mkdir($dir_path);
        }

        $bronze_list = LoyaltyListFilter::getBronzeListForExport($this->year, $this->tier, $this->id_shop);
        (new FastExcel($bronze_list))->export($dir_path . '/loyalty_list_' . $this->year . '_' . $tier_name . '_' . $shop . '.xlsx');

        $file_path = $this->url . '/loyalty_list_' . $this->year . '_' . $tier_name . '_' . $shop . '.xlsx';
        Mail::to($this->email)->send(new \App\Mail\LoyaltyListExport($this->email, $file_path));
    }
}
