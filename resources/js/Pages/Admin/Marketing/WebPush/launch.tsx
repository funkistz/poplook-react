import { router, useForm, usePage } from '@inertiajs/react';
import { Group, Button, Table } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { EmailTitle } from '@/features/marketing';
import { WebPush } from './values/listData';
import { LaunchLayout, StatusLaunch } from './Components/Index';



export default function launch() {
    const { id , campaign } = usePage<any>().props;

    // 0 = Draft
    // 1 = Send Now
    // 2 = Send Later
    // 3 = Send Recurring
    // 4 = Pause

    const formData = useForm({
        id: id,
        status: campaign?.activation_status ? campaign.activation_status : 'draft',
        duration: '',
        campaign_tags: '',
        notes: '',

        // Send later
        sendDate: '',
        sendTime: '',

        // Send Recurring
        recurrence: '',
        trigger_time: '',
        start_date: '',
        start_time: '',
        end_date:'',
        end_time: '',

        // Loading
        loading: false
    })

    const rightBtn = () => {
        return <Group gap={'xs'}>
            <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
            <Button disabled={campaign.is_lock ? true : false} variant="outline" size='xs' color='green'>Test Message</Button>
            {/* <Button disabled={formData.data.loading || campaign.is_lock ? true : false} variant="filled" size='xs' color='green' onClick={() => submit()}>Launch</Button> */}
            <Button variant="filled" size='xs' color='green' onClick={() => submit()}>Launch</Button>
        </Group>
    }

    const submit = () => {
        const url = 'web_push.launchUpdate';
        formData.put(route(url), {
            preserveState: true,
            preserveScroll: true,
            onStart: () => {
                formData.setData('loading',true)
            },
            onSuccess: (data: any) => {
                console.log('onSuccess start.....')
                router.get('/web_push')
            },
            onFinish:() => {
                formData.setData('loading', false)
            }
        })
    }

    return (
        <>
            <EmailTitle
                title={'Ready to Run?'}
                description={'Finalize setting up your campaign and launch.'}
                data={WebPush}
                rightButton={rightBtn()}
                campaign={campaign?.campaign_name}
            />



            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td w={'70%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <LaunchLayout form={formData} />
                        </Table.Td>
                        <Table.Td w={'30%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <StatusLaunch form={formData} />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    );

}

launch.layout = (page: any) => <AdminLayout children={page} title='Web Push' back={true}  />;
