<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class configurationSettingGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('configuration_setting_group')->insert([
            [
                'id' => 1,
                'name' => 'General Setting',
                'position' => 1,
            ],
            [
                'id' => 2,
                'name' => 'CSPS',
                'position' => 2,
            ],
            [
                'id' => 3,
                'name' => 'Countdown',
                'position' => 3,
            ]
        ]);
    }
}
