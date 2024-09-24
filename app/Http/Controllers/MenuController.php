<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
    public function show(string $menu, int $id_lang, int $id_shop, int $user_tier)
    {
        $menus = '';
        if ($menu == 'desktop_top_menu') {
            # code...
            $menus = $this->top_menu('desktop',$id_shop);
        }
        return $menus;
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

    public function top_menu($device_type, $id_shop)
    {
        $customer = Menu::top_menu($device_type, $id_shop);

        return $customer;
    }
}
