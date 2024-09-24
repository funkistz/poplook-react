import { ActionIcon, Box, Button, Flex, Group, NumberFormatter, Paper, Skeleton, Stack, Text, rem } from '@mantine/core';
import { AppCard, AppTable } from '@/Components';
import { Link } from '@inertiajs/react';
import { getCurrency } from '@/features/helper/Index';


export default function CardTable({ options, data = [] }: any,) {


    const tableData = (data: any[]) => {
        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'ID': value.id_order,
                'Customer Name': value.customer?.firstname + ' ' + value.customer?.lastname,
                'Status': value.orderstatelang?.name ? value.orderstatelang?.name : '-',
                'Total': <NumberFormatter
                    value={value.total_paid}
                    prefix={value?.id_shop ? getCurrency(value?.id_shop) : ''}
                    thousandSeparator
                />,
                'action':
                    <Group justify='right' gap='xs'>
                        <Link href={route('order.show', { id: value.id_order })}>
                            <Button size='xs' color={'green'}>View</Button>
                        </Link>
                    </Group>
            });
        })
        return values;
    }

    return <>
        <AppCard title={options?.title ? options?.title : '' } options={{ h: options?.h ? options?.h : '100%' }}>
            {data != null ? 
                <AppTable
                    data={tableData(data)}
                />
                :
                <>
                    <Skeleton h={30} mt={'xs'} />
                    <Skeleton h={30} my={'xs'}/>
                    <Skeleton h={30} my={'xs'}/>
                    <Skeleton h={30} my={'xs'}/>
                    <Skeleton h={30} my={'xs'}/>
                    <Skeleton h={30} />
                </>}
        </AppCard>
    </>
}
