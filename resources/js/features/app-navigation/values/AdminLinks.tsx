import React from 'react'
import {
    IconSettings,
    IconSwitchHorizontal,
    IconLogout,
    IconLayoutDashboard,
    IconCar,
    IconList,
    IconBookmarks,
    IconUsers,
    IconListDetails,
    IconUserCircle,
    IconLockAccess,
    IconPhoto,
    IconFingerprint,
    IconUsersGroup,
    IconReportAnalytics,
    IconAddressBook,
    IconPhone,
    IconDeviceCameraPhone,
    IconDeviceMobile,
    IconSlideshow,
    IconMenu2,
    IconCoin,
    IconUserUp,
    IconBadgeAd,
    IconCategory,
    IconBook,
} from '@tabler/icons-react';

export const adminLinks = [
    {
        label: 'Dashboard',
        icon: IconLayoutDashboard,
        link: route('admin.index'),
        permission: [1, 2, 10],
    },
    {
        label: 'Customers',
        icon: IconUsers,
        link: route('customer.index'),
        permission: [1, 2, 10],
    },
    {
        label: 'Banner', icon: IconSlideshow, initiallyOpened: false,
        links: [
            { link: route('desktop_banner.index'), label: 'Desktop Home Banner' },
            { link: route('mobile_banner.index'), label: 'Mobile Home Banner' },
            { link: route('desktop_top_banner.index'), label: 'Desktop Top Banner' },
            { link: route('mobile_top_banner.index'), label: 'Mobile Top Banner' },
            // { link: route('desktop_countdown_banner.index'), label: 'Desktop Countdown Banner' },
            // { link: route('mobile_countdown_banner.index'), label: 'Mobile Countdown Banner' },
            { link: route('desktop_footer_banner.index'), label: 'Desktop Footer Banner' },
            { link: route('mobile_footer_banner.index'), label: 'Mobile Footer Banner' },
        ],
        permission: [1, 2, 10]
    },
    {
        label: 'Menu Navigation', icon: IconMenu2, initiallyOpened: false,
        links: [
            { link: route('desktop_menu.index'), label: 'Desktop Menu', },
            { link: route('mobile_menu.index'), label: 'Mobile Menu', },
        ],
        permission: [1, 2, 10]
    },
    {
        label: 'Catalog', icon: IconBook, initiallyOpened: false,
        links: [
            { link: route('product.index'), label: 'Products', },
            { link: route('category.index'), label: 'Categories', },
        ],
    },
    {
        label: 'Custom Page',
        icon: IconLayoutDashboard,
        link: route('custom_page.index'),
        permission: [1, 2, 10]
    },
    {
        link: route('order.index'), label: 'Order List', icon: IconCoin,
        permission: [1, 2, 10]
    },
    {
        link: route('loyalty.index'), label: 'Loyalty List', icon: IconUserUp,
        permission: [1, 2, 10]
    },
    {
        label: 'Marketing', icon: IconBadgeAd, initiallyOpened: false,
        links: [
            { link: route('email_analytics.index'), label: 'Email' },
            { link: route('app_notification.index'), label: 'App Push' },
        ],
        permission: [1, 2, 10]
    },
    // { link: route('category.index'), label: 'Category List', icon: IconCategory },
];

export const AdminNavLink = (auth: any) => {
    const nav_link: any = [];
    Object.keys(auth.user.nav_links).forEach(function (key, index) {
        let links = {};
        let nav_link_parent = auth.user.nav_links[key]['parent'];
        let nav_link_children = auth.user.nav_links[key]['children'];
        try {
            if (!nav_link_parent.link) {
                if (Object.keys(nav_link_children).length > 0) {
                    // convert object to array
                    var nav_link_children_arr = Object.keys(nav_link_children).map((key) => nav_link_children[key]);
                    links = {
                        label: nav_link_parent.label,
                        icon: nav_link_parent.icon,
                        links: nav_link_children_arr.map((elem: any, key: any) => {
                            try {
                                return { link: route(elem.link), label: elem.label };
                            } catch (error) {
                                return { link: '', label: elem.label };
                            }
                        }),
                        permission: [nav_link_parent.permission],
                    };
                }
            } else {
                links = {
                    label: nav_link_parent.label,
                    icon: nav_link_parent.icon,
                    link: route(nav_link_parent.link),
                    permission: [nav_link_parent.permission],
                };
            }
        } catch (error) {
            links = {
                label: nav_link_parent.label,
                icon: nav_link_parent.icon,
                link: '',
                permission: [nav_link_parent.permission],
            };
        }
        nav_link.push(links);
    });

    // auth.user.nav_link.map((element: any, key: any) => {
    //     let links = {};
    //     let is_json = true;
    //     if (element.link) {
    //         try {
    //             JSON.parse(element.link);
    //         } catch (e) {
    //             is_json = false;
    //         }
    //         if (is_json) {
    //             let link = JSON.parse(element.link);
    //             links = {
    //                 label: element.label,
    //                 icon: element.icon,
    //                 links: link.map((elem: any, key: any) => {
    //                     try {
    //                         return { link: route(elem.link), label: elem.label };
    //                     } catch (error) {
    //                         return { link: '', label: elem.label };
    //                     }
    //                 }),
    //                 permission: [element.permission],
    //             };
    //         } else {
    //             try {
    //                 links = {
    //                     label: element.label,
    //                     icon: element.icon,
    //                     link: route(element.link),
    //                     permission: [element.permission],
    //                 };
    //             } catch (error) {
    //                 links = {
    //                     label: element.label,
    //                     icon: element.icon,
    //                     link: '',
    //                     permission: [element.permission],
    //                 };
    //             }
    //         }
    //         nav_link.push(links);
    //     }
    // });
    // return auth.user.nav_link
    return nav_link;
}
