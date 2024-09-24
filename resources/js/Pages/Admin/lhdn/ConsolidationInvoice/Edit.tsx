import { AppCard, ConfirmButton, } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { Button, Flex, Group, Menu, NumberFormatter, rem, Select, Table, Text } from '@mantine/core';
import { router, useForm, usePage } from '@inertiajs/react';
import { IconChevronDown, IconFileSpreadsheet, IconFileTypeCsv } from '@tabler/icons-react';
import { useDidUpdate } from '@mantine/hooks';
import { useState } from 'react';
import { ButtonWithMenu, CustomTableLhdn } from './Components/Index';

export default function ConsolidationInvoicePage() {

    const { list } = usePage<any>().props;

    const currency = 'RM';
    const subtotal = list.reduce((sum:any, item:any) => sum + item.amount, 0);
    const total_tax = 0;
   

    const details = {
        'currency': currency,
        'subtotal': list.reduce((sum:any, item:any) => sum + item.amount, 0),
        'excld_tax': subtotal,
        'total_tax': total_tax,
        'total': subtotal + total_tax,
    }


    const { data, setData, post, put, get, reset, errors } = useForm({
        id: 1,
        filename: 'test',
    });

    const submit = async () => {
        router.put(`/consolodation-invoice/${data.id}`, data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                router.get('/consolodation-invoice')
            },
        })
    }
    

    return <>
        <AppCard 
            title='Edit June 2025' 
            rightComponent={
                <Group gap={'xs'}>
                    <ButtonWithMenu data={data} />
                    <ConfirmButton
                        label={'Submit'}
                        title={'Are you sure you want to submit e-invoice to LHDN'}
                        onConfirm={() => submit()}
                        onOpen={() => console.log()}
                    />
                </Group>
            }>
            <CustomTableLhdn data={list}details={details} />
        </AppCard>
    </>
}

ConsolidationInvoicePage.layout = (page: any) => <AdminLayout children={page} title='Consolidation Invoice' back />;
