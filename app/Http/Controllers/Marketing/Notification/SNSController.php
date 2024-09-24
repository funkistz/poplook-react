<?php

namespace App\Http\Controllers\Marketing\Notification;

use App\Http\Controllers\Controller;
use App\Models\Marketing\Logs\CampaignEmailLogs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SNSController extends Controller
{
    public function notifications(Request $request)
    {
        $message = json_decode($request->getContent(), true);
        Log::info('SNS DATA' , $message);

        if (isset($message['Type'])) {
            if ($message['Type'] === 'SubscriptionConfirmation') {
                $this->confirmSubscription($message);
            } elseif ($message['Type'] === 'Notification') {
                $this->processNotification($message);
            } else {
                Log::info('Unknown SNS message type:', $message);
            }
        }

        return response()->json(['status' => 'success']);
    }

    protected function confirmSubscription($message)
    {
        $subscribeUrl = $message['SubscribeURL'];
        $response = file_get_contents($subscribeUrl);

        if ($response) {
            Log::info('Successfully confirmed SNS subscription.');
        } else {
            Log::error('Failed to confirm SNS subscription.');
        }
    }

    protected function processNotification($message)
    {
        $notification = json_decode($message['Message'], true);
        Log::info('Received SNS notification:', ['notification' => $notification]);

        if (isset($notification['notificationType'])) {
            switch ($notification['notificationType']) {
                case 'Bounce':
                    $this->handleBounce($notification);
                    break;
                case 'Complaint':
                    $this->handleComplaint($notification);
                    break;
                case 'Delivery':
                    $this->handleDelivery($notification);
                    break;
                default:
                    Log::info('Unknown notification type:', $notification);
                    break;
            }
        }
    }

    protected function handleBounce($notification)
    {
        foreach ($notification['bounce']['bouncedRecipients'] as $recipient) {
            $email = $recipient['emailAddress'];
            $bounceType = $notification['bounce']['bounceType'];
            $bounceSubType = $notification['bounce']['bounceSubType'];

            Log::info("Bounce received for email: $email with type: $bounceType and sub-type: $bounceSubType");

            $update = CampaignEmailLogs::where([
                ['email', '=', $email]
            ])->first();

            $update->update([
                'mail_status' => 'bounce',
                'error_logs' => json_encode([
                    'message'=> "Bounce received for email: $email with type: $bounceType and sub-type: $bounceSubType"
                ])
            ]);

//            SuppressionList::updateOrCreate(['email' => $email]);
        }
    }

    protected function handleComplaint($notification)
    {
        foreach ($notification['complaint']['complainedRecipients'] as $recipient) {
            $email = $recipient['emailAddress'];

            $update = CampaignEmailLogs::where([
                ['email', '=', $email]
            ])->first();

            $update->update([
                'mail_status' => 'complained',
                'error_logs' => json_encode([
                    'message'=> "Complaint received for email: $email"
                ])
            ]);

            Log::info("Complaint received for email: $email");
        }
    }

    protected function handleDelivery($notification)
    {
        $email = $notification['mail']['destination'][0];

        $update = CampaignEmailLogs::where([
            ['email', '=', $email]
        ])->first();

        $update->update([
            'mail_status' => 'delivered',
            'status' => 'delivered'
        ]);

        Log::info("Delivery received for email: $email");
    }
}
