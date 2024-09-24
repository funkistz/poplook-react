import { router, usePage } from '@inertiajs/react';
import { Group, rem, Progress, ActionIcon, Popover, NavLink, Tooltip, Text, Drawer, Badge, Image, Stack, Button } from '@mantine/core';
import { IconDotsVertical, IconInfoCircle, IconAntennaBars3 } from '@tabler/icons-react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable } from '@/Components';
import { exampleListData } from './values/listData';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from "@tabler/icons-react";
import { CreateForm, SeeDetails } from './Components/Index';
import { useState } from 'react';



export default function AppNotification() {
    const { list, search } = usePage<any>().props;
    const url = 'whatsapp';
    const [opened, { open, close }] = useDisclosure(false);
    const [newCamp, setnewCamp] = useState(false);

    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any, index: any) => {
            values.push({
                'status': <Badge variant="light" color="blue">{value.status}</Badge>,
                'ID': value.id,
                'name': <Text onClick={() => router.get(url + '/' + index + '/segment')} style={{ cursor: 'pointer' }}>
                    {value.name}
                </Text>,
                'created on': value.starts_on,
                'send date': value.ends_on,
                'tag': value.tag,
                'action':
                    <Group justify='right' gap='xs'>
                        <Tooltip label="See Analytics" position="bottom">
                            <ActionIcon size={'lg'} variant="transparent" color="gray" aria-label="See Analytics">
                                <IconAntennaBars3 style={{ width: rem(30), height: rem(30), }} stroke={2.0} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="See Details" position="bottom">
                            <ActionIcon size={'lg'} variant="transparent" color="gray" aria-label="See Details" onClick={open}>
                                <IconInfoCircle style={{ width: rem(20), height: rem(20), }} stroke={2} />
                            </ActionIcon>
                        </Tooltip>

                        <Popover width={200} position="left-start" shadow="md">
                            <Popover.Target>
                                <ActionIcon size={'lg'} variant="transparent" color="gray" aria-label="Settings">
                                    <IconDotsVertical style={{ width: rem(20), height: rem(20), }} stroke={2} />
                                </ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown p={0}>
                                <NavLink label="Duplicate" />
                                <NavLink label="Edit Tags" />
                                <NavLink label="Delete" />
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
            });
        })
        return values;
    }

    const titleDrawer = (title: any, desc: any = null) => {
        return <Stack gap={0} ml={'xs'}>
            <Text fz={26}>{title}s</Text>
            {desc && <Text c={'dimmed'}>{desc}</Text>}
        </Stack>
    }

    return (
        <>
            <AppCard
                title='&nbsp;'
                rightComponent={
                    <Group justify="end">
                        <Button
                            size="xs"
                            leftSection={<IconPlus />}
                            onClick={() => setnewCamp(true)}
                        >
                            Create
                        </Button>
                    </Group>
                }>
                <AppTable
                    data={tableData(exampleListData.data)}
                    meta={exampleListData}
                    canSort={[{ label: 'created on', value: 'firstname' }, { label: 'send date', value: 'email' }]}
                    searchPlaceholder='Search by name or email'
                />
            </AppCard>

            <Drawer opened={opened} onClose={close} title={titleDrawer('230124 Kelopak P1', 'Single')} position='right' size="lg" >
                <SeeDetails />
            </Drawer>

            <Drawer opened={newCamp} onClose={() => setnewCamp(false)} title={titleDrawer('Create Campaign')} position='right' size="md" >
                <CreateForm clicked={() => setnewCamp(false)} />
            </Drawer>
        </>
    );

}

AppNotification.layout = (page: any) => <AdminLayout children={page} title='WhatsApp' />;
