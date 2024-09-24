<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Marketing\Campaign;
use App\Models\Marketing\Design\TemplateDesign;
use App\Models\Marketing\Logs\CampaignEmailLogs;
use App\Models\Marketing\Tracking\Link;
use App\Services\Marketing\Email\DesignService;
use App\Services\Marketing\Email\EmailService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EmailCampaignController extends Controller
{
    public function create(Request $request)
    {


        // type
        $request->validate([
            'name' => 'required',
            'type' => 'required',
        ],[
            'name.required' => 'The Campaign field is required.',
            'type.required' => 'The Type field is required.'
        ]);

        // dd($request->all());

        if ($request->type == 'Single')
        {
            $data = [
                'ps_employee_id' => auth('admin')->user()->id_employee,
                'uuid' => Str::uuid(),
                'campaign_name' => $request->name,
                'campaign_category' => 'email'
            ];

            $campaign = Campaign::create($data);

            $campaign->segment()->create([
                'segment_group_id' => 1,
            ]);

        }else if($request->type == 'Recurring'){
            $request->validate([
                'name' => 'required',
                'type' => 'required',
                'template' => 'required',
            ],[
                'name.required' => 'The Campaign field is required.',
                'type.required' => 'The Type field is required.',
                'template.required' => 'The Template field is required.'
            ]);

            if($request->template == 'Birthday') {
                $request->validate([
                    'name' => 'required',
                    'type' => 'required',
                    'template' => 'required',
                    'shop' => 'required',
                    'loyalty' => 'required',
                ],[
                    'name.required' => 'The Campaign field is required.',
                    'type.required' => 'The Type field is required.',
                    'template.required' => 'The Template field is required.',
                    'shop.required' => 'The Shop field is required.',
                    'loyalty.required' => 'The Loyalty field is required.',
                ]);
    
            }

            $campaign = $this->createrecurring($request);

            return $campaign;

        }


        return back()->with([
            'type' => 'success',
            'message' => 'campaign has been created'
        ]);
    }

    public function createrecurring($request)
    {

        $checkingBirthday = Campaign\CampaignPresetSetting::where([
            ['loyalty_level', '=', $request->loyalty],
            ['shop_id', '=', $request->shop],
        ])->first();

        $checkingWelcome = Campaign::where([
            ['campaign_type', '=', 'recurring'],
            ['preset_type', '=', 'Welcome']
        ])->first();


        if ($checkingBirthday && $request->template == 'Birthday')
        {
            return back()->with([
                'type' => 'danger',
                'message' => 'For this preset already exists, you only able to edit the existing preset'
            ]);

        }

        if ($checkingWelcome && $request->template == 'Welcome')
        {
            return back()->with([
                'type' => 'danger',
                'message' => 'For this preset already exists, you only able to edit the existing preset'
            ]);
        }


        $data = [
            'ps_employee_id' => auth('admin')->user()->id_employee,
            'uuid' => Str::uuid(),
            'campaign_name' => $request->name,
            'campaign_category' => 'email',
            'campaign_type' => 'recurring',
            'type' => 'email',
            'is_preset' => true,
            'preset_type' => $request->template,
        ];

        $campaign = Campaign::create($data);


        if ($request->template == 'Birthday')
        {
            $campaign->preset()->create([
                'loyalty_level' => $request->loyalty,
                'shop_id' => $request->shop
            ]);
        }

            //testing purpose only !!

        $campaign->segment()->create([
            'segment_group_id' => 2,
        ]);




        return back()->with([
            'type' => 'success',
            'message' => 'Preset campaign has been created'
        ]);
    }
    //testing
    function generateSixCharacterUuid() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $uuid = '';
        $maxIndex = strlen($characters) - 1;
        for ($i = 0; $i < 6; $i++) {
            $uuid .= $characters[rand(0, $maxIndex)];
        }
        return $uuid;
    }

    public function extractLink($html)
    {
        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML($html);
        libxml_clear_errors();

        $xpath = new \DOMXPath($dom);
        $links = $xpath->query('//a[not(starts-with(@href, "mailto:"))]');

        foreach ($links as $link) {
            $uuid = $this->generateSixCharacterUuid();

            $existing = Link::where('link', '=', $link->getAttribute('href'))->first();

            $href = $link->getAttribute('href');

            if (empty($existing))
            {
                $link = Link::create([
                    'link' => $link->getAttribute('href'),
                    'link_uuid' => $uuid
                ]);
            }

            $newhref = str_replace($link->getAttribute('href'), route('tracking.link',['id' => empty($existing) ? $uuid : $existing->link_uuid]), $href);

            $link->setAttribute('href', $newhref);

        }

        $updatedHtml = $dom->saveHTML();
        return $updatedHtml;
    }

    public function htmldesign(Request $request)
    {
        $campaign = Campaign::where('uuid', '=', $request->id)->first();
//        $html = $this->extractLink($request->html);
        $html = $request->html;
        if (empty($campaign->template))
        {
            $template  = TemplateDesign::create([
               'template_name' => $campaign->campaign_name,
                'template_type' => 'email',
                'html' => htmlentities($html)
            ]);

            Campaign\CampaignDesign::create([
                'campaign_id' => $campaign->id,
                'template_design_id' => $template->id,
            ]);

//            $campaign->emailDesign()->create([
//                'html' => htmlentities($html)
//            ]);
        }else{
            $update = $campaign->template->template()->update([
                'html' => htmlentities($html)
            ]);

        }

        return back()->with([
            'type' => 'success',
            'message' => 'design has been saved'
        ]);
    }

    public function getDesign($id)
    {
        $campaign = Campaign::where('uuid', '=', $id)->first();

        return response()->json([
            "html" => html_entity_decode($campaign->template->template->html)
//            "html" => $campaign->emailDesign->html
        ]);
    }

    public function linkMasking($id)
    {
        $link = Link::where('link_uuid', '=', $id)->first();


        return redirect($link->link);
    }

    //camapign emmail section

    public function getCampaingMail($id)
    {
        $campaign = Campaign::where('uuid', '=', $id)->first();


        return response()->json([
            'mail' => $campaign->mail
        ]);
    }

    public function saveCampaignMail(Request $request)
    {
        $campaign = Campaign::where('uuid', '=', $request->id)->first();

        $request->validate([
            'subject' => 'required',
            'preheader' => 'required',
        ]);

        if (empty($campaign->mail))
        {
                $campaign->mail()->create([
                    'from' => 'tech-test@api.poplook.com',
                    'preheader' => $request->preheader,
                    'subject' => $request->subject,

                ]);
        }else{

               $campaign->mail()->update([
                   'subject' => $request->subject,
                   'preheader' => $request->preheader,

               ]);
        }

        return back()->with([
            'type' => 'success',
            'message' => 'changes has been saved'
        ]);

    }

    public function uploadDesign(Request $request)
    {
       $upload = new DesignService();

       $upload->extractUploadAndModifyHtml($request);

        return back()->with([
            'type' => 'success',
            'message' => 'file has been upload'
        ]);
    }

    public function updateCampaignLaunch(Request $request)
    {
        $campaign = Campaign::where('uuid', $request->campaign_id)->first();

        $mail = new EmailService();

//        dd($request);
//        exit();
        foreach($campaign->segment->segment->target as $target){

            $exists = CampaignEmailLogs::where([
                ['campaign_id', '=', $campaign->id],
                ['customer_profile_id', '=', $target->customer_profile_id]
            ])->first();


            if (empty($exists))
            {
                $logs = CampaignEmailLogs::create([
                    'campaign_id' => $campaign->id,
                    'customer_profile_id' => $target->customer_profile_id,
                    'email' => $target->customer->email,
                ]);
            }

        }

        if ($request->activation !== 'draft' && $request->activation !== 'pause')
        {

            if ($request->activation == 'send now')
            {
                $campaign->update([
                    'campaign_status' => $campaign->campaign_type== 'recurring' ? 'Active' : 'In Progress',
                    'start_date' => Carbon::now(),
                    'activation_status' => $request->activation,
                    'is_lock' => true
                ]);

                if ($campaign->campaign_type == 'recurring' && $campaign->preset_type == 'Welcome')
                {
                    $mail->welcomeEmail($campaign->id);
                }elseif($campaign->campaign_type == 'single'){
                    $mail->singleEdm($campaign->id);
                }
            }else{
                $date = Carbon::parse($request->date);
                $campaign->update([
                    'start_date' => $date->format('Y-m-d'),
                    'campaign_status' => 'Scheduled',
                    'start_time' => $request->time,
                    'activation_status' => $request->activation,
                ]);
            }

            $return = to_route('email_analytics.index')->with([
                'type' => 'success',
                'message' => 'changes has been saved'
            ]);
        }else{

            $campaign->update([
                'activation_status' => $request->activation,
            ]);

            $return = back()->with([
                'type' => 'success',
                'message' => 'changes has been saved'
            ]);
        }



        return $return;
    }
}
