import { usePage } from '@inertiajs/react';
import { Text, Checkbox, Select, Button, Divider, Space } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard } from '@/Components';
import { EmailTitle, SegmentCard } from '@/features/marketing';
import { WhatsAppsBC } from './values/listData';


export default function Segment() {
    const { list, search } = usePage<any>().props;

    const rightBtn = () => {
        return <>
            <Button variant="filled" size='xs'>Save and Continuous</Button>
        </>
    }

    return (
        <>
            <EmailTitle title={'Whom To Target?'} description={'Select one or more user groups to show your campaign.'} data={WhatsAppsBC} rightButton={rightBtn()} />
            <AppCard title={'language'}>
                <Select
                    label={'Target Audience Language'}
                    placeholder="Language"
                    w={'50%'}
                    data={['English']}
                    allowDeselect={false}
                />

                {/* <Divider my="md" variant="dashed"  />  */}

            </AppCard>

            <Space h={'xs'} />

            <SegmentCard />
        </>
    );

}

Segment.layout = (page: any) => <AdminLayout children={page} title='WhatsApps' back={true} />;