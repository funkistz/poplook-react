<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Outlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $outlet_list = Outlet::where('status', 1)->get();
        if (!empty($outlet_list)) {
            # code...
            $response = [
                'code'    => 200,
                'message' => 'Record Found.',
                'data'    => $outlet_list,
            ];
        } else {
            $response = [
                'code'    => 500,
                'message' => 'Something went wrong, please try again.',
            ];
        }
        return response()->json($response)->setStatusCode($response['code']);
    }

    public function outletByName(Request $request)
    {
        // DB::enableQueryLog();
        $name        = $request->name;
        $outlet_list = Outlet::where('status', 1)->where('name', 'LIKE', '%'.$name.'%')->get();
        // $db = DB::getRawQueryLog();
        if (!empty($outlet_list)) {
            # code...
            $response = [
                'code'    => 200,
                'message' => 'Record Found.',
                'data'    => $outlet_list,
            ];
        } else {
            $response = [
                'code'    => 500,
                'message' => 'Something went wrong, please try again.',
            ];
        }
        return response()->json($response)->setStatusCode($response['code']);
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
}
