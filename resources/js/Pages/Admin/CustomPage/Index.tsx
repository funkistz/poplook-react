import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton, UpdateButton, AppSwitch } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import SimpleForm from './SimpleForm';

export default function Index() {

    const { customPages }: any = usePage().props;

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.name,
                'url': value.url,
                'description': value.description,
                'active': <>
                    <AppSwitch size='md' onLabel="Active" offLabel="Inactive" checked={value.active == 1} onChange={(e: any) => { console.log('e', e.target.checked); toggleActive(value.id, e.target.checked) }} />
                </>,
                'action':
                    <Group justify='right' gap='xs'>
                        <UpdateButton link={route('custom_page.show', value.id)} />
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                    </Group>
            });
        })
        return values;
    }
    const headerOptions = {
        'action': { ta: 'left' }
    }

    const toggleActive = (id: any, state: any) => {
        router.put(route('custom_page.update', id), {
            active: state,
        });
    }

    const onDelete = (id: any) => {
        // router.delete(route('branches.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Custom Pages' rightComponent={
                    <AddButtonModal title='Add Custom Page' >
                        <SimpleForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(customPages.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Custom Page' />;