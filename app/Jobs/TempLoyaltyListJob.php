<?php

namespace App\Jobs;

use App\Helpers\NetsuiteApi;
use App\Models\TempLoyaltyList;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TempLoyaltyListJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $url;
    protected $year;
    protected $id_shop;
    protected $tier;

    public function __construct($url, $year, $id_shop, $tier)
    {
        $this->url     = $url;
        $this->year    = $year;
        $this->id_shop = $id_shop;
        $this->tier    = $tier;
    }

    public function handle()
    {
        // dd($this->data);
        $response     = NetsuiteApi::callRestApi($this->url);
        $record       = json_encode($response);
        $current_data = [];
        foreach ($response as $key => $value) {
            # code...
            $current_data[$key]['year']    = $this->year;
            $current_data[$key]['id_shop'] = $this->id_shop;
            $current_data[$key]['tier']    = $this->tier;
            $current_data[$key]['email']   = $value['email'];
            $current_data[$key]['content'] = json_encode($value);
        }
        TempLoyaltyList::insert($current_data);
        // Mail::to($this->user->email)->send(new \App\Mail\WelcomeEmail($this->user));
    }
}
