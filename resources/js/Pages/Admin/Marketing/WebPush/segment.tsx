import { router, useForm, usePage } from '@inertiajs/react';
import { Text, Checkbox, Select, Button, Divider, Space, Stack, Group } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard } from '@/Components';
import { EmailTitle, SegmentCard } from '@/features/marketing';
import { WebPush } from './values/listData';
import {useEffect, useState} from "react";


export default function Recipients() {
    const { id, segment, shop, data, campaign } = usePage<any>().props;

    const formData = useForm({
        id: id,
        shop: data?.shop_id ? data.shop_id : '',
        segment: data?.segment_group_id ? data.segment_group_id : ''
    })

    const rightBtn = () => {
        return <Group gap={'xs'}>
            <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
            <Button variant="filled" size='xs' color='green' disabled={campaign.is_lock ? true : false} onClick={() => submit()}>Save and Next</Button>
        </Group>
    }

    const submit = () => {
        console.log(formData.data)
        const url = 'web_push.segmentUpdate'; 
        formData.put(route(url), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (data: any) => {
                // console.log(data)
                router.get('design');
                // console.log( 'web_push/' + id + '/design');
            }
        })
    }

    return (
        <>
            <EmailTitle
                title={'Whom To Target?'}
                description={'Select one or more user groups to show your campaign.'}
                data={WebPush}
                campaign={data?.campaign_name}
                rightButton={rightBtn()} />

            <AppCard title={'Target'}>

                <Stack gap={'xs'}>
                    <Select
                        label={'Shop'}
                        placeholder="Shop"
                        w={'50%'}
                        data={shop}
                        value={formData.data.shop}
                        onChange={(e:any) => {formData.setData('shop', e), formData.setError('shop','')}}
                        allowDeselect={false}
                        error={formData.errors.shop}
                        disabled={campaign.is_lock ? true : false}
                    />

                    <Select
                        label={'Segment Group'}
                        placeholder="Segment"
                        w={'50%'}
                        data={segment}
                        value={formData.data.segment}
                        onChange={(e:any) => {formData.setData('segment', e), formData.setError('segment','')}}
                        allowDeselect={false}
                        error={formData.errors.segment}
                        disabled={campaign?.is_lock ? true : false}
                    />
                </Stack>


                <Divider my="md" variant="dashed"  />

                <Text fz={14}>Unengaged Subscribers</Text>
                <Text fz={13}>You can improve the performance of your campaign by excluding the Unengaged Subscribers. For more information about Unengaged Subscribers, you can visit Academy.</Text>
                <Checkbox
                    defaultChecked
                    label="I agree to sell my privacy"
                    mt={'xs'}
                    color='green'
                />
            </AppCard>

            <Space h={'xs'} />

            <SegmentCard />
        </>
    );

}

Recipients.layout = (page: any) => <AdminLayout children={page} title='Web Push' back={true} />;
