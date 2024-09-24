import { router, usePage } from '@inertiajs/react';
import { Paper, TextInput, rem, Group, Alert, FileInput, FileButton, ActionIcon, Popover, NavLink, Tooltip, Text, Table, Drawer, Flex, Image, Stack, Button, Select, SegmentedControl } from '@mantine/core';
import { IconDotsVertical, IconInfoCircle, IconAntennaBars3, IconBrandApple, IconBrandAndroid, IconX } from '@tabler/icons-react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable } from '@/Components';
import { data, exampleListData } from './values/listData';
import { useDisclosure } from '@mantine/hooks';
import { InternalBreadcrumbs } from '../Components/Index';
import {useEffect, useState} from "react";

export default function ReviewAndLaunch() {
    const { id, campaign } = usePage<any>().props;
    const { list, search } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);
    const lastUrl = data(id);
    const [name, setName] = useState();
    const [loading, setLoading] = useState<boolean>(false)

    const launch = () => {

        const data = {
            id:id
        }
        router.post(route('app_notification.launchUpdate'), data, {
            preserveState: true,
            preserveScroll: true,
            onStart: () => {
                setLoading(true)
            },
            onSuccess: () => {
                router.get('/app_notification');
            },
            onFinish:() => {
                setLoading(false)
            }
        });
    }

    function getCurrentTimePlus5Minutes() {
        const now = new Date();

        // Add 5 minutes
        now.setMinutes(now.getMinutes() + 10);

        // Get hours and minutes
        let hours:any = now.getHours();
        let minutes:any = now.getMinutes();

        let date = now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate();
        // Pad with leading zeros if needed
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');

        // Return in HH:MM format
        return `${date} ${hours}:${minutes}:00`;
    }

    return (
        <>
            <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>
                <InternalBreadcrumbs
                    data={data(id)}
                    rightsection={<Group gap={'xs'}>
                        <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
                        <Button size={'xs'} variant="outline" color={'green'}disabled={campaign.is_lock ? true : false} >Save as draft</Button>
                        {/* <Button size={'xs'} variant="filled" color={'green'} disabled={loading || campaign.is_lock ? true : false} onClick={() => launch()}>Launch</Button> */}
                        <Button size={'xs'} variant="filled" color={'green'} onClick={() => launch()}>Launch</Button>
                    </Group>} />
            </Paper>

            <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>
                <Flex justify={'space-between'}>
                    <Stack gap={0} w={'50%'} px={'xl'} py={'xs'} style={{ borderRight: '1px solid #dee2e6' }}>
                        <Text mb={'xs'} fw={600}>Campaign Name</Text>
                        <TextInput
                            label={'Name Your Campaign'}
                            placeholder='Enter Campaign Name'
                            mt={'xs'}
                            value={campaign.campaign_name}
                            disabled={true}
                        />
                    </Stack>
                    <Stack gap={0} w={'50%'} px={'xl'} py={'xs'}>
                        <Text mb={'xs'} fw={600}>Campaign Overview</Text>
                        <Table withRowBorders={false}>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td w={'20%'}>
                                        <Text fw={500}>Whos:</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Text>All People</Text>
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>
                                        <Text fw={500}>What:</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Text>Control Group (0%)</Text>
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>
                                        <Text fw={500}>When:</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Text>{campaign.activation_status == "send later" && campaign.start_date +' '+campaign.start_time} {campaign.activation_status == "send now" && getCurrentTimePlus5Minutes()} </Text>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Stack>
                </Flex>
            </Paper>
        </>
    );

}

ReviewAndLaunch.layout = (page: any) => <AdminLayout children={page} title='Review and Lauch' />;
