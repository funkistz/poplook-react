import {
    AppShell,
    Title,
} from '@mantine/core';
import { Head, usePage } from '@inertiajs/react';
import { notifications } from '@mantine/notifications';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function AppLayout({ children, title, hidden, aside, sideBarShow = true }: any) {

    const { flash }: any = usePage().props;

    if (flash && flash.message) {
        notifications.show({
            // title: 'Default notification',
            message: flash.message,
            color: ((flash.type == 'error') ? 'red' : 'green')
        })
    }

    return (
        <DashboardLayout>
            <Head title={title} />
            <Title order={2} size="h3" mb='lg'>{title}</Title>
            {children}
        </DashboardLayout>
    );
}