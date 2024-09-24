<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if (empty($user->id_role)) {
            return Inertia::render('Dashboard/IndexNoRole', []);
        }
        // $next_nav_link_json = json_decode($user->navigationLink[0]['link']);
        $next_nav_link = $user->navigationLink[0]['link'];
        if (empty($next_nav_link)) {
            $next_nav_link = $user->role->navigationLinkChildren[0]->link;
        }
        
        // if (!Gate::allows('admin', '')) {
        return to_route($next_nav_link);
        // }
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
