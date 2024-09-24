import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, createStyles, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip
} from '@mantine/core';
import {
    IconPencil, IconKey
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AdminLayout from '@/Components/layout/AdminLayout';


export default function EmployeePage() {
    const { category_list, search } = usePage<any>().props;

    const customHighlight = (data: any) => {
        if (search != null) {
            return <Highlight colo="green" highlight={search} children={data} />
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
            "name": "category",
            "label": "Category Name",
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

    const row = (res: any) => {
        return <>
            {res.map((res: any, index: any) => {
                return <tr key={index}>
                    <td align='center'>{(index + 1)}</td>
                    <td>{customHighlight(res.categories_lang[0].name)}</td>
                    <td>
                        {actionColumn(res)}
                    </td>
                </tr>
            })}
        </>
    }

    const setDialogEditFunc = (e: any) => {

    }

    const actionColumn = (e: any) => {
        {{ var link = '/category/' + e.id_category; }}
        return <>
            <Flex justify={'center'}>
                <Tooltip label="Edit">
                    <Link href={link}>
                        <IconPencil size="1.125rem" />
                    </Link>
                    {/* <ActionIcon variant="light" color='blue' mx={2} onClick={() => setDialogEditFunc(e)}>
                        <IconPencil size="1.125rem" />
                    </ActionIcon> */}
                </Tooltip>

            </Flex>
        </>
    }

    return (
        <>
            <AppDatatable
                data={category_list}
                head={header}
                row={row(category_list.data)}
            />
        </>
    );

}

EmployeePage.layout = (page: any) => <AdminLayout children={page} title='Category List' />;