import { usePage } from '@inertiajs/react';
import { Text, Checkbox, Select, Button, Divider, Group, Table } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard } from '@/Components';
import { EmailTitle } from '@/features/marketing';
import { WhatsAppsBC } from './values/listData';
import { LaunchLayout, StatusLaunch } from './Components/Index';
import { useState } from 'react';


export default function Launch() {
    const { list, search } = usePage<any>().props;
    // 0 = Draft
    // 1 = Send Now
    // 2 = Send Later
    const [status, setStatus] = useState<any>(0);

    const rightBtn = () => {
        return <Group>
            <Button variant="outline" size='xs'>Test Message</Button>
            <Button variant="filled" size='xs'>Launch</Button>
        </Group>
    }

    return (
        <>
            <EmailTitle title={'Ready to Run?'} description={'Finalize setting up your campaign and launch.'} data={WhatsAppsBC} rightButton={rightBtn()} />
            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td w={'70%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <LaunchLayout status={status} setStatus={setStatus} />   
                        </Table.Td>
                        <Table.Td w={'30%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <StatusLaunch status={status} />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    );

}

Launch.layout = (page: any) => <AdminLayout children={page} title='WhatsApps' back={true} />;