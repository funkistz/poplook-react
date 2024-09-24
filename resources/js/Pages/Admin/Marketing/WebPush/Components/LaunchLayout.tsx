import {  Stack, Text, Group, Radio, Divider, NumberInput, Tooltip, MultiSelect, Textarea, Flex, ActionIcon, rem, TextInput, Select, Space } from "@mantine/core";
import { AppCard } from "@/Components";
import { IconClock, IconInfoCircle } from "@tabler/icons-react";
import { DateInput, TimeInput } from "@mantine/dates";
import { useRef } from "react";
import moment from "moment";
import { usePage } from "@inertiajs/react";

function LaunchLayout({form}:any) {

    const ref = useRef<HTMLInputElement>(null);
    const { campaign } = usePage<any>().props;

    const pickerControl = (
        <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    );

    const data = [
        { label: 'Draft', value: 'draft'},
        { label: 'Send Now', value: 'send now'},
        { label: 'Send Later', value: 'send later'},
        { label: 'Send Recurring', value: 'send recurring'},
        { label: 'Pause', value: 'pause'},
    ]


    console.log('campaign: ', campaign)
    return <Stack gap={0} mr={'xs'}>
         <AppCard title={'Activation status'}>
            <Stack gap={'xs'}>
                <Text fz={13}>You can set the duration that your campaign will be active based on the time zone you selected (UTC+8, Asia/Kuala_Lumpur) in Settings.</Text>
                <Group mt={'md'}>
                    {data.map((res: any, i:any) => {
                        return <Radio 
                            checked={form.data.status == res.value} key={i}
                            label={res.label} value={res.value} 
                            color='green' onChange={(e) => form.setData('status', e.target.value)}
                            disabled={res.value == 'pause' || campaign?.is_lock}
                        />
                    })}
                </Group>

                {form.data.status== 'send later' && <>
                    <Flex w={'100%'} justify={'space-between'} my={'xs'}>
                        <DateInput
                            value={form.data.sendDate}
                            onChange={(e:any) => {form.setData('sendDate',e); form.setError('sendDate','')}}
                            label="Send Date"
                            placeholder="Enter Send Date"
                            w={'50%'}
                            mr={'xs'}
                            error={form.errors.sendDate}
                        />
                        <TimeInput 
                            label="Send Time"
                            // ref={ref} 
                            rightSection={pickerControl} 
                            w={'50%'}
                            onChange={(e:any) => {form.setData('sendTime',e.target.value); form.setError('sendTime','')}}
                            error={form.errors.sendTime}
                        />
                    </Flex>
                </>}

                {form.data.status == 'send recurring' && <Stack gap={'xs'} my={'xs'}>
                    <Select
                        data={['Daily','Weekly','Monthly']}
                        label={'Recurrence'}
                        placeholder={'Choose Recurrence'}
                        w={'50%'}
                        value={form.data.recurrence}
                        onChange={(e:any) => {form.setData('recurrence',e); form.setError('recurrence','')}}
                        error={form.errors.recurrence}
                    />
                    <TimeInput 
                        label="Trigger Time"
                        rightSection={pickerControl} 
                        w={'50%'}
                        // value={form.data.trigger_time}
                        onChange={(e:any) => {form.setData('trigger_time',e.target.value); form.setError('trigger_time','');}}
                        error={form.errors.trigger_time}
                    />
                    <Flex w={'100%'} justify={'space-between'} my={'xs'}>
                        <DateInput
                            label="Start Date"
                            placeholder="Enter Send Date"
                            w={'50%'}
                            mr={'xs'}
                            value={form.data.start_date}
                            onChange={(e:any) => {form.setData('start_date',e); form.setError('start_date','')}}
                            error={form.errors.start_date}
                            minDate={new Date()}
                        />
                        <TimeInput 
                            label="Start Time"
                            rightSection={pickerControl} 
                            w={'50%'}
                            onChange={(e:any) => {form.setData('start_time',e.target.value); form.setError('start_time','')}}
                            error={form.errors.start_time}
                        />
                    </Flex>
                    
                    <Flex w={'100%'} justify={'space-between'} my={'xs'}>
                        <DateInput
                            label="End Date"
                            placeholder="Enter Send Date"
                            w={'50%'}
                            mr={'xs'}
                            value={form.data.end_date}
                            onChange={(e:any) => {form.setData('end_date',e); form.setError('end_date','')}}
                            error={form.errors.end_date}
                            disabled={!form.data.start_date}
                            minDate={new Date(form.data.start_date)}
                        />
                        <TimeInput 
                            label="End Time"
                            rightSection={pickerControl} 
                            w={'50%'}
                            onChange={(e:any) => {form.setData('end_time',e.target.value); form.setError('end_time',''); console.log(e)}}
                            error={form.errors.end_time}
                            disabled={!form.data.start_time}
                        />
                    </Flex>
                </Stack>}
            </Stack>

            <Divider my="md" variant="dashed"  />

            <Stack gap={'xs'} w={'60%'}>
                <Text fw={500} fz={16}>Time to Live</Text>
                <Text fz={13}>You can set a period of time for retrying to deliver your message to the users who weren't reachable at the planned delivery time of your campaign.</Text>
                <NumberInput
                    label="Duration"
                    placeholder="Enter a Duration"
                    rightSection={<Tooltip label="Hour(s)"><IconInfoCircle style={{ width: '70%', height: '70%' }} stroke={1.5} /></Tooltip>}
                    min={0}
                    value={form.duration}
                    onChange={(e) => {form.setData('duration', e); form.setError('duration','')}}
                    error={form.errors.duration}
                />
            </Stack>

            {/* <Divider my="md" variant="dashed"  /> */}

             {/*<<Stack gap={'xs'} w={'60%'}>
                <Text fw={500} fz={16}>Campaign Tags</Text>
                <MultiSelect
                    placeholder="Select Tags"
                    data={['Bulk', 'Segment']}
                    value={form.campaign_tags}
                    onChange={(e) => {form.setData('campaign_tags', e); form.setError('campaign_tags','')}}
                    error={form.errors.campaign_tags}
                />
            </Stack>

            <Divider my="md" variant="dashed"  /> */}

            <Space h={'md'} />

            <Stack gap={0} w={'60%'}>
                <Text fw={500} fz={14}>Notes</Text>
                <Textarea
                    placeholder="Add notes to your campaign."
                    autosize
                    minRows={10}
                    maxRows={6}
                    value={form.notes}
                    onChange={(e) => {form.setData('notes', e.target.value);form.setError('notes','')}}
                    error={form.errors.notes}
                />
            </Stack>
        </AppCard>
    </Stack> 
   
}

export default LaunchLayout;
