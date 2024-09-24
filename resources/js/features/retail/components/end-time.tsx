import { DateTime } from '@/types';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Chip, Divider, Flex, Group, Modal, SegmentedControl, Space, Text, rem } from '@mantine/core'
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import moment from 'moment'
import { useEffect, useRef, useState } from 'react';

export default function EndTime({ opened, close, data, setData, reset, setLoading }: any) {

    const format = 'DD/MM/YYYY'

    const today = new Date(); // Current date
    const todayFormat = moment(today).format(format)

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormat = moment(yesterday).format(format)

    const lastTwoDay = new Date(today);
    lastTwoDay.setDate(lastTwoDay.getDate() - 2);
    const lastTwoDayFormat = moment(lastTwoDay).format(format)

    const [date, setDate] = useState<any>(data ? data : new Date());

    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );

    const handleDateChange = (data: any) => {
        const selectedDate = moment(data).format(format)
        const selectedTime = moment(date).format('HH:mm');
        const [hours, minutes] = selectedTime.split(':');
        const [day, month, year] = selectedDate.split('/');

        const updateDay = data;

        updateDay.setDate(Number(day));
        updateDay.setMonth(Number(month) - 1);
        updateDay.setFullYear(Number(year));

        updateDay.setHours(parseInt(hours, 10));
        updateDay.setMinutes(parseInt(minutes, 10));
        updateDay.setSeconds(0);
        
        setDate(updateDay)
        
    }

    const handleTimeChange = (event: any) => {
        const selectedTime = event.target.value;
        const [hours, minutes] = selectedTime.split(':');
        const updateTime = date

        // Set the time values
        updateTime.setHours(parseInt(hours, 10));
        updateTime.setMinutes(parseInt(minutes, 10));
        updateTime.setSeconds(0);

        setDate(new Date(updateTime))
    }

    const handleSubmit = async () => {

        const urlParams = new URLSearchParams(window.location.search);
        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${urlParams}`;
        const dates = date.toLocaleDateString();
        const times = date.toLocaleTimeString();
        const data = {
            dates: dates,
            times: times,
        };
        try {
            setLoading(true);
            await router.get(newUrl, data);
        } catch (error) {

        } finally {
            // setDate(null)
            close(false)
        }
    }

    const handleReset = () => {
        setDate(data ? data : new Date())
    }

    const handleClose = () => {
        close(false)
        handleReset()
    }


    return <Modal opened={opened} onClose={() => handleClose()} title={'End Time'} size={'md'} closeOnClickOutside={false} centered>
        <Text fz={14}>After specifying an end time below, only the sales before that time will be included in the current settlement</Text>

        <Space h={'xs'} />

        <Button.Group>
            <Button onClick={() => handleDateChange(lastTwoDay)} w={'100%'} variant={moment(date).format(format) === lastTwoDayFormat ? 'filled' : 'default'} color={'green'}>{lastTwoDayFormat}</Button>
            <Button onClick={() => handleDateChange(yesterday)} w={'100%'} variant={moment(date).format(format) == yesterdayFormat ? 'filled' : 'default'} color='green'>{yesterdayFormat}</Button>
            <Button onClick={() => handleDateChange(today)} w={'100%'} variant={moment(date).format(format) === todayFormat ? 'filled' : 'default'} color='green'>Today</Button>
        </Button.Group>

        <Space h={'xs'} />

        <TimeInput
            label={'Time'}
            ref={ref}
            rightSection={pickerControl}
            value={date ? date.toTimeString().substring(0, 5) : ''}
            onChange={(e) => handleTimeChange(e)}
        />

        <Space h={'xs'} />

        <Divider />

        <Space h={'xs'} />

        <Group gap={'xs'} justify={'end'}>
            <Button onClick={() => handleReset()} variant="subtle" color="gray">Reset</Button>
            <Button onClick={() => handleSubmit()} type='submit' color={'green'}>Set Time</Button>
        </Group>
    </Modal>
}
