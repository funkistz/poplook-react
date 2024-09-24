<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shop;
use DateTime;

class ContactGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Marketing/ContactGroup/Index', [
            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $shop = Shop::getAllShop();
        return Inertia::render('Admin/Marketing/ContactGroup/Create', [
            'shop' => $shop
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return true
        return to_route('content_group.index')->with([
            'type'    => 'success',
            'message' => 'Successfully Added. Wait 5-10 min',
        ]);

        // return error
        // return back()->with([
        //     'type'    => 'error',
        //     'message' => 'Something wrong....',
        // ])->withErrors([
        //     'name' => 'Name Required'
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Admin/Marketing/ContactGroup/View', [
            
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
}
