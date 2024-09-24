<?php

namespace App\Services\Marketing\Email;

use App\Mail\Campaign\Email\BirthdayEdm;
use App\Mail\Campaign\Email\EdmEmail;
use App\Models\Marketing\Campaign;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    public function singleEdm($campaign_id)
    {
        $campaign = Campaign::find($campaign_id);

        foreach($campaign->segment->segment->target as $customer) {


            Mail::to($customer->customer->email, $customer->customer->name)->send(new EdmEmail($campaign));

        }

        $campaign->update([
            'campaign_status' => 'Completed'
        ]);

        return;

    }

    public function welcomeEmail($campaign_id)
    {
        $campaign = Campaign::find($campaign_id);

        foreach($campaign->segment->segment->target as $customer) {

            $subject = str_replace("{{name}}", $customer->customer->name, $campaign->mail->subject);

            Mail::to($customer->customer->email, $customer->customer->name)->send(new BirthdayEdm($subject, html_entity_decode($campaign->template->template->html)));

        }


    }
}
