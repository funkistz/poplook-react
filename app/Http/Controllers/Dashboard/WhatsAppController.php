<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categories;
use App\Models\CustomPage;

class WhatsAppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Marketing/Whatsapp/Index', [
         
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

    public function segment(string $id, Request $request)
    {
        return Inertia::render('Admin/Marketing/Whatsapp/segment', [
            'id' => $id
        ]);
    }

    public function design(string $id,Request $request)
    {
        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data();
        return Inertia::render('Admin/Marketing/Whatsapp/design', [
            'id' => $id,
            'env' => env('API_DOMAIN'),
            'category' => $category,
            'pages' => $pages,
        ]);
    }

    public function goal(string $id,Request $request)
    {
        return Inertia::render('Admin/Marketing/Whatsapp/goal', [
            'id' => $id
        ]);
    }

    public function launch(string $id,Request $request)
    {
        return Inertia::render('Admin/Marketing/Whatsapp/launch', [
            'id' => $id
        ]);
    }
}
