<?php

namespace Database\Seeders;

use App\Models\NavigationLinkChildren;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NavigationLinkRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('navigation_link_role')->truncate();
        $navigation_link = NavigationLinkChildren::all();
        $data_nav        = [];
        foreach ($navigation_link as $link) {
            $data_nav[] = [
                'id_navigation_Link'          => $link->id_navigation_link,
                'id_navigation_link_children' => $link->id,
                'id_role'                     => 1,
            ];
        }
        DB::table('navigation_link_role')->insert($data_nav);
        // DB::table('navigation_link_role')->insert([
        //     [
        //         'id_navigation_link'          => 1,
        //         'id_navigation_link_children' => 1,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 2,
        //         'id_navigation_link_children' => 2,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 2,
        //         'id_navigation_link_children' => 3,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 3,
        //         'id_navigation_link_children' => 4,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 3,
        //         'id_navigation_link_children' => 5,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 3,
        //         'id_navigation_link_children' => 6,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 3,
        //         'id_navigation_link_children' => 7,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 3,
        //         'id_navigation_link_children' => 8,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 3,
        //         'id_navigation_link_children' => 9,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 3,
        //         'id_navigation_link_children' => 10,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 4,
        //         'id_navigation_link_children' => 11,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 4,
        //         'id_navigation_link_children' => 12,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 5,
        //         'id_navigation_link_children' => 13,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 5,
        //         'id_navigation_link_children' => 14,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 6,
        //         'id_navigation_link_children' => 15,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 6,
        //         'id_navigation_link_children' => 16,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 6,
        //         'id_navigation_link_children' => 17,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 7,
        //         'id_navigation_link_children' => 18,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 8,
        //         'id_navigation_link_children' => 19,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 9,
        //         'id_navigation_link_children' => 20,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 10,
        //         'id_navigation_link_children' => 21,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 10,
        //         'id_navigation_link_children' => 22,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 10,
        //         'id_navigation_link_children' => 23,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 10,
        //         'id_navigation_link_children' => 24,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 10,
        //         'id_navigation_link_children' => 25,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 11,
        //         'id_navigation_link_children' => 26,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 11,
        //         'id_navigation_link_children' => 27,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 11,
        //         'id_navigation_link_children' => 28,
        //         'id_role'                     => 1,
        //     ],
        //     [
        //         'id_navigation_link'          => 11,
        //         'id_navigation_link_children' => 29,
        //         'id_role'                     => 1,
        //     ],
        // ]);
    }
}
