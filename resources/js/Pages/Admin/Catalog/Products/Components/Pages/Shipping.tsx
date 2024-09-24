import { AppCard } from '@/Components';
import { Alert, Box, Group, Paper, Space, Text, rem } from '@mantine/core';
import { IconInfoCircle, IconListSearch } from '@tabler/icons-react';
import cx from 'clsx';

export default function Shipping({ current, setCurrent }: any) {

    return <>
        <AppCard title='Shipping'>
            <Alert variant="light" color="blue" icon={<IconInfoCircle />}>
                You must enter either the pre-tax retail price, or the retail price with tax. The input field will be automatically calculated.
            </Alert>
        </AppCard>
    </>;
}
