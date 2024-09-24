import AdminLayout from '@/Components/layout/AdminLayout';
import {  usePage } from '@inertiajs/react';
import { Grid, Paper, Tabs } from '@mantine/core';
import { FormAddress, FormGroup, FormOrder, FormPassword, FormProfile, FormStore, FormVoucher } from './Components/Index';
import { useEffect, useRef, useState } from 'react';
import { usePrevious } from '@mantine/hooks';
import { useSessionStorage } from '@mantine/hooks';

export default function CustomerViewPage() {

    const { customer } = usePage<any>().props;

    const [value, setValue] = useSessionStorage({
        key: 'customer-tab',
        defaultValue: 'profile',
    });
  
    const getListGroup = (item: any) => {
        const idArray = item.map((obj: any) => obj.id_group.toString());
        return idArray;
    }

    return (
        <>
            <Tabs color="green" variant="outline" value={value} onChange={(e:any) => setValue(e)}>
                <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>
                    <Tabs.List>
                        <Tabs.Tab value="profile">
                            Profile
                        </Tabs.Tab>
                        <Tabs.Tab value="voucher">
                            Voucher
                        </Tabs.Tab>
                        <Tabs.Tab value="address" >
                            Address
                        </Tabs.Tab>
                        <Tabs.Tab value="order" >
                            Orders
                        </Tabs.Tab>
                    </Tabs.List>
                </Paper>
                <Tabs.Panel value="profile">
                    <Grid grow gutter="xs" >
                        <Grid.Col span={8}>
                            <FormProfile customer={customer} />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <FormPassword customer={customer} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <FormStore customer={customer} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <FormGroup customer={customer} group={getListGroup(customer.group)} />
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>

                <Tabs.Panel value="voucher">
                    <FormVoucher />
                </Tabs.Panel>

                <Tabs.Panel value="address">
                    <FormAddress id_shop={customer.id_shop} />
                </Tabs.Panel>

                <Tabs.Panel value="order">
                    <FormOrder />
                </Tabs.Panel>
            </Tabs>
        </>
    )
}

CustomerViewPage.layout = (page: any) => <AdminLayout children={page} title='Customer Detail' back={true} />;
