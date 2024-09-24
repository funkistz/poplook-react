import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip
} from '@mantine/core';
import { IconPencil, IconNavigation, IconKey, IconUsers } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AddButton, AppCard, AppTable, DeleteButton, UpdateButton } from '@/Components';
import NavigationLinkEdit from './Components/NavigationLinkEdit';
import * as Icons from '@tabler/icons-react';


export default function RolePage() {
    const { list, search } = usePage<any>().props;
    const [dialogPass, setDialogPass] = useState<boolean>(false);
    const [dialogEdit, setDialogEdit] = useState<boolean>(false);
    const [id, setId] = useState<any>(null);

    const customHighlight = (data: any) => {
        if (search != null) {
            return;
            // return <Highlight highlightColor="green" highlight={search} children={data} />
        }

        return data;

    }
    /* Your icon name from database data can now be passed as prop */
    const DynamicIcon = ({ name }) => {
        const IconComponent = Icons[name];

        if (!IconComponent) { // Return a default one
            return <></>;
        }

        return <IconComponent />;
    };

    const headerOptions = {
        'action': { width: '10%', ta: 'center' }
    }

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.name,
                'action':
                    <Flex justify='left' gap='xs'>
                        {/* <ActionIcon variant="light" color='blue' mx={2} data-id={value.id}>
                            <Link href={route('role.show', { id: value.id })}>
                                <IconPencil></IconPencil>
                            </Link>
                        </ActionIcon> */}
                        <UpdateButton iconOnly={true} link={route('role.show', { id: value.id })}></UpdateButton>
                        <DeleteButton iconOnly={true} onDelete={() => onDelete(value.id)}></DeleteButton>

                        <Link href={route('navigation_link.index')}>
                            <IconNavigation></IconNavigation>
                        </Link>
                    </Flex>
            });
        })
        return values;
    }

    const onDelete = (e:any) => {
        router.delete(route('role.destroy', e));
    }

    return (
        <>
            <AppCard title='Role' rightComponent={<AddButton link={route('role.create')}></AddButton>}>
                <AppTable
                    data={tableData(list.data)}
                    // meta={list}
                    headerOptions={headerOptions}
                    canSort={[{ label: 'Label', value: 'label' }]}
                    searchPlaceholder='Search by name or email'
                />
            </AppCard>
        </>
    );

}

RolePage.layout = (page: any) => <AdminLayout children={page} title='Role List' />;