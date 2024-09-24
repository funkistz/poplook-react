import { router, usePage } from '@inertiajs/react';
import { Paper, Group, rem, Textarea, Radio, FileInput, FileButton, ActionIcon, Popover, NavLink, Tooltip, Text, Drawer, Flex, Image, Stack, Button, Select, SegmentedControl } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable } from '@/Components';
import { data, exampleListData } from './values/listData';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from "@tabler/icons-react";
import { useState } from 'react';
import { InternalBreadcrumbs } from '../Components/Index';

export default function Segmentation() {
    const { id, campaign } = usePage<any>().props;
    const { list, search } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);

    const lastUrl = data(id);

    const next = () => {
        router.get('option');
    }
    return (
        <>
            <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>
                <InternalBreadcrumbs
                    data={data(id)}
                    rightsection={<Group gap={'xs'}>
                        <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
                        <Button size={'xs'} disabled={campaign.is_lock ? true : false} color='green' variant="filled" onClick={() => next()}>Save & Next</Button>
                    </Group>} />
            </Paper>

            <Paper radius={'lg'} p={'lg'} withBorder>
                <Flex w={'100%'} align={'center'} justify='center'>
                    <Flex align={'center'} w={'70%'} justify='center'>
                        <Select
                            label="Segment"
                            placeholder="Select Segment"
                            w={'100%'}
                            data={[
                                { group: '', items: ['All People'] },
                                { group: 'By Shop', items: ['Malaysia', 'Singpore', 'International'] },
                                { group: 'By Device', items: ['iOS', 'Android'] },
                            ]}
                            allowDeselect={false}
                            disabled={campaign.is_lock == 1 ? true : false}
                        />
                    </Flex>
                </Flex>


            </Paper>
        </>
    );

}

Segmentation.layout = (page: any) => <AdminLayout children={page} title='Select target segment' />;
