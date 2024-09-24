<?php

namespace App\Http\Controllers\Dashboard;

use App\Helpers\DataTableCustom;
use App\Http\Controllers\Controller;
use App\Models\Marketing\Campaign;
use App\Models\Marketing\Design\TemplateDesign;
use App\Models\Marketing\Segment\CustomerToken;
use App\Models\Shop;
use App\Services\Firebase\FirebaseService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Concerns\ToArray;

class AppNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // $shop = Shop::getAllShop();
        // $sortColumn = $request->input('sort_by', 'created_at');
        // $sortOrder  = $request->input('order_by', 'desc');
        // $pagination = $request->input('per_page', 5);
        // $searchTerm = $request->input('search');
        // $query      = Campaign::query()->where('campaign_category', '=', 'app_push')->with(['mail', 'template', 'template.template' => function($query) {
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
                'where' => [['campaign_category', '=', 'app_push']],
            ],
            'searchableFields' => ['campaign_name'],
            'filterField' => 'campaign_status',
        ]);
        $list = DataTableCustom::applyFilters($request, $data->toArray());
        return Inertia::render('Admin/Marketing/AppPush/Index', [
            'list' => $list,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);


        $campaign = Campaign::create([
            'ps_employee_id' => auth('admin')->user()->id_employee,
            'uuid' => Str::uuid(),
            'campaign_name' => $request->name,
            'campaign_category' => 'app_push'
        ]);

        //temprory
        $campaign->segment()->create([
            'segment_group_id' => 2,
        ]);

        return redirect('app_notification/'.$campaign->uuid.'/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'desc' => 'required',
        ],[
            'desc.required' => 'The Message field is required.',
        ]);

        $campaign = Campaign::where("uuid", '=', $request->id)->first();

        $data = [
          'title' => $request->title,
          'body' => $request->desc,
          'image' => $request->img
        ];

        if ($campaign->template)
        {
            $campaign->template->template()->update([
                'content' => json_encode($data)
            ]);

        }else {

            $design = TemplateDesign::create([
                'template_name' => "apppush-".$campaign->campaign_name."-".Carbon::now()->format('Ymd'),
                'template_type' => 'apppush',
                'content' => json_encode($data)
            ]);

            $design->campaign()->create([
                'campaign_id' => $campaign->id,
            ]);

        }
    }

    public function storeOptions(Request $request)
    {
        $request->validate([
            'delivery' => 'required'
        ]);

        if ($request->delivery == 2)
        {
            $request->validate([
                'delivery' => 'required',
                'date' => 'required'
            ]);
        }

        $campaign = Campaign::where('uuid', $request->id)->first();

        if ($request->delivery == '1')
        {
            $data = [
                'activation_status' => 'send now',
                'campaign_status' => 'Ready',
                'is_lock' => false
            ];

        }elseif ($request->delivery == '2')
        {
            $date  = Carbon::parse($request->date);
            $data = [
                'activation_status' => 'send later',
                'campaign_status' => 'Ready',
                'start_time' => $date->format('H:i'),
                'start_date' => $date->format('Y-m-d'),
                'is_lock' => false
            ];
        }

        $campaign->update($data);


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

    public function createNew(string $id, Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->first();

        if ($campaign->template)
        {
            $design = $campaign->template->template->content;
        }else{
            $design = null;
        }

        return Inertia::render('Admin/Marketing/AppPush/Create', [
            'id' => $id,
            'design' => json_decode($design),
            'campaign' => $campaign,
        ]);
    }

    public function segment(string $id, Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->first();
        return Inertia::render('Admin/Marketing/AppPush/Segment', [
            'id' => $id,
            'campaign' => $campaign,
        ]);
    }

    public function option(string $id, Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->first();

        $dateTime1 = Carbon::parse($campaign->start_date)->setTimeFrom(Carbon::parse($campaign->start_time));

        if ($campaign->activation_status !== null)
        {
            if ($campaign->activation_status == 'send now')
            {
                $delivery = 1;
            }else{
                $delivery = 2;

            }

        }
        return Inertia::render('Admin/Marketing/AppPush/Option', [
            'id' => $id,
            'campaign' => [
                'date' => $dateTime1->toDateTimeString(),
                'delivery' => $delivery,
                'is_lock' => $campaign->is_lock
            ],
        ]);
    }

    public function launch(string $id, Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->first();

        return Inertia::render('Admin/Marketing/AppPush/Launch', [
            'id' => $id,
            'campaign' => $campaign
        ]);
    }

    public function launchUpdate(Request $request)
    {
        $campaign = Campaign::where('uuid', $request->id)->first();

        if ($campaign->activation_status == 'send now')
        {
            $campaign->update([
                'campaign_status' => 'In Progress',
                'is_lock' => true,
                'start_time' => Carbon::now()->format('H:i'),
                'start_date' => Carbon::now()->format('Y-m-d'),
            ]);

            $this->sendOutApp($campaign->id);
        }elseif ($campaign->activation_status == 'send later')
        {
            $campaign->update([
                'campaign_status' => 'Scheduled',
                'is_lock' => false,
            ]);
        }
    }

    public function sendOutApp($id)
    {
        $firebase = new FirebaseService();
        $campaign = Campaign::find($id);

        if ($campaign->segment) {
            $shopid = 1;

            if ($campaign->segment) {
                $shopid = $campaign->segment->shop_id;
            }

            $customerTokens = CustomerToken::where([
                ['type', '!=', 'webpush'],
                ['shop_id', '=', $shopid],
                ['is_valid', '=', true]
            ])->get();

            $token = [];

            foreach ($customerTokens as $tk) {
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

        } else {

            $campaign->update([
                'campaign_status' => 'Error',
                'activation_status' => 'draft',
                'is_lock' => false
            ]);
        }
    }
}
