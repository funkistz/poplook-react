import {  Stack, Text, Group, Radio, Divider, NumberInput, Tooltip, MultiSelect, Textarea, Flex, ActionIcon, rem, TextInput, Select } from "@mantine/core";
import { AppCard } from "@/Components";
import { IconClock, IconInfoCircle } from "@tabler/icons-react";
import { DateInput, TimeInput } from "@mantine/dates";
import { useRef } from "react";

function LaunchLayout({status, setStatus}:any) {

    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );

    return <Stack gap={0} mr={'xs'}>
         <AppCard title={'Activation status'}>

            <Stack gap={'xs'}>
                <Text fz={13}>You can set the duration that your campaign will be active based on the time zone you selected (UTC+8, Asia/Kuala_Lumpur) in Settings.</Text>
                <Group mt={'md'}>
                    <Radio checked={status == 0} label="Draft" value="0" color='green' onChange={() => setStatus(0)} />
                    <Radio checked={status == 1} label="Send Now" value="1" color='green' onChange={() => setStatus(1)}/>
                    <Radio checked={status == 2} label="Send Later" value="2" color='green'  onChange={() => setStatus(2)}/>
                </Group>

                {status== 2 && <>
                    <Flex w={'100%'} justify={'space-between'} my={'xs'}>
                        <DateInput
                            // value={value}
                            // onChange={setValue}
                            label="Send Date"
                            placeholder="Enter Send Date"
                            w={'50%'}
                            mr={'xs'}
                        />
                        <TimeInput 
                            label="Send Time"
                            ref={ref} 
                            rightSection={pickerControl} 
                            w={'50%'}
                        />
                    </Flex>
                </>}

                {status == 3 && <Stack gap={'xs'} my={'xs'}>
                    <Select
                        data={['Daily','Weekly','Monthly']}
                        label={'Recurrence'}
                        placeholder={'Choose Recurrence'}
                        w={'50%'}
                    />
                    <TimeInput 
                        label="Trigger Time"
                        ref={ref} 
                        rightSection={pickerControl} 
                        w={'50%'}
                    />
                    <Flex w={'100%'} justify={'space-between'} my={'xs'}>
                        <DateInput
                            label="Start Date"
                            placeholder="Enter Send Date"
                            w={'50%'}
                            mr={'xs'}
                        />
                        <TimeInput 
                            label="Start Time"
                            ref={ref} 
                            rightSection={pickerControl} 
                            w={'50%'}
                        />
                    </Flex>
                    <Flex w={'100%'} justify={'space-between'} my={'xs'}>
                        <DateInput
                            label="End Date"
                            placeholder="Enter Send Date"
                            w={'50%'}
                            mr={'xs'}
                        />
                        <TimeInput 
                            label="End Time"
                            ref={ref} 
                            rightSection={pickerControl} 
                            w={'50%'}
                        />
                    </Flex>
                </Stack>}
            </Stack>

            <Divider my="md" variant="dashed"  />

            <Stack gap={'xs'} w={'60%'}>
                <Text fw={500} fz={16}>Campaign Tags</Text>
                <MultiSelect
                    placeholder="Select Tags"
                    data={['Bulk', 'Segment']}
                />
            </Stack>

            <Divider my="md" variant="dashed"  />

            <Stack gap={'xs'} w={'60%'}>
                <Text fw={500} fz={16}>Notes</Text>
                <Textarea
                    placeholder="Add notes to your campaign."
                    autosize
                    minRows={10}
                    maxRows={6}
                />
            </Stack>
        </AppCard>
    </Stack> 
   
}

export default LaunchLayout;
