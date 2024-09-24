import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip,
    Radio,
    Stack
} from '@mantine/core';
import { IconPencil, IconKey, IconUsers } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable, ConfirmButton } from '@/Components';
import NavigationLinkEdit from './Components/NavigationLinkEdit';


export default function RolePage() {
    const { role, navigation_link } = usePage<any>().props;
    const { data, setData, post, put, reset, errors, setError } = useForm({
        id: role ? role.id : '',
        name: role ? role.name : '',
        id_navigation_children_link: role ? role.navigation_link_children.map((elem: any, index: any) => {
            return elem.id_navigation_link + "-" + elem.id
        }) : [],
        action: role ? role.action : ''
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        let id_role = document.getElementById('id_role') as HTMLInputElement;
        try {
            await post(route('role.updateorcreate'));
            // location.reload();
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    // var nav_link_children_arr = Object.keys(navigation_link).map((key) => navigation_link[key]);
    // console.log(navigation_link);
    // const navigation_data = navigation_link.map((elem: any, index: any) => {
    //     return { value: "" + elem.id + "", label: elem.label }
    // });

    let selection_data: any = [];
    Object.keys(navigation_link).forEach(key => {
        const value = navigation_link[key];
        let item: any = [];
        value.map((elem: any, id: any) => {
            item.push({ label: "" + elem.label + "", value: "" + elem.value + "" })
        })

        selection_data.push({ group: key, items: item });
    });

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppCard title={data.name}>
                    <Grid grow gutter="xs" >
                        <Grid.Col span={8}>
                            <TextInput
                                label="Name"
                                placeholder="Role Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            >
                            </TextInput>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <MultiSelect
                                label="Navigation Link"
                                placeholder="Choose Navigation Link"
                                data={selection_data}
                                // defaultValue={data.id_navigation_link}
                                defaultValue={data.id_navigation_children_link}
                                onChange={(e) => setData('id_navigation_children_link', e)}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Radio.Group
                                name="action"
                                label="Role Action"
                                description="Set the action allowed for this role"
                                withAsterisk
                                value={data.action}
                            >
                                <Group mt="xs" onChange={(e) => setData('action', e.target.value)}>
                                    <Radio value="1" label="All" />
                                    <Radio value="2" label="View Only" />
                                </Group>
                            </Radio.Group>
                        </Grid.Col>
                        <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TextInput type='hidden' id='id_role' value={data.id} />
                            <ConfirmButton
                                label="Submit"
                                type="submit"
                            />
                        </Grid.Col>
                    </Grid>
                </AppCard>
            </form>
        </>
    );

}

RolePage.layout = (page: any) => <AdminLayout back={true} children={page} title='Role View' />;