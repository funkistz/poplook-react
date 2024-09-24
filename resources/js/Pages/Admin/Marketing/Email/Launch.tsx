import { useForm, usePage } from '@inertiajs/react';
import {Group, rem, Text, Paper, Flex, Stack, Radio, Button} from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { DateInput, DateInputProps, TimeInput } from '@mantine/dates';
import { EmailTitle, PreviewBeforeLaunch, TextWithTooltips } from './Components/Index';
import dayjs from "dayjs";
import {router} from "@inertiajs/core";

export default function LaunchPage() {
    const { campaign } = usePage<any>().props;

    const formData = useForm({
        campaign_id: campaign.uuid,
        activation: campaign.activation_status,
        date: new Date(),
        time: campaign.start_time,
        type: "radio"
    });

    const acvtivationDetails = () => {
        return <>
            <Text size="xs" mb={'xs'}>Activation Status lets you specify when and how your email will be sent to your recipients.</Text>
            <Text size="xs"><b>Send Now:</b>The email campaign will be sent immediately.</Text>
            <Text size="xs"><b>Send Later:</b>The email campaign will be sent at the time you will set.</Text>
            <Text size="xs"><b>Draft:</b>The email campaign will be saved as draft which you can come and edit later.</Text>
        </>
    }
    const startTimeDetails = () => {
        return <>
            <Text size="xs">This is the time when you want your Campaign to be launched for the first time.</Text>
        </>
    }

    const dateParser: DateInputProps['dateParser'] = (input) => {
        if (input === 'WW2') {
            return new Date(1939, 8, 1);
        }

        return dayjs(input, 'DD/MM/YYYY').toDate();
    };

    const onSubmit = (e:any) => {
        e.preventDefault();
        router.post('/email_analytics/campaign/email/launch', formData.data);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <EmailTitle
                    title={'Ready to Go Live?'}
                    description={'Finalize setting up your email campaign.'}
                    value={campaign.campaign_name}
                    rightSection={<Group gap={'xs'}>
                        <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
                        <Button size={'xs'} variant="filled" type='submit' color='green'>
                            {formData.data.activation == 'draft' || formData.data.activation == 'pause' ? 'Save': 'launch'}
                        </Button>
                    </Group>}
                />

                <Flex justify={'space-between'}>
                    <Paper w={'65%'} radius={'lg'} p={'lg'} withBorder mr={'xs'}>
                        <TextWithTooltips
                            width={160}
                            title={'Activation Status'}
                            details={acvtivationDetails()}
                        />
                        <Radio.Group
                            value={formData.data.activation}
                            onChange={(e:any) => formData.setData('activation',e)}
                            my={'lg'}
                        >
                            <Group my={'lg'}>
                                <Radio checked label="Send Now" value="send now" color={'green'} />
                                <Radio label="Send Later" value="send later" color={'green'}   />
                                <Radio label="Draft" value="draft" color={'green'} />
                                <Radio label="Pause" value="pause" color={'green'} />
                            </Group>
                        </Radio.Group>

                        <Flex w={'60%'}>
                            <DateInput
                                dateParser={dateParser}
                                onChange={(e:any) => formData.setData('date',e)}
                                label="Date input"
                                placeholder="Date input"
                                w={'50%'}
                                mr={'xs'}
                                value={formData.data.date}
                                disabled={formData.data.activation == 'send later' ? false : true}
                            />
                            <Stack gap={0} w={'50%'} >
                                <TextWithTooltips
                                    width={'160'}
                                    title={'Start Time'}
                                    details={startTimeDetails()}
                                />
                                <TimeInput
                                    // value={formData.data.time ? '' : ''}
                                    onChange={(e:any) => formData.setData('time', e.target.value)}
                                    placeholder="Date input"
                                    leftSection={<IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                    disabled={formData.data.activation == 'send later' ? false : true}
                                />
                            </Stack>

                        </Flex>
                    </Paper>

                    <PreviewBeforeLaunch width={'35%'} />
                </Flex>
            </form>



        </>
    );

}

LaunchPage.layout = (page: any) => <AdminLayout children={page} title='Review and Launch' />;
