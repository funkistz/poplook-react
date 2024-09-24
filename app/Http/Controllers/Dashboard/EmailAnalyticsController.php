<?php

namespace App\Http\Controllers\Dashboard;

use App\Helpers\DataTableCustom;
use App\Http\Controllers\Controller;
use App\Models\Marketing\Campaign;
use App\Models\Marketing\Segment\SegmentGroup;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shop;

use App\Models\Customer;

class EmailAnalyticsController extends Controller
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
        // $query      = Campaign::query()->where([
        //     ['campaign_category', '=', 'email'],
        //     ['campaign_type', '=', 'single']
        // ]);

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

        // $preset = Campaign::query()->where([
        //     ['campaign_category', '=', 'email'],
        //     ['campaign_type', '=', 'recurring']
        // ]);

        // if ($searchTerm) {
        //     $preset->where(function ($subquery) use ($searchTerm) {
        //         $subquery->where('campaign_name', 'like', '%' . $searchTerm . '%');
        //     });
        // }
        // $pre = $preset->paginate($pagination);

        // $cust = collect([
        //     'sort_by'  => $sortColumn,
        //     'order_by' => $sortOrder,
        //     'search'   => $searchTerm,
        // ]);
        // $pre= $cust->merge($pre);




        // Email List
        $dataEmail = collect([
            'model' => Campaign::class,
            'conditions' => [
                'where' => [
                    ['campaign_category', '=', 'email'],
                    ['campaign_type', '=', 'single'],
                ],
            ],
            'searchableFields' => ['campaign_name'],
            'filterField' => 'campaign_status',
        ]);
        $list = DataTableCustom::applyFilters($request, $dataEmail->toArray());

        // Preset list
        $dataPreset = collect([
            'model' => Campaign::class,
            'conditions' => [
                'where' => [
                    ['campaign_category', '=', 'email'],
                    ['campaign_type', '=', 'recurring'],
                ],
            ],
            'searchableFields' => ['campaign_name'],
            'filterField' => 'campaign_status',
        ]);
        $pre = DataTableCustom::applyFilters($request, $dataPreset->toArray());

        return Inertia::render('Admin/Marketing/Email/Index', [
            'list' => $list,
            'preset' => $pre,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Admin/Marketing/Email/Recipients', [

        ]);
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

    public function recipients(string $id, Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->first();
        $groups = SegmentGroup::all();

        $data = [];

        foreach ($groups as $group)
        {
            $d = [
                'value' => $group->id,
                'label' => strtolower($group->group_name),
            ];

            array_push($data, $d);
        }

        return Inertia::render('Admin/Marketing/Email/Recipients', [
            'id' => $id,
            'campaign' => $campaign,
            'groups' => $data
        ]);
    }

    public function design(string $id,Request $request)
    {
        $campaign = Campaign::where('uuid', $id)->with(['mail'])->first();

        return Inertia::render('Admin/Marketing/Email/Design', [
            'id' => $id,
            'campaign' => $campaign,
             "html" => $campaign->template ? html_entity_decode($campaign->template->template->html) : null
        ]);
    }

    public function launch(string $id,Request $request)
    {
        // dd($request);
        $campaign = Campaign::where('uuid', $id)->first();

        $date = Carbon::parse($campaign->start_date);
        $data = [
            'id' => $campaign->id,
            'uuid' => $campaign->uuid,
            'campaign_name' => $campaign->campaign_name,
            'activation_status' => $campaign->activation_status,
            'campaign_status' => $campaign->status,
            'start_date' => $date->toIso8601ZuluString(),
            'start_time' => $campaign->start_time,
        ];

        return Inertia::render('Admin/Marketing/Email/Launch', [
            'id' => $id,
            'campaign' => $data

        ]);
    }
}
