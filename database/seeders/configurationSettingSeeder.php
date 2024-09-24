<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class configurationSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('configuration_setting')->insert([
            [
                'id_configuration_setting_group' => 1,
                'name' => 'PS_LOGO',
                'label' => 'Logo',
                'active' => 1,
                'position' => 1,
                'option' => null,
                'value_type' => 'image',
            ],
            [
                'id_configuration_setting_group' => 1,
                'name' => 'SHOP_LOGO_HEIGHT',
                'label' => 'Height',
                'active' => 1,
                'position' => 2,
                'option' => null,
                'value_type' => 'number',
            ],
            [
                'id_configuration_setting_group' => 1,
                'name' => 'SHOP_LOGO_WIDTH',
                'label' => 'Width',
                'active' => 1,
                'position' => 3,
                'option' => null,
                'value_type' => 'number',
            ],
            [
                'id_configuration_setting_group' => 1,
                'name' => 'PS_SHOP_PHONE',
                'label' => 'Phone',
                'active' => 1,
                'position' => 3,
                'option' => null,
                'value_type' => 'string',
            ],
            [
                'id_configuration_setting_group' => 1,
                'name' => 'MA_MERCHANT_MAILS',
                'label' => 'Mail',
                'active' => 1,
                'position' => 3,
                'option' => null,
                'value_type' => 'string',
            ],
            
            [
                'id_configuration_setting_group' => 2,
                'name' => 'PS_CSPS_TIME_START_AT',
                'label' => 'Time start at',
                'active' => 1,
                'position' => 1,
                'option' => null,
                'value_type' => 'time',
            ],
            [
                'id_configuration_setting_group' => 2,
                'name' => 'PS_CSPS_TIME_END_AT',
                'label' => 'Time end at',
                'active' => 1,
                'position' => 2,
                'option' => null,
                'value_type' => 'time',
            ],
            [
                'id_configuration_setting_group' => 2,
                'name' => 'PS_CSPS_PUSH_TIME_END_AT',
                'label' => 'Time end at',
                'active' => 1,
                'position' => 3,
                'option' => null,
                'value_type' => 'time',
            ],
            [
                'id_configuration_setting_group' => 2,
                'name' => 'PS_CSPS_ENABLED',
                'label' => 'Enabled',
                'active' => 1,
                'position' => 4,
                'option' => null,
                'value_type' => 'boolean',
            ],
            [
                'PS_CSPS_STORE_PRIORITY' => 2,
                'name' => 'PS_CSPS_ENABLED',
                'label' => 'Enabled',
                'active' => 1,
                'position' => 5,
                'option' => 
                '[
                    {
                        "value": 2,
                        "name": "Central"
                    },
                    {
                        "value": 39,
                        "name": "Aeon Shah Alam"
                    },
                    {
                        "value": 41,
                        "name": "Aeon Tebrau"
                    },
                    {
                        "value": 33,
                        "name": "IOI City Mall"
                    },
                    {
                        "value": 36,
                        "name": "KL East Mall"
                    },
                    {
                        "value": 20,
                        "name": "Setia City"
                    },
                    {
                        "value": 21,
                        "name": "Sogo"
                    },
                    {
                        "value": 19,
                        "name": "The Curve"
                    }
                ]',
                'value_type' => 'boolean',
            ],

            [
                'id_configuration_setting_group' => 3,
                'name' => 'countdown_deadline_status',
                'label' => 'Deadline Status',
                'active' => 1,
                'position' => 1,
                'option' => null,
                'value_type' => 'boolean',
            ],
            [
                'id_configuration_setting_group' => 3,
                'name' => 'countdown_banner_redirect',
                'label' => 'Redirect',
                'active' => 1,
                'position' => 2,
                'option' => null,
                'value_type' => 'string',
            ],
            [
                'id_configuration_setting_group' => 3,
                'name' => 'countdown_css',
                'label' => 'css',
                'active' => 1,
                'position' => 3,
                'option' => null,
                'value_type' => 'textarea',
            ],
            [
                'id_configuration_setting_group' => 3,
                'name' => 'countdown_start_at',
                'label' => 'Start at',
                'active' => 1,
                'position' => 4,
                'option' => null,
                'value_type' => 'datetime',
            ],
            [
                'id_configuration_setting_group' => 3,
                'name' => 'countdown_end_at',
                'label' => 'End at',
                'active' => 1,
                'position' => 5,
                'option' => null,
                'value_type' => 'datetime',
            ],
            [
                'id_configuration_setting_group' => 3,
                'name' => 'countdown_banner_link',
                'label' => 'Image',
                'active' => 1,
                'position' => 6,
                'option' => null,
                'value_type' => 'image',
            ],
            [
                'id_configuration_setting_group' => 3,
                'name' => 'countdown_category_selected',
                'label' => 'Category',
                'active' => 1,
                'position' => 7,
                'option' => null,
                'value_type' => 'multiple_select',
            ],
        ]);
    }
}
