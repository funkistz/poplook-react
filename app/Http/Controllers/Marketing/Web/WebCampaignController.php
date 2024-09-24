<?php

namespace App\Http\Controllers\Marketing\Web;

use App\Http\Controllers\Controller;
use App\Models\Marketing\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WebCampaignController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $campaign = Campaign::create([
            'ps_employee_id' => auth('admin')->user()->id_employee,
            'uuid' => Str::uuid(),
            'campaign_name' => $request->name,
            'campaign_category' => 'web_push'
        ]);

        //temprory
//        $campaign->segment()->create([
//            'segment_group_id' => 1,
//        ]);

        return redirect('web_push/'.$campaign->uuid.'/segment');
    }
}
