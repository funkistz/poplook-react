<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class roleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('role')->truncate();
        DB::table('role')->insert([
            [
                'name' => 'Admin',
            ],
            [
                'name' => 'Frontops',
            ],
            [
                'name' => 'Backops',
            ],
            [
                'name' => 'CS',
            ],
            [
                'name' => 'Retail',
            ],
            [
                'name' => 'Accounts',
            ],
            [
                'name' => 'Marketing',
            ],
        ]);

        $this->call(NavigationLinkSeeder::class);
        $this->call(navigationLinkChildrenSeeder::class);
        $this->call(NavigationLinkRoleSeeder::class);
    }
}
