<?php

namespace App\Http\Controllers;

use App\Models\Seo;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $id_seo = $request->id_seo;
        $seo = Seo::where('id_seo',  $request->id_seo)->get();

        if ($seo && count($seo) > 0) {
            return response()->json([
                "data" => $seo,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No seo found"
            ])->setStatusCode(404);
        }
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
    public function show(int $id, int $id_lang, int $id_shop, int $id_cms_category)
    {
        $seo = Seo::FindCms($id,$id_lang,$id_shop,$id_cms_category);

        if (!empty($seo)) {
            return response()->json([
                "data" => $seo,
                "message" => "Success"
            ])->setStatusCode(200);
        } else {
            return response()->json([
                "data" => null,
                "message" => "No seo found"
            ])->setStatusCode(404);
        }
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
