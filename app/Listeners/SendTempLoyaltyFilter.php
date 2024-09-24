<?php

namespace App\Listeners;

use App\Events\TempLoyaltyFilter;
use App\Models\TempLoyaltyList;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class SendTempLoyaltyFilter
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TempLoyaltyFilter $event): void
    {
        // dd($event);
        // $current_timestamp = Carbon::now()->toDateTimeString();
        $current_timestamp = date('Y-m-d H:i:s');
        // dd($event->data);

        TempLoyaltyList::insert($event->data);

        // $saveHistory = DB::table('temp_loyalty_list')->insert(
        //     ['tier' => $event->tier, 'created_at' => $current_timestamp, 'updated_at' => $current_timestamp]
        // );

        return;
    }
}
