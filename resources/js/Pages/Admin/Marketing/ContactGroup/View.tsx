import { AppCard, AppTable } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { Divider, SimpleGrid, TextInput } from '@mantine/core';
import { exampleListData } from './values/listData';

export default function ContactGroupViewPage() {

    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.name,
                'status': value.status,
                'date generate': value.date_generate,
                'generate by': value.user,
                // 'action': <Group justify='right' gap='xs'>
                //     <UpdateButton onClick={() => details(value)}  />
                // </Group>
            });
        })
        return values;
    }

    return <>
        <AppCard title={'Details'}>
            <SimpleGrid cols={2}>
                <TextInput
                    label="Name"
                    placeholder="Name"
                   
                />
                 <TextInput
                    label="Status"
                    placeholder="Input placeholder"
                />
            </SimpleGrid>
        </AppCard>

        <Divider h={'xs'} />

        <AppCard title={'list Users'}>
            <AppTable
                data={tableData(exampleListData.data)}
                meta={exampleListData}
            />
        </AppCard>
    </>
}


ContactGroupViewPage.layout = (page: any) => <AdminLayout children={page} title='Contact Group' back />;