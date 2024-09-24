import { PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Paper, Text, Container, AppShell, Group } from '@mantine/core';
import { Head, usePage } from '@inertiajs/react';
import classes from './GuestLayout.module.css';
import { GuestNavbar } from '../navigation/GuestNavbar';
import { useHeadroom } from '@mantine/hooks';
import { GuestFooter } from '../navigation/GuestFooter';

export default function Guestlayout({ title = null, children }: any) {

    const pinned = useHeadroom({ fixedAt: 120 });

    return (
        <>
            <AppShell
                header={{ height: 70, collapsed: !pinned, offset: false }}
                footer={{ height: 50, collapsed: false }}
                // p='lg'
                // navbarOffsetBreakpoint="sm"
                // asideOffsetBreakpoint="sm"
                // navbar={
                //     <AppSideBar></AppSideBar>
                // }
                styles={{
                    main: {
                        paddingTop: 'calc(var(--mantine-header-height, 0px))',
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                }}
                className={classes.app}
            >
                {/* <Head title={title} /> */}
                <AppShell.Header >
                    <GuestNavbar></GuestNavbar>
                </AppShell.Header>
                <AppShell.Main mt={70}>
                    <Container fluid px={0}>
                        {children}
                    </Container>
                    <GuestFooter />

                </AppShell.Main>
                {/* <AppShell.Footer p="md">
                </AppShell.Footer> */}
            </AppShell>
        </>
    );
}