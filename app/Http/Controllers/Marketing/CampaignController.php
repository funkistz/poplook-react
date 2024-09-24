<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Marketing\Campaign;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CampaignController extends Controller
{
    public function deleteCampaign(Request $request)
    {
        $campaign = Campaign::where('uuid', '=', $request->uuid)->first();

        $campaign->template()->delete();

        $campaign->mail()->delete();
        $campaign->segment()->delete();
        $campaign->preset()->delete();
        $campaign->logs()->delete();
        $campaign->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Campaign has been deleted successfully!'
        ]);

    }

    public function duplicateCampaign(Request $request)
    {
        $campaign = Campaign::where('uuid', '=', $request->uuid)->first();

        if ($campaign->campaign_type == 'recurring')
        {
            if ($campaign->preset_type == 'Birthday')
            {
                $preset = Campaign\CampaignPresetSetting::where([
                    ['loyalty_level', '=', $campaign->preset->loyalty_level],
                    ['shop_id' , '=', $campaign->preset->shop_id],
                ]);

                if ($preset)
                {
                    return back()->with([
                        'type' => 'success',
                        'message' => 'Oops, sorry this type of preset unable to duplicate'
                    ]);
                }
            }elseif ($campaign->preset_type == 'Welcome')
            {
                return back()->with([
                    'type' => 'success',
                    'message' => 'Oops, sorry this type of preset unable to duplicate'
                ]);
            }

        }
        $duplicate = $campaign->replicate();
        $duplicate->ps_employee_id = auth('admin')->user()->id_employee;
        $duplicate->uuid = Str::uuid();
        $duplicate->campaign_name = $campaign->campaign_name.' (Copy)';
        $duplicate->campaign_status = 'draft';
        $duplicate->activation_status = 'draft';
        $duplicate->start_date = null;
        $duplicate->start_time = null;
        $duplicate->is_lock = false;

        $duplicate->created_at = Carbon::now();
        $duplicate->save();

        if ($campaign->segment)
        {
            $dpsegment = $campaign->template->replicate();
            $duplicate->template()->save($dpsegment);
        }

        if ($campaign->segment)
        {
            $dpsegment = $campaign->segment->replicate();
            $duplicate->segment()->save($dpsegment);
        }

        if ($campaign->mail)
        {
            $dpsegment = $campaign->mail->replicate();
            $duplicate->mail()->save($dpsegment);
        }

        if ($campaign->preset)
        {
            $dpsegment = $campaign->preset->replicate();
            $duplicate->preset()->save($dpsegment);
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Campaign has been duplicate successfully!'
        ]);
    }
}
