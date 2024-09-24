<?php

namespace App\Services\Firebase;
use App\Models\Marketing\Segment\CustomerToken;
use Illuminate\Support\Facades\Storage;
use Kreait\Firebase\Contract\Messaging;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\WebPushConfig;
use Kreait\Firebase\Messaging\Notification;


class FirebaseService
{
    public $messaging;
    public $service;

    public function __construct()
    {
        $this->service = (new Factory())->withServiceAccount(storage_path('app/' . env('FIREBASE_CREDENTIALS')));
        $this->messaging = $this->service->createMessaging();
    }

    public function validate($token)
    {

        $validate  =  $this->messaging ->validateRegistrationTokens($token);

        if (count($validate['valid']) == 0)
        {
            $token = CustomerToken::where([
                ['token', '=', $token]
            ])->first();

            $token->update([
                'is_valid' => false
            ]);
        }

        return count($validate['valid']) !== 0 ? true : false;
    }
    public function webPushNotification($data, $token)
    {

        $buttons = null;
        $buttonsUrl1 = null;
        $buttonsUrl2 = null;

        $buttonText1 = null;
        $buttonText2 = null;

        // Check if had buttons or not
        if(isset($data['buttons']) && is_array($data['buttons'])) {
            foreach($data['buttons'] as $key => $item) {
                $buttons[] = [
                    'action' => 'button' . $key + 1,
                    'title' => $item['title'],
                ];

                if($key == 0) {
                    $buttonsUrl1 = $item['action'];
                    $buttonText1 = $item['title'];
                }

                if($key == 1) {
                    $buttonsUrl2 = $item['action'];
                    $buttonText2 = $item['title'];
                }
            }
        }

        $img = $data['isImg'] ? $data['imgUrlFull'] :  null;
        $icon = $data['defaultIcon'] ? $data['iconUrlFull']: 'https://api-stg.poplook.com/PL_ICON.png';


        $notification = Notification::create($data['title'], $data['body']);
        $message = CloudMessage::fromArray([
            'notification' => $notification, 
            'webpush' => [
                'fcm_options' => [
                    'link' =>  $data['link'], 
                ],
                'notification' => [
                    'icon' =>  $icon,
                    'image' => $img,
                    'action' => $buttons
                ],
                'data' => [
                    'urlButton1' => $buttonsUrl1,
                    'urlButton2' => $buttonsUrl2,
                    'titleButton1' => $buttonText1,
                    'titleButton2' => $buttonText2,
                ]
            ],
        ]);

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => $data['title'],
                'body' => $data['body'],
                'link' => $data['link'],
                'icon' => $icon,
                'image' => $img,
                'action' => json_encode($buttons),
                'urlButton1' => $buttonsUrl1,
                'urlButton2' => $buttonsUrl2,
                'titleButton1' => $buttonText1,
                'titleButton2' => $buttonText2,
            ],
        ]);

        return $this->messaging->sendMulticast($message, $token);
    }

    public function notificationTest($token, $url)
    {
        $message = CloudMessage::fromArray([
           'notification' => [
               'title' => "Poplook Notification Test 😎",
               'body' => "Hello World!",
           ],
           'android' => [
                'notification' => [
                    'image' => $url
                ],
           ],
           'apns' => [
               'payload' => [
                   'aps' => [
                       'mutable-content' => 1
                   ]
               ],
               'fcm_options' => [
                   'image' => $url
               ]
           ]
        ]);

        $data =  $this->messaging->sendMulticast($message, $token);

        return response()->json([
            'status' => 'succces',
            'data' => $data,
        ]);
    }

    public function appPushNotification($data, $token)
    {
        $params = [
            'categoryId' => 45,
            'categoryName' => "What's New",
        ];

        $message = CloudMessage::fromArray([
            'notification' => [
                'title' => $data['title'],
                'body' => $data['body'],
            ],
            'data' => [
                'screen' => 'CategoryPage',
                'params' => json_encode($params), 
            ],
            'android' => [
                'notification' => [
                    'image' => env('APP_URL').''.$data['image'],
                ],
                'data' => [
                    'title' => $data['title'],
                    'body' => $data['body'],
                ]
            ],
            'apns' => [
                'fcm_options' => [
                    'image' => env('APP_URL').''.$data['image'],
                ]
            ]
        ]);


        $data =  $this->messaging->sendMulticast($message, $token);

        return response()->json([
            'status' => 'succces',
            'data' => $data,
        ]);
    }
}
