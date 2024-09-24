<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NavigationLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('navigation_link')->truncate();
        DB::table('navigation_link')->insert([
            [
                'label'          => 'Dashboard',
                'icon'           => 'IconLayoutDashboard',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => "dashboard.index",
            ],
            [
                'label'          => 'User',
                'icon'           => 'IconUsers',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => '',
            ],
            [
                'label'          => 'Banner Setting',
                'icon'           => 'IconSlideshow',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => '',
            ],
            [
                'label'          => 'Menu Setting',
                'icon'           => 'IconMenu2',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => '',
            ],
            [
                'label'          => 'Catalog',
                'icon'           => 'IconBook',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => '',
            ],
            [
                'label'          => 'Retail',
                'icon'           => 'IconBuildingStore',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => '',
            ],
            [
                'label'          => 'Custom Page',
                'icon'           => 'IconLayoutDashboard',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => "custom_page.index",
            ],
            [
                'label'          => 'Order List',
                'icon'           => 'IconCoin',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => "order.index",
            ],
            [
                'label'          => 'Loyalty List',
                'icon'           => 'IconUserUp',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => "loyalty.index",
            ],
            [
                'label'          => 'Marketing',
                'icon'           => 'IconBadgeAd',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => '',
            ],
            [
                'label'          => 'Setting',
                'icon'           => 'IconSettings',
                'initially_open' => 0,
                'active'         => 1,
                'link'           => '',
            ],
        ]);
    }
}
