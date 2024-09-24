import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip, List, SelectProps,
    Checkbox
} from '@mantine/core';
import { IconPencil, IconKey, IconUsers } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AddButton, AppCard, AppTable } from '@/Components';
import NavigationLinkEdit from './Components/NavigationLinkEdit';
import * as Icons from '@tabler/icons-react';
import NavigationLinkChildren from './Components/NavigationLinkChildren';

export default function NavigationLinkViewPage() {
    const { navigation, role, create } = usePage<any>().props;
    const [nav, setNav] = useState<any>();
    const { data, setData, post, put, reset, errors, setError } = useForm({
        id: navigation ? navigation.id : '',
        label: navigation ? navigation.label : 'New Navigation Link',
        icon: navigation ? navigation.icon : '',
        link: navigation ? navigation.link : '',
        single_link: navigation ? navigation.link ? true : false : false
    });
    const [iconList, setIconList] = useState<any>([]);
    const permData = role.map((elem: any, index: any) => {
        return { value: "" + elem.value + "", label: elem.label }
    });
    useEffect(() => {
        let nav_id = (navigation) ? navigation.id : '';
        setData('id',nav_id);
    }, [navigation])
    console.log([data, nav]);

    /* Your icon name from database data can now be passed as prop */
    const DynamicIcon = ({ name }) => {
        const IconComponent = Icons[name];

        if (!IconComponent) { // Return a default one
            return <></>;
        }

        return <IconComponent style={{ width: '70%', height: '70%' }} stroke={1.5} />;
    };

    // useEffect(() => {
    //     let icon_list: any = [];
    //     (Object.entries(Icons) || []).map(([key, value]) => {
    //         icon_list.push(key);
    //         setIconList(icon_list);
    //     })
    //     console.log(getIconList());
    // }, [data.icon])

    function getIconList() {
        let icon_list: any = [];
        (Object.entries(Icons) || []).map(([key, value]) => {
            icon_list.push(key);
            // setIconList(icon_list);
        })
        return icon_list;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        let id_navigation_link = document.getElementById('id_navigation_link') as HTMLInputElement;
        try {
            await post(route('navigation_link.updateorcreate'));
            // if (create) {
            //     location.reload();
            // }
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }


    function LinkJson(data: any) {
        let link = data.data;
        let link_json = '';
        try {
            link_json = JSON.parse(link);
            return <JsonInput
                label="Link"
                placeholder="Textarea will autosize to fit the content"
                validationError="Invalid JSON"
                formatOnBlur
                autosize
                value={link}
                minRows={4}
                onChange={(e) => setData('link', e)}
            />
        } catch (error) {
            return <TextInput
                label="Link"
                placeholder="Link"
                value={link}
                onChange={(e) => setData('link', e.target.value)}
            ></TextInput>
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppCard title={data.label}>
                    <Grid grow gutter="xs" >
                        <Grid.Col span={8}>
                            <TextInput
                                label="Label"
                                placeholder="navigation label"
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                            >
                            </TextInput>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Select
                                label="Icon"
                                placeholder="Select Icon"
                                // description={<DynamicIcon name={data.icon} />}
                                // data={['IconLayoutDashboard','IconWalk']}
                                limit={100}
                                leftSection={<DynamicIcon name={data.icon} />}
                                searchable={true}
                                // data={iconList}
                                data={getIconList()}
                                value={data.icon}
                                onChange={(e) => setData('icon', e)}
                            />
                        </Grid.Col>
                        {data.single_link &&
                            <Grid.Col span={8}>
                                <TextInput
                                    label="Custom Link"
                                    description="Custom Link are used if you are directing to link other then default, no need to keyin link if default."
                                    placeholder="Custom Link"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                >
                                </TextInput>
                            </Grid.Col>
                        }
                        <Grid.Col span={8}>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Checkbox
                                label="Single Link"
                                checked={data.single_link}
                                // value={data.single_link}
                                onChange={(e) => setData('single_link', e.target.checked)}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput type='hidden' id='id_navigation_link' value={nav} />
                            <Button color='green' style={{ float: 'right' }} type='submit'>submit</Button>
                        </Grid.Col>
                    </Grid>
                </AppCard>
            </form>
            {!create && !data.single_link &&
                <NavigationLinkChildren label={data.label} />
            }
        </>
    );

}

NavigationLinkViewPage.layout = (page: any) => <AdminLayout back={true} children={page} title='Navigation Link View' />;