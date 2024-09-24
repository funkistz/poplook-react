<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class navigationLinkChildrenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('navigation_link_children')->truncate();
        DB::table('navigation_link_children')->insert([
            [
                'id_navigation_link' => 1,
                'label'              => 'Dashboard',
                'link'               => 'dashboard.index',
            ],
            [
                'id_navigation_link' => 2,
                'label'              => 'Customer',
                'link'               => 'customer.index',
            ],
            [
                'id_navigation_link' => 2,
                'label'              => 'Employee',
                'link'               => 'employee.index',
            ],
            [
                'id_navigation_link' => 3,
                'label'              => 'Desktop Banner',
                'link'               => 'desktop_banner.index',
            ],
            [
                'id_navigation_link' => 3,
                'label'              => 'Mobile Banner',
                'link'               => 'mobile_banner.index',
            ],
            [
                'id_navigation_link' => 3,
                'label'              => 'Desktop Top Banner',
                'link'               => 'desktop_top_banner.index',
            ],
            [
                'id_navigation_link' => 3,
                'label'              => 'Mobile Top Banner',
                'link'               => 'mobile_top_banner.index',
            ],
            [
                'id_navigation_link' => 3,
                'label'              => 'Desktop Footer Banner',
                'link'               => 'desktop_footer_banner.index',
            ],
            [
                'id_navigation_link' => 3,
                'label'              => 'Mobile Footer Banner',
                'link'               => 'mobile_footer_banner.index',
            ],
            [
                'id_navigation_link' => 3,
                'label'              => 'Desktop Exit Intent Banner',
                'link'               => 'desktop_exit_intent_banner.index',
            ],
            [
                'id_navigation_link' => 4,
                'label'              => 'Desktop Menu',
                'link'               => 'desktop_menu.index',
            ],
            [
                'id_navigation_link' => 4,
                'label'              => 'Mobile Menu',
                'link'               => 'mobile_menu.index',
            ],
            [
                'id_navigation_link' => 5,
                'link'               => 'category.index',
                'label'              => 'Category',
            ],
            [
                'id_navigation_link' => 5,
                'link'               => 'product.index',
                'label'              => 'Products',
            ],
            [
                'id_navigation_link' => 5,
                'link'               => 'customer_group.index',
                'label'              => 'Customer Group',
            ],
            [
                'id_navigation_link' => 6,
                'link'               => 'payInStore.index',
                'label'              => 'Pay In Store',
            ],
            [
                'id_navigation_link' => 6,
                'link'               => 'settlement.index',
                'label'              => 'Settlement',
            ],
            [
                'id_navigation_link' => 7,
                'label'              => 'Custom Page',
                'link'               => 'custom_page.index',
            ],
            [
                'id_navigation_link' => 8,
                'label'              => 'Order List',
                'link'               => 'order.index',
            ],
            [
                'id_navigation_link' => 9,
                'label'              => 'Loyalty List',
                'link'               => 'loyalty.index',
            ],
            [
                'id_navigation_link' => 10,
                'link'               => 'email_analytics.index',
                'label'              => 'Email',
            ],
            [
                'id_navigation_link' => 10,
                'link'               => 'app_notification.index',
                'label'              => 'App Push',
            ],
            [
                'id_navigation_link' => 10,
                'link'               => 'web_push.index',
                'label'              => 'Web Push',
            ],
            [
                'id_navigation_link' => 10,
                'link'               => 'whatsapp.index',
                'label'              => 'WhatsApp',
            ],
            [
                'id_navigation_link' => 10,
                'link'               => 'content_group.index',
                'label'              => 'Contact Group',
            ],
            [
                'id_navigation_link' => 10,
                'link'               => 'template-group.index',
                'label'              => 'Template Group',
            ],
            [
                'id_navigation_link' => 11,
                'link'               => 'navigation_link.index',
                'label'              => 'Navigation Link',
            ],
            [
                'id_navigation_link' => 11,
                'link'               => 'role.index',
                'label'              => 'Role',
            ],
            [
                'id_navigation_link' => 11,
                'link'               => 'logo.index',
                'label'              => 'Logo',
            ],
            [
                'id_navigation_link' => 11,
                'link'               => 'file_upload.index',
                'label'              => 'File Uploads',
            ],
            [
                'id_navigation_link' => 11,
                'link'               => 'outlet.index',
                'label'              => 'Outlet',
            ],
        ]);
    }
}
