import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, createStyles, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip
} from '@mantine/core';
import {
    IconPencil, IconKey, IconEye
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AddButton, AppCard, AppTable } from '@/Components';


export default function CustomerGroup() {
    const { list, search } = usePage<any>().props;

    const customHighlight = (data: any) => {
        if (search != null) {
            return <Highlight highlightColor="green" highlight={search} children={data} />
        }
        return data;
    }
    // Components
    const header = [
        {
            "name": "no",
            "label": "No",
            "align": true,
            "width": 60,
            "sort": true
        },
        {
            "name": "name",
            "label": "Name",
            "align": false,
            "width": null,
            "sort": true
        },
        {
            "name": "action",
            "label": "Action",
            "align": false,
            "width": '10%',
            "sort": false
        },
    ]

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.group_lang.name,
                'action':
                    <Flex justify='left' gap='xs'>
                        <Link href={route('customer_group.show', { id: value.id_group })}>
                            {/* <Button size='xs'>View</Button> */}
                            <ActionIcon>
                                <IconPencil></IconPencil>
                            </ActionIcon>
                        </Link>
                        {/* <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButton link={route('custom_page.show', value.id)} /> */}
                    </Flex>
            });
        })
        return values;
    }
    const headerOptions = {
        'action': { width: '10%', ta: 'center' }
    }

    return (
        <>
            <AppCard title={'Customer Group'} rightComponent={<AddButton link={route('customer_group.create')}></AddButton>}>
                <AppTable
                    meta={list}
                    head={header}
                    headerOptions={headerOptions}
                    data={tableData(list.data)}
                />
            </AppCard>
        </>
    );

}

CustomerGroup.layout = (page: any) => <AdminLayout children={page} title='Category List' />;