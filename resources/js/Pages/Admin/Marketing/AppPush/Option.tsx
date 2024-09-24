import { router, usePage } from '@inertiajs/react';
import { Paper, TextInput, rem, Group, Radio, FileButton, ActionIcon, Popover, NavLink, Tooltip, Text, Drawer, Flex, Image, Stack, Button, Select, SegmentedControl } from '@mantine/core';
import {
    IconDotsVertical,
    IconInfoCircle,
    IconAntennaBars3,
    IconBrandApple,
    IconBrandAndroid,
    IconX,
    IconClock
} from '@tabler/icons-react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable } from '@/Components';
import { data, exampleListData } from './values/listData';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from "@tabler/icons-react";
import {useEffect, useState} from 'react';
import { InternalBreadcrumbs } from '../Components/Index';
import {DateInput, DatesProvider, DateTimePicker, TimeInput} from '@mantine/dates';
import moment from 'moment';

export default function Option() {
    const { id, campaign } = usePage<any>().props;
    const { list, search } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);

    const [delivery, setDelivery] = useState();
    const lastUrl = data(id);

    const [dateTime, setDateTime] = useState<Date | null>(null);

    const handleDateTimeChange = (newDateTime: Date | null) => {
        setDateTime(newDateTime);
    };

    useEffect(() => {
        setDateTime(new Date(campaign.date));
        setDelivery(campaign.delivery);
        console.log(delivery);
    }, []);

    const submit = () => {


        const data = {
          id: id,
          delivery : delivery,
          date: formatDateToISO(dateTime)
        };
        console.log(data);
        router.post(route('app_notification.optionUpdate'), data, {
            onSuccess: (data) => {
                console.log(data)
                router.get('launch');
            }
        })
    }

    const formatDateToISO = (date : Date) => {
        const pad = (num:any) => String(num).padStart(2, '0');

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    return (
        <>
            <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>
                <InternalBreadcrumbs
                    data={data(id)}
                    rightsection={<Group gap={'xs'}>
                        <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
                        <Button size={'xs'} disabled={campaign.is_lock ? true : false} color='green' variant="filled" onClick={() => submit()}>Save & Next</Button>
                    </Group>} />
            </Paper>

            <Paper radius={'lg'} p={'lg'} withBorder>
                <Text fw={600} px={'md'}>Delivery time</Text>
                <Stack mt={'xs'} px={'md'}>
                    <Radio label="Right Now" value="1" color='green' checked={delivery == '1'} onChange={(e:any) => setDelivery(e.target.value)} disabled={campaign.is_lock == 1 ? true : false}
                    />
                    <Radio
                        label={delivery == '2' ?
                            <DatesProvider settings={{timezone: 'Asia/Kuala_Lumpur'}}>
                                <DateTimePicker
                                    label="In the Future"
                                    placeholder="Select date and time"
                                    valueFormat="DD MMM YYYY hh:mm A"
                                    value={dateTime}
                                    onChange={handleDateTimeChange}
                                    disabled={campaign.is_lock == 1 ? true : false}
                                />
                            </DatesProvider>
                            :
                            'In the Future'}
                        value="2" checked={delivery == '2'}
                        color='green'
                        onChange={(e:any) => setDelivery(e.target.value)}
                        pb={'xs'}
                        disabled={campaign.is_lock == 1 ? true : false}

                    />
                </Stack>
            </Paper>
        </>
    );

}

Option.layout = (page: any) => <AdminLayout children={page} title='Edit campaign option' />;
