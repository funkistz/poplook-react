<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class LoyaltyListSendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $year;
    protected $id_shop;
    protected $url;
    protected $email;
    /**
     * Create a new job instance.
     */
    public function __construct($year, $id_shop, $url, $email)
    {
        $this->year    = $year;
        $this->id_shop = $id_shop;
        $this->url     = $url;
        $this->email   = $email;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        Mail::to($this->email)->send(new \App\Mail\LoyaltyListFinish($this->email, $this->year, $this->id_shop, $this->url));
    }
}
