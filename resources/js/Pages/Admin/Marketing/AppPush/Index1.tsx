import { router, usePage } from '@inertiajs/react';
import { Group, rem, Progress, ActionIcon, Popover, NavLink, Tooltip, Text, Drawer, Badge, Image, Stack, Button, Menu } from '@mantine/core';
import { IconDotsVertical, IconInfoCircle, IconAntennaBars3, IconCopy, IconTrash } from '@tabler/icons-react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AddButton, AppCard, AppTable } from '@/Components';
import { exampleListData } from './values/listData';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from "@tabler/icons-react";
import { CreateForm, SeeDetails } from './Components/Index';
import { useState } from 'react';
import moment from "moment";
import getStatusMarketing from '@/features/helper/components/status';


export default function AppNotification() {
    const { list, search } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);
    const [newCamp, setnewCamp] = useState(false);
    const [details, setDetails] = useState<any>([]);


    const viewDetails = (id:any) => {
        open()
        list.data.map((res:any, i: any) => {
            if(id == res.id) {
                return setDetails(res)
            }
        })

        return []
    }

    const closeDetails = () => {
        setDetails([])
        close()
    }

    const onDelete = (id : string) => {
        const data = {
            uuid: id
        };

        router.post(route('control.delete'), data);
    }

    const onDuplicate = (id : string) => {
        const data = {
            uuid: id
        };

        router.post(route('control.duplicate'), data);
    }

    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any, index: any) => {
            const sendDate = value.start_date ? moment(value.start_date + ' ' +value.start_time) : moment(new Date());
            values.push({
                'status': getStatusMarketing(value.campaign_status),
                'name': <Text fz={14} onClick={() => router.get('app_notification/' + value.uuid + '/create')} style={{ cursor: 'pointer' }}>
                    {value.campaign_name}
                </Text>,
               'created on': moment(value.created_at).format('YYYY-MM-DD') + ' at ' + moment(value.created_at).format('hh:mm A'),
                'send date': value.start_time ? sendDate.format('YYYY-MM-DD') + ' at ' + sendDate.format('hh:mm A') : '',
                'action':
                    <Group justify='right' gap='xs'>
                        <Tooltip label="See Analytics" position="bottom">
                            <ActionIcon size={'lg'} variant="transparent" color="gray" aria-label="See Analytics">
                                <IconAntennaBars3 style={{ width: rem(30), height: rem(30), }} stroke={2.0} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="See Details" position="bottom">
                            <ActionIcon size={'lg'} variant="transparent" color="gray" aria-label="See Details" onClick={() => viewDetails(value.id)}>
                                <IconInfoCircle style={{ width: rem(20), height: rem(20), }} stroke={2} />
                            </ActionIcon>
                        </Tooltip>

                        <Menu trigger="hover" openDelay={100} shadow="md"  position="left-start" offset={-5}>
                            <Menu.Target>
                                <ActionIcon size={'lg'} variant="transparent" color="gray">
                                    <IconDotsVertical style={{ width: rem(20), height: rem(20), }} stroke={2} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item 
                                    onClick={() => onDuplicate(value.uuid)} 
                                    leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                    Duplicate
                                </Menu.Item>
                                <Menu.Item onClick={() => onDelete(value.uuid)} leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                    Delete
                                </Menu.Item>                       
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
            });
        })
        return values;
    }

    const titleDrawer = (title: any, desc: any = null) => {
        return <Stack gap={0} ml={'xs'}>
            <Text fz={26}>{title}</Text>
            {desc && <Text tt={'capitalize'} c={'dimmed'}>{desc}</Text>}
        </Stack>
    }

    return (
        <>
            <AppCard
                title='&nbsp;'
                rightComponent={
                    <Group justify="end">
                        <AddButton onClick={() => setnewCamp(true)} />
                    </Group>
                }>
                <AppTable
                    data={tableData(list.data)}
                    meta={list}
                    canSort={[{ label: 'created on', value: 'created_at' }]}
                    searchPlaceholder='Search by campaign name'
                />
            </AppCard>

            <Drawer opened={opened} onClose={closeDetails} title={titleDrawer(details?.campaign_name, details?.campaign_type)} position='right' size="lg" >
                <SeeDetails data={details} />
            </Drawer>

            <Drawer opened={newCamp} onClose={() => setnewCamp(false)} title={titleDrawer('Create Campaign')} position='right' size="md" >
                <CreateForm clicked={() => setnewCamp(false)} />
            </Drawer>
        </>
    );

}

AppNotification.layout = (page: any) => <AdminLayout children={page} title='App Notification' />;
