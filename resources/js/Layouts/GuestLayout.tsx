import { PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, usePage } from '@inertiajs/react';
import { notifications } from '@mantine/notifications';

interface GuestLayoutProps {
    header?: string | null;
    description?: string | ReactNode | null;
}

export default function Guest({ description = null, header = null, children }: PropsWithChildren<GuestLayoutProps>) {

    const { flash }: any = usePage().props;
    console.log('flash', flash);

    flash && flash.message && notifications.show({
        // title: 'Default notification',
        message: flash.message,
        color: ((flash.type == 'error') ? 'red' : 'green')
    })

    return (
        <>{children}</>
    );
}
