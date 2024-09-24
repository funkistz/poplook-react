<?php

namespace App\Http\Controllers\Dashboard;

use App\Helpers\DataTableCustom;
use App\Helpers\MarketingUrl;
use App\Http\Controllers\Controller;
use App\Models\Marketing\Campaign;
use App\Models\Marketing\Design\TemplateDesign;
use App\Models\Marketing\Segment\CustomerToken;
use App\Services\Firebase\FirebaseService;
use Aws\Token\Token;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categories;
use App\Models\CustomPage;
use App\Models\Shop;
use App\Models\Marketing\Segment\SegmentGroup;

class WebPushController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $sortColumn = $request->input('sort_by', 'created_at');
        // $sortOrder  = $request->input('order_by', 'desc');
        // $pagination = $request->input('per_page', 5);
        // $searchTerm = $request->input('search');
        // $query      = Campaign::query()->where('campaign_category', '=', 'web_push')->with(['mail', 'template', 'template.template' => function($query) {
        //     $query->select('id', 'content');
        //   }]);

        // if ($searchTerm) {
        //     $query->where(function ($subquery) use ($searchTerm) {
        //         $subquery->where('campaign_name', 'like', '%' . $searchTerm . '%');
        //     });
        // }

        // $query->orderBy($sortColumn, $sortOrder);
        // $list = $query->paginate($pagination);

        // $custom = collect([
        //     'sort_by'  => $sortColumn,
        //     'order_by' => $sortOrder,
        //     'search'   => $searchTerm,
        // ]);
        // $list = $custom->merge($list);

        $data = collect([
            'model' => Campaign::class,
            'relationships' => ['mail', 'template', 'template.template' => function($query) {
                $query->select('id', 'content');
            }],
            'conditions' => [
                'where' => [['campaign_category', '=', 'web_push']],
            ],
            'searchableFields' => ['campaign_name'],
            'filterField' => 'campaign_status',
        ]);
        $list = DataTableCustom::applyFilters($request, $data->toArray());

        return Inertia::render('Admin/Marketing/WebPush/Index', [
            'list' => $list,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        return back()->with([
            'type' => 'success',
            'message' => 'campaign has been created'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function segment(string $id, Request $request)
    {
        $segment = SegmentGroup::getSegmentGroupSelectData();
        $shop = Shop::getAllShop();

        $campaign = Campaign::where('uuid', $id)->first();
        $data  = null;

        if ($campaign->segment)
        {
            $data = [
              'shop_id' => strval($campaign->segment->shop_id),
              'segment_group_id' => strval($campaign->segment->segment_group_id),
              'campaign_name' => $campaign->campaign_name
            ];
        } else {
            $data = [
                'campaign_name' => $campaign->campaign_name
              ];
        }
        return Inertia::render('Admin/Marketing/WebPush/segment', [
            'id' => $id,
            'segment' => $segment,
            'shop' => $shop,
            'data' => $data,
            'campaign' => $campaign 
        ]);
    }

    public function design(string $id,Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->first();

        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data_without_id();

        if ($campaign->template)
        {
            $design = $campaign->template->template->content;
        }else{
            $design = null;
        }

        return Inertia::render('Admin/Marketing/WebPush/design', [
            'id' => $id,
            'category' => $category,
            'pages' => $pages,
            'design' => json_decode($design),
            'domain' => env('API_URL'),
            'campaign' => $campaign
        ]);
    }

    public function launch(string $id,Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->first();
        $segment = CustomerToken::getCountIsvalidCustomerToken();
        return Inertia::render('Admin/Marketing/WebPush/launch', [
            'id' => $id,
            'campaign' => $campaign,
            'segment' => $segment,
        ]);
    }

    public function segmentUpdate(Request $request)
    {

        $request->validate([
            'shop' => 'required',
            'segment' => 'required',
        ]);

        $campaign = Campaign::where('uuid', '=', $request->id)->first();

        if (empty($campaign->segment))
        {
            $campaign->segment()->create([
                'segment_group_id' => $request->segment,
                'shop_id' => $request->shop,
            ]);
        }else{
            $campaign->segment()->update([
                'segment_group_id' => $request->segment,
                'shop_id' => $request->shop,
            ]);
        }

        return back()->with([
            'type' => 'success',
            'message' => 'campaign has been created'
        ]);
    }

    public function designUpdate(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'desc' => 'required',
            'linkUrl' => 'required',
        ]);

        $campaign = Campaign::where("uuid", '=', $request->id)->first();

        $defaultIcon = $request->icon;
        $customIcon = $request->customIcon;
        $isImg = $request->isImg;
        $imgUrl = $request->imgUrl;

        
        // Url
        $link = MarketingUrl::urlConverter($request->link, $request->linkUrl);

        // Checking Button
        $actionBtn = $request->actionBtn;
        if($actionBtn) {
            if($request->actionBtnTotal == 1) {
                $request->validate([
                    'title' => 'required',
                    'desc' => 'required',
                    'linkUrl' => 'required',
                    'stBtnLabel' => 'required',
                    'stBtnLink' => 'required',
                ],[
                    'stBtnLabel.required' => 'The label url field is required.',
                    'stBtnLink.required' => 'The link url field is required.',
                ]);
            } else {
                $request->validate([
                    'title' => 'required',
                    'desc' => 'required',
                    'linkUrl' => 'required',
                    'stBtnLabel' => 'required',
                    'stBtnLink' => 'required',
                    'ndBtnLabel' => 'required',
                    'ndBtnLink' => 'required',
                ],[
                    'stBtnLabel.required' => 'The label button field is required.',
                    'stBtnLink.required' => 'The link url field is required.',
                    'ndBtnLabel.required' => 'The label button field is required.',
                    'ndBtnLink.required' => 'The link url field is required.',
                ]);
            }
        }

        // dd($request->icon);
        $data = [
            'title' => $request->title,
            'body' => $request->desc,
            'icon' => env('APP_URL').$request->customIcon,
            'type' => $request->link,
            'linkUrl' => $request->linkUrl,
            'link' => $link,
            'actionBtn' => $request->actionBtn,
            'actionBtnTotal' => $request->actionBtn ? $request-> actionBtnTotal : 1,
            'defaultIcon' => $request->icon,
            'iconUrl' => $request->icon ?  $request->customIcon : '/PL_ICON.png',
            'iconUrlFull' => $request->icon ?  env('APP_URL'). $request->customIcon : env('APP_URL').'/PL_ICON.png',
            'isImg' => $request->isImg,
            'imgUrl' => $request->isImg ? $request->imgUrl : null,
            'imgUrlFull' => $request->isImg ? env('APP_URL'). $request->imgUrl : null,
            
        ];

        // Pass Buttons data
        if($actionBtn) {
            if($request->actionBtnTotal == 1) {
                $data['buttons'] [] = [
                   'action' => MarketingUrl::urlConverter($request->stBtnType, $request->stBtnLink),
                    'oriLink' => $request->stBtnLink,
                    'title' => $request->stBtnLabel,
                    'type' => $request->stBtnType
                ];
            } else if($request->actionBtnTotal == 2) {
                $data['buttons'] = [
                    [
                        'action' => MarketingUrl::urlConverter($request->stBtnType, $request->stBtnLink),
                        'oriLink' => $request->stBtnLink,
                        'title' => $request->stBtnLabel,
                        'type' => $request->stBtnType
                    ],[
                        'action' => MarketingUrl::urlConverter($request->ndBtnType, $request->ndBtnLink),
                        'oriLink' => $request->ndBtnLink,
                        'title' => $request->ndBtnLabel,
                        'type' => $request->ndBtnType
                    ]
                ];
            }
        } else {
            $data['buttons'] = null;
        }

        // dd($request->all());


        if ($campaign->template)
        {
            $campaign->template->template()->update([
                'content' => json_encode($data)
            ]);

        }else {

            $design = TemplateDesign::create([
                'template_name' => "webpush-".$campaign->campaign_name."-".Carbon::now()->format('Ymd'),
                'template_type' => 'webpush',
                'content' => json_encode($data)
            ]);

            $design->campaign()->create([
                'campaign_id' => $campaign->id,
            ]);

        }


    }

    public function launchUpdate(Request $request)
    {
        $campaign = Campaign::where('uuid', $request->id)->first();

        $request->validate([
            'status' => 'required',
        ]);

        $status = $request->status;

        if($status == 'send later') {
            $request->validate([
                'sendDate' => 'required',
                'sendTime' => 'required',
            ]);
        }

        if($status == 'send recurring') {
            $request->validate([
                'recurrence' => 'required',
                'trigger_time' => 'required',
                'start_date' => 'required',
                'start_time' => 'required',
                'end_date' => 'required',
                'end_time' => 'required',
            ]);
        }

        if ($status == 'send now')
        {
            $campaign->update([
                'activation_status' => 'send now',
                'campaign_status' => 'In Progress',
                'start_time' => Carbon::now()->format('H:i'),
                'start_date' => Carbon::now()->format('Y-m-d'),
                'is_lock' => true
            ]);

            $this->sendOut($campaign->id);
        }


        return back()->with([
            'type' => 'success',
            'message' => 'Success Launch'
        ]);
    }

    //temporary
    public function sendOut($id)
    {
        $firebase = new FirebaseService();
        $campaign = Campaign::find($id);

        if ($campaign->segment)
        {
            $shopid = 1;

            if ($campaign->segment)
            {
                $shopid = $campaign->segment->shop_id;
            }

            $customerTokens = CustomerToken::where([
                ['type', '=', 'webpush'],
                ['shop_id', '=', $shopid]
            ])->get();

            $token = [];

            foreach ($customerTokens as $tk)
            {
                if ($firebase->validate($tk->token)) {
                    array_push($token, $tk->token);
                }
            }

            $template = $campaign->template->template;

            $data = json_decode($template->content, true);

            $send = $firebase->webPushNotification($data, $token);

            $campaign->update([
               'campaign_status' => 'Completed'
            ]);

        }else{

            $campaign->update([
                'campaign_status' => 'Error',
                'activation_status' => 'draft'
            ]);
        }
    }

    public function sendOutApp($id)
    {
        $firebase = new FirebaseService();
        $campaign = Campaign::find($id);

        if ($campaign->segment)
        {
            $shopid = 1;

            if ($campaign->segment)
            {
                $shopid = $campaign->segment->shop_id;
            }

            $customerTokens = CustomerToken::where([
                ['type', '=', 'webpush'],
                ['shop_id', '=', $shopid]
            ])->get();

            $token = [];

            foreach ($customerTokens as $tk)
            {
                if ($firebase->validate($tk->token)) {
                    array_push($token, $tk->token);
                }
            }

            $template = $campaign->template->template;

            $data = json_decode($template->content, true);

            $send = $firebase->appPushNotification($data, $token);

            $campaign->update([
                'campaign_status' => 'Completed'
            ]);

        }else{

            $campaign->update([
                'campaign_status' => 'Error',
                'activation_status' => 'draft'
            ]);
        }
    }
}
