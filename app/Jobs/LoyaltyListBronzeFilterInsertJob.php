<?php

namespace App\Jobs;

use App\Models\LoyaltyListFilter;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class LoyaltyListBronzeFilterInsertJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $year;
    protected $id_shop;
    protected $offset;
    /**
     * Create a new job instance.
     */
    public function __construct($year, $id_shop, $offset)
    {
        $this->year    = $year;
        $this->id_shop = $id_shop;
        $this->offset  = $offset;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $loyalty_list = LoyaltyListFilter::getProcessBronzeData($this->year, $this->id_shop, $this->offset);
        // Mail::to($this->email)->send(new \App\Mail\LoyaltyListFinish($this->email, $this->year, $this->tier, $this->id_shop, $this->url));
    }
}
