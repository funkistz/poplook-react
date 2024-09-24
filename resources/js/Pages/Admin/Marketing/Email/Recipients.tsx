import { usePage } from '@inertiajs/react';
import { Tooltip, Paper, MultiSelect, Text, Alert, Group, Button } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { EmailTitle, TextWithTooltips } from './Components/Index';
import {router} from "@inertiajs/core";


export default function Recipients() {
    const { list, search, id, campaign, groups } = usePage<any>().props;
    const [segment, setSegment] = useState();

    useEffect(() => {
        console.log(groups);
    }, []);

    const onNext = () => {
        router.get('design');
    }
    const Include = () => {
        return <>
            <Text size="xs">Included Recipients lets you select the Contact Lists to be included in your target audience.</Text>
        </>
    }

    const Exclude = () => {
        return <>
            <Text size="xs">Excluded Recipients lets you select the Contact Lists to be excluded from your target audience.</Text>
        </>
    }

    return (
        <>

            <EmailTitle
                title={'Whom To Target?'}
                description={'Create your target audience to start designing your campaign.'}
                value={campaign.campaign_name}
                rightSection={<Group>
                    <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
                    <Button size={'xs'} variant="filled" color='green' onClick={() => onNext()}>Save & Next</Button>
                </Group>}
            />

            <Paper radius={'lg'} p={'lg'} withBorder >
                <Alert variant="light" color="blue" mb={'md'} icon={<IconInfoCircle />}>
                    You can only see the uploaded and processed contact lists here. If you can't find a contact list, check if it's still processing.
                </Alert>

                <TextWithTooltips
                    width={160}
                    title={'Include Recipients'}
                    details={Include()}
                />
                <MultiSelect
                    placeholder="Pick value"
                    w={'50%'}
                    data={['Testing Segment - My']}

                />
                <hr style={{ borderTop: '1px dashed gray', marginTop: 30, marginBottom: 30 }} />

                {/*<TextWithTooltips*/}
                {/*    width={160}*/}
                {/*    title={'Exclude Recipients'}*/}
                {/*    details={Exclude()}*/}
                {/*/>*/}
                {/*<MultiSelect*/}
                {/*    placeholder="Pick value"*/}
                {/*    w={'50%'}*/}
                {/*    data={['React', 'Angular', 'Vue', 'Svelte']}*/}
                {/*/>*/}
            </Paper >
        </>
    );

}

Recipients.layout = (page: any) => <AdminLayout children={page} title='Recipients' />;
