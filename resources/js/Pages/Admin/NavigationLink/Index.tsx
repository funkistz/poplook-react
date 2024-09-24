import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip, List
} from '@mantine/core';
import { IconPencil, IconKey, IconUsers } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AddButton, AppCard, AppTable, DeleteButton, UpdateButton } from '@/Components';
import NavigationLinkEdit from './Components/NavigationLinkEdit';
import * as Icons from '@tabler/icons-react';


export default function NavigationLinkPage() {
    const { list, search } = usePage<any>().props;
    const [dialogPass, setDialogPass] = useState<boolean>(false);
    const [dialogEdit, setDialogEdit] = useState<boolean>(false);
    const [id, setId] = useState<any>(null);
    const [checked, setChecked] = useState(false);

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

        return <IconComponent style={{ width: '25%', height: '25%' }} stroke={1.5} />;
    };

    const activeChecked = async (elem: any, id: any) => {
        const params = {
            id: id,
            active: elem
        }
        // router.patch(route('navigation_link.updatestatus'), params);

        await router.post('navigation_link/update_status', params);
    }

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any, key: any) => {
            let role_name = '';
            let role_list = value.role.map((elem: any, id: any) => {
                if (role_name !== elem.name) {
                    role_name = elem.name;
                    return <List.Item key={id}>{elem.name}</List.Item>
                }
            })
            let link = value.link;
            let link_res: any = '';
            try {
                link = value.navigation_link_children;
                link_res = link.map((elem: any, id: any) => {
                    return <List.Item key={id}>{elem.label}</List.Item>
                });
            } catch (e) {
                link_res = <List.Item>{value.label}</List.Item>;
            }
            values.push({
                'name': value.label,
                'icon': <DynamicIcon name={value.icon} />,
                'role': <List>{role_list}</List>,
                'link': (link_res) ? <List>{link_res}</List> : '',
                'active': <Switch
                    checked={value.active}
                    onLabel="Active" offLabel="Inactive"
                    radius="sm"
                    size={'md'}
                    onChange={(e) => activeChecked(e.target.checked, value.id)}
                />,
                'action':
                    <Flex justify='left' gap='xs'>
                        <UpdateButton iconOnly={true} link={route('navigation_link.show', { id: value.id })}></UpdateButton>
                        <DeleteButton iconOnly={true} onDelete={() => onDelete(value.id)}></DeleteButton>
                    </Flex>
            });
        })
        return values;
    }

    const onDelete = (id:any) => {
        router.delete(route('navigation_link.destroy', id));
    }

    return (
        <>
            <AppCard title='Navigation Link' rightComponent={<AddButton link={route('navigation_link.create')}></AddButton>}>
                <AppTable
                    data={tableData(list.data)}
                    // meta={list}
                    canSort={[{ label: 'Label', value: 'label' }]}
                    searchPlaceholder='Search by name or email'
                />
            </AppCard>
        </>
    );

}

NavigationLinkPage.layout = (page: any) => <AdminLayout children={page} title='Navigation Link List' />;