<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Configuration;
use App\Models\ConfigurationSetting;
use App\Models\ConfigurationSettingGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ConfigurationSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list   = ConfigurationSetting::with(['configuration'])->where('active', 1)->orderBy('position', 'asc')->get();
        $listgroup = ConfigurationSettingGroup::with('configurationSetting.configuration')
        ->whereHas('configurationSetting', function ($query) {
            $query->where('active', 1)->orderBy('position', 'asc');
        })
        ->get();

        $categorylist = Categories::get_all_categories(false);
        $categorylistFull = Categories::get_all_categories();


        return Inertia::render('Configuration/Index', [
            'list' => $list,
            'listgroup' => $listgroup,
            'categorylist' => $categorylist,
            'categorylistFull' => $categorylistFull,
            'appUrl' => env('APP_URL')
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

    public function updateConfig(Request $request) 
    {
        try {
            foreach($request->all() as $result) {
                $id = $result['configuration']['id_configuration'];
                $config = Configuration::find($id);
                $config-> updateConfig($result);
            }
            return back()->with([
                'type'    => 'success',
                'message' => 'Successfully Update',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                "message" => "Something went wrong.",
            ]);
        }

    }
}
