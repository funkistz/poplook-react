import { usePage } from '@inertiajs/react';
import { Text, Checkbox, Select, Button, Divider, Table, Radio, Space, Stack, TextInput } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard } from '@/Components';
import { EmailTitle, TextWithTooltips } from '@/features/marketing';
import { WhatsAppsBC, dummyData } from './values/listData';


export default function Goal() {
    const { list, search } = usePage<any>().props;

    const rightBtn = () => {
        return <>
            <Button variant="filled" size='xs'>Save and Continuous</Button>
        </>
    }

    const rows = dummyData.map((res: any, key: any) => (
        <Table.Tr key={key}>
          <Table.Td>{res.name}</Table.Td>
          <Table.Td>{res.type}</Table.Td>
          <Table.Td>{res.id ? res.id : '-'}</Table.Td>
          <Table.Td> <Radio color={'green'} checked={res.default} onChange={(event) => console.log(event.currentTarget.checked)}
    /></Table.Td>
        </Table.Tr>
      ));

    const details = () => {
        return <>
            <Text size="xs">Time between the first time a personalized version is shown to a user and when the goal occurs for the first time.</Text>
        </>
    }

    return (
        <>
            <EmailTitle title={'What to Track?'} description={'Set goals to track the performance of your campaign.'} data={WhatsAppsBC} rightButton={rightBtn()} />
            <AppCard title={'Goals'}>
                <Stack gap={'xs'}>
                    <Table striped highlightOnHover withTableBorder withColumnBorders> 
                    <Table.Thead>
                        <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Primary</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                    </Table>

                    <Divider my={'md'} variant='dashed' />

                    <Stack mb={'xs'}>
                        <TextWithTooltips title={ <Text fw={500} fz={16}>Goal Conversion Duration</Text>} details={details()} />
                        <TextInput
                            label={'Day(s)'}
                            placeholder='Please enter days'
                            w={'40%'}
                        />
                    </Stack>
                </Stack>
            </AppCard>
        </>
    );

}

Goal.layout = (page: any) => <AdminLayout children={page} title='WhatsApps' back={true} />;