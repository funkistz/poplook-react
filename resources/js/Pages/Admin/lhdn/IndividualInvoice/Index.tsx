import { AppCard, AppTable, ConfirmButton, } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { Badge, Button, Group, Text } from '@mantine/core';
import { exampleListData } from '../../Marketing/Whatsapp/values/listData';

export default function IndividualInvoicePage() {

    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'status': <Badge variant="light" color="blue">{value.status}</Badge>,
                'ID': value.id,
                'name': <Text style={{ cursor: 'pointer' }}>
                    {value.name}
                </Text>,
                'created on': value.starts_on,
                'send date': value.ends_on,
            });
        })
        return values;
    }

    return <>
        <AppCard 
            title='&nbsp;' 
            rightComponent={
                <Group gap={'xs'}>
                    <Button size={'xs'}>Raw Data</Button>
                    <ConfirmButton
                        label={'Submit'}
                        title={'Are you sure you want to submit e-invoice to LHDN'}
                        onConfirm={() => console.log('onConfirm')}
                        onOpen={() => console.log('opOpen')}
                    />
                </Group>
            }>
            <AppTable
                    data={tableData(exampleListData.data)}
                    meta={exampleListData}
                    canSort={[{ label: 'created on', value: 'firstname' }, { label: 'send date', value: 'email' }]}
                    searchPlaceholder='Search by name or email'
                />
        </AppCard>
    </>
}

IndividualInvoicePage.layout = (page: any) => <AdminLayout children={page} title='Individual Invoice' />;
