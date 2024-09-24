import { Paper, Text, Alert, Flex, Group, Button } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { IconInfoCircle, IconX } from '@tabler/icons-react';
import { EmailDesign, EmailForm, EmailTitle, PreviewEmail, TextWithTooltips, UTMform } from './Components/Index';
import { useForm, usePage } from '@inertiajs/react';


export default function EmailAnalytics() {
    const { id, campaign } = usePage<any>().props;

    const fromAndReplyTo = () => {
        return <>
            <Text size="xs" mb={'xs'}><b>From</b>  is the email address which your recipients will see as the sender of the email.</Text>
            <Text size="xs"><b>Reply-to</b> is the email address that your recipients' reply messages will be sent to.</Text>
        </>
    }

    const formData = useForm({
        id: id,
        subject: campaign?.mail?.subject ? campaign.mail.subject : '',
        preheader: campaign?.mail?.preheader ? campaign.mail.preheader : '',
    });

    const submitHeader = () => {
        formData.post('/email_analytics/campaign/email/header')
    }

    return (
        <>
            <EmailTitle 
                title={'What to Show?'} 
                description={'Design one or more alternative versions of your campaign.'} 
                value={campaign.campaign_name}
                rightSection={<Group gap={'xs'}>
                    <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
                    <Button size={'xs'} variant="filled" color='green' onClick={submitHeader}>Save</Button>
                    <Button size={'xs'} variant="filled" color='green' disabled={!campaign.template || !campaign.mail} component='a' href={route('email_analytics.launch', { id: id })}>Next</Button>
                </Group>}/>

            <Flex justify={'space-between'}>
                <Paper w={'65%'} radius={'lg'} p={'lg'} withBorder mr={'xs'}>
                    <Flex justify={'space-between'} mb={'xl'}>
                        <Text c={'dark'}>Email Header</Text>
                        <Text c={'dark'}>Variation ID: {id}</Text>
                    </Flex>

                    <TextWithTooltips
                        width={160}
                        title={'From and Reply-to'}
                        details={fromAndReplyTo()}
                    />

                    <Alert variant="light" color="blue" mb={'md'} icon={<IconInfoCircle />}>
                        You can add new From and Reply-to options or edit existing ones at Sender Management.
                    </Alert>

                    <EmailForm {...formData} />

                    <hr style={{ borderTop: '1px dashed gray', marginTop: 30, marginBottom: 30 }} />

                    <EmailDesign id={id} {...formData}/>

                    <hr style={{ borderTop: '1px dashed gray', marginTop: 30, marginBottom: 30 }} />

                    <UTMform />

                </Paper>

                <PreviewEmail width={'35%'} design={id} {...formData}/>
            </Flex>
        </>
    );

}

EmailAnalytics.layout = (page: any) => <AdminLayout children={page} title='Email Analytics' />;
