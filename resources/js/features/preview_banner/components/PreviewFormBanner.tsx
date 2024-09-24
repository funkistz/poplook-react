import { useEffect } from 'react'
import { Group, Stack, Text, rem, Paper, TextInput, Textarea, Button, Select, Affix, NumberInput } from '@mantine/core'
import { IconClock, IconDeviceFloppy } from '@tabler/icons-react';
import { DateInput, TimeInput } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setShop } from '@/features/block_creator/redux/blockSlice';
import moment from 'moment';
import { router } from '@inertiajs/react';

function PreviewFormBanner({ data, setData, isFooter = false, primaryKey, api }: any) {

    const { block, shop } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const handleTimeChange = (event: any) => {
        const selectedTime = event.target.value;
        const [hours, minutes] = selectedTime.split(':');
        const updatedStartAt = new Date(data.start_at || new Date());

        // Set the time values
        updatedStartAt.setHours(parseInt(hours, 10));
        updatedStartAt.setMinutes(parseInt(minutes, 10));
        updatedStartAt.setSeconds(0);

        setData({ ...data, start_at: updatedStartAt })
    };

    const updateAPI = () => {
        try {
            const params = {
                name: data.name,
                description: data.description,
                data: JSON.stringify(block),
                start_at: data.start_at !== null ? moment(data.start_at).format('YYYY-MM-DD HH:mm:ss') : null,
                width: isFooter ? data.width : '',
                position: isFooter ? data.position : '',
            }

            router.put(api + primaryKey, params, { preserveScroll: true });
        } catch (error) {
            console.log('error :', error)
        } finally {

        }
    }

    const getTime = () => {
        if (data.start_at) {
            const date = new Date(data.start_at);
            return date.toTimeString().substring(0, 5);
        }

        return '';
    }

    return (
        <>
            <Stack>
                <Group justify='space-between'>
                    <Text fw={'bolder'} fz={20} tt='capitalize'>Edit Banner {data.name}</Text>
                    <Group justify='space-between'>
                        {block != null && block.length > 0 && <Select
                            size='xs'
                            // mr={10}
                            data={[
                                { value: '1', label: 'MYR' },
                                { value: '2', label: 'SGD' },
                                { value: '3', label: 'USD' },
                            ]}
                            onChange={(val) => dispatch(setShop(Number(val)))}
                            defaultValue={shop.toString()}
                        />}
                    </Group>
                </Group>
                <Group p={0} align='start' gap='xl'>
                    <Stack gap={0} miw={300}>
                        <TextInput
                            name='name'
                            placeholder="Name"
                            label={"Name"}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            size='xs'
                            maxLength={255}
                            required={true}
                        />
                        {data.name.length > 0 && <Text fz={10} mt={1} c={Number(data.name.length) < 235 ? "dimmed" : "red"}>{255 - Number(data.name.length)} characters remaining</Text>}

                        <Textarea
                            name='description'
                            placeholder="Description"
                            label="Description"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            size='xs'
                            autosize
                            minRows={isFooter ? 5 : 4}
                            maxRows={8}
                            required={true}
                            maxLength={255}
                        />
                        {data.description.length > 0 && <Text mt={0} fz={10} c={Number(data.description.length) < 235 ? "dimmed" : "red"}>{255 - Number(data.description.length)} characters remaining</Text>}
                    </Stack>
                    <Stack gap={0} miw={300}>
                        {data.start_at != null && <>
                            <DateInput
                                value={new Date(data.start_at)}
                                onChange={(e) => setData('start_at', e)}
                                minDate={new Date()}
                                size='xs'
                                label="Start at"
                                placeholder="Start at"
                                mb={5}
                            />
                            <TimeInput
                                value={getTime()}
                                size='xs'
                                onChange={handleTimeChange}
                                leftSection={<IconClock size="1rem" stroke={1.5} />}
                            />
                        </>}

                        {isFooter && <>
                            <NumberInput
                                name='width'
                                placeholder="width"
                                label={"Width"}
                                value={data.width}
                                onChange={(e) => setData({ ...data, width: e })}
                                size='xs'
                                max={100}
                                min={0}
                            />
                            <Select
                                label="Position"
                                placeholder="Position"
                                size={'xs'}
                                data={['top', 'center', 'bottom']}
                                value={data.position}
                                onChange={(e) => setData({ ...data, position: e })}
                            />
                        </>}
                    </Stack>
                </Group>
            </Stack>
            <Affix zIndex={100} position={{ bottom: rem(10), left: '50%' }}>
                <Paper shadow='xl' p={5} withBorder bg='orange.2' radius={'xl'}>
                    <Button size={'sm'} color='green' leftSection={<IconDeviceFloppy />} radius={'xl'} onClick={() => updateAPI()}>Save Changes</Button>
                </Paper>
            </Affix>
        </>
    )
}

export default PreviewFormBanner;
