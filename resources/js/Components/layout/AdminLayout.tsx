import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { notifications } from '@mantine/notifications';
import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppNavbar, AdminHeader } from '@/features/app-navigation';
import AppTitleWithBreadcrumbs from '@/features/app-navigation/components/AppTitleWithBreadcrumbs';
import '@mantine/tiptap/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/charts/styles.css';
import AppAffix from '@/features/app-navigation/components/AppAffix';

export default function AdminLayout({ children, title, breadcrumbs = [], back = false }: { children: any, title: string, breadcrumbs?: any, back?: boolean }) {

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const { flash, auth }: any = usePage().props;

    const user = auth?.user ? auth.user: null;

    useEffect(() => {


        if (flash && flash.message) {
            console.log('flash', flash);
            notifications.show({
                // title: 'Default notification',
                message: flash.message,
                color: ((flash.type == 'error') ? 'red' : 'green')
            })
        }

    }, [flash]);

    return (
        <AppShell
            withBorder={false}
            header={{ height: 70 }}
            navbar={user.id_role !== 0 ? {
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            } : undefined}
            padding="md"
            bg={'#f4f3f3'}
            mih={'100vh'}
        >
            <AppShell.Header bg={'#f4f3f3'}>
                <AdminHeader title={title} breadcrumbs={breadcrumbs} toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} mobileOpened={mobileOpened} desktopOpened={desktopOpened} />
            </AppShell.Header>
            {user?.id_role !== 0 && <AppShell.Navbar p={'md'} >
                <AppNavbar toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} />
            </AppShell.Navbar>}
            <AppShell.Main>
                <Box px={'md'} pt={10}>
                    <AppTitleWithBreadcrumbs back={back} title={title} />
                    {children}

                    <AppAffix />
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}