import { AddButton, AppCard, AppTable, UpdateButton } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { Group  } from '@mantine/core';
import { exampleListData } from './values/listData';

export default function ContactGroupPage() {

    const details = (data:any) => {
        if(data.status == 'Completed') {
            window.location.href = '/content_group/' + 1
        }
    }

    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.name,
                'status': value.status,
                'date generate': value.date_generate,
                'generate by': value.user,
                'action': <Group justify='right' gap='xs'>
                    <UpdateButton onClick={() => details(value)}  />
                </Group>
            });
        })
        return values;
    }
    
    return <>
        <AppCard title="&nbsp;" rightComponent={<AddButton link={route('content_group.create')}></AddButton>}>
            <AppTable
                data={tableData(exampleListData.data)}
                meta={exampleListData}
                // canSort={[{ label: 'created on', value: 'firstname' }, { label: 'send date', value: 'email' }]}
                // searchPlaceholder='Search by name or email'
            />
        </AppCard>
    </>
}

ContactGroupPage.layout = (page: any) => <AdminLayout children={page} title='Contact Group' />;
