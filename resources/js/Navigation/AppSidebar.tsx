import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem, NavLink, UnstyledButton, Avatar, Menu, ScrollArea } from '@mantine/core';
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
    IconUpload,
    IconBrandInertia,
    IconMenu,
    IconMenu2,
    IconMenuOrder,
    IconUser,
    IconSlideshow,
    IconCoin,
    IconChevronRight,
    IconUserUp,
    IconCategory,
} from '@tabler/icons-react';
import { usePage, Link, router } from '@inertiajs/react';
import { Aside } from '@mantine/core';

const data = [
    { link: route('admin.index'), label: 'Dashboard', icon: IconLayoutDashboard },
    { link: route('file_upload.index'), label: 'File Upload', icon: IconUpload },
    {
        label: 'Banner Setting', icon: IconSlideshow, initiallyOpened: true,
        links: [
            { link: route('desktop_banner.index'), label: 'Desktop Banner' },
            { link: route('mobile_banner.index'), label: 'Mobile Banner' },
            { link: route('desktop_top_banner.index'), label: 'Desktop Top Banner' },
            { link: route('mobile_top_banner.index'), label: 'Mobile Top Banner' },
            { link: route('desktop_countdown_banner.index'), label: 'Desktop Countdown Banner' },
            { link: route('mobile_countdown_banner.index'), label: 'Mobile Countdown Banner' },



        ],
    },
    {
        label: 'Menu Setting', icon: IconMenu2, initiallyOpened: true,
        links: [
            { link: route('desktop_menu.index'), label: 'Desktop Menu', },
            { link: route('mobile_menu.index'), label: 'Mobile Menu', },
        ],
    },
    { link: route('configuration_setting.index'), label: 'Configuration Setting', icon: IconSettings },
    { link: route('customer.index'), label: 'Customer List', icon: IconUsers },
    { link: route('order.index'), label: 'Order List', icon: IconCoin },
    { link: route('employee.index'), label: 'Employee List', icon: IconBookmarks },
    { link: route('group.index'), label: 'Group List', icon: IconUsers },
    { link: route('category.index'), label: 'Category List', icon: IconCategory },

    // { link: route('customer.index'), label: 'Customers', icon: IconUsers },
    // {
    //     label: 'Configs', icon: IconSettings, initiallyOpened: true,
    //     links: [
    //         { label: 'Brand', link: route('brand.index') },
    //         { label: 'Color', link: route('color.index') },
    //         { label: 'Supplier', link: route('supplier.index') },
    //         { label: 'Entity', link: route('entity.index') },
    //         { label: 'Expense Type', link: route('expenseType.index') },
    //         { label: 'Expense Category', link: route('expenseCategory.index') },
    //     ],
    // },
    // { link: 'dashboard', label: 'Seller Price List', icon: IconListDetails },
    { link: route('loyalty.index'), label: 'Loyalty List', icon: IconUserUp },
];

const visit = (url: any) => {
    if (url) router.get(url)
}

function AppSideBar({ styles }: any) {

    const { classes, cx } = useStyles();
    const { url, component } = usePage()

    const links = data.map((item: any, index) => (
        <NavLink
            key={index}
            label={item.label}
            icon={<item.icon className={classes.linkIcon} stroke={1.5} />}
            onClick={() => visit(item.link ? item.link : null)}
            active={item.link && window.location.pathname.replace(/^\/([^\/]*).*$/, '$1') == item.link.split('/')[3]}
            className={classes.link}
            variant="filled"
            color='primary.7'
            defaultOpened={item.links && item.links.some((e: any) => e.link == window.location.href.split('?')[0])}
        >
            {item.links && item.links.map((children: any, index2: any) => {
                return <NavLink
                    key={index + '-' + index2}
                    label={children.label}
                    onClick={() => visit(children.link)}
                    active={window.location.pathname.replace(/^\/([^\/]*).*$/, '$1') == children.link.split('/')[3]}
                    className={classes.link}
                    variant="filled"
                    color='primary.7'

                />;
            })}
        </NavLink>
    ));

    return (
        // <Aside>
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar} style={styles}>
            <Navbar.Section grow component={ScrollArea}>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {/* <Link href="/admin/logout" method="post" className={classes.link}>
                    <IconUserCircle className={classes.linkIcon} stroke={1.5} />
                    <span>Profile</span>
                </Link> */}
                {/* <Link href="/logout" method="post" as="button">Logout</Link> */}
                <Link href="/admin/logout" method="post" className={classes.link}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </Link>
            </Navbar.Section>

            {/* <Menu position="right">
                <Menu.Target>
                    <UnstyledButton>
                        <Group>
                            <Avatar
                                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                                radius="xl"
                            />

                            <div style={{ flex: 1, lineHeight: 0.5 }}>
                                <p style={{ fontSize: 13 }}>Harriette Spoonlicker</p>
                                <p style={{ fontSize: 12 }}>hspoonlicker@outlook.com</p>
                            </div>

                            <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown w={'100%'}>
                    <Menu.Item icon={<IconLogout size={rem(14)} />}>
                        Search
                    </Menu.Item>


                </Menu.Dropdown>
            </Menu> */}

        </Navbar>
        // </Aside>
    );
}

export default AppSideBar;

const useStyles = createStyles((theme) => ({
    navbar: {
        // backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    },
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.dark[6],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: 6,
        fontWeight: 500,

        '&:hover': {
            // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            // color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
        '&:[data-active=true]': {
            // backgroundColor: '#2b2627',
            // '&:hover': {
            //     backgroundColor: '#2b2627',
            // }
        }
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        // color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    // linkActive: {
    //     '&, &:hover': {
    //         color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    //         [`& .${getStylesRef('icon')}`]: {
    //             color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    //         },
    //     },
    // },
}));