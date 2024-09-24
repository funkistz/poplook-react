import { AppCard, AppTable } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import React, { useEffect, useState } from 'react'
import { exampleListData } from './Values/listData';
import { ActionIcon, Flex, Paper, Space, TextInput, rem, Text, Button, Stack, Modal, Select } from '@mantine/core';
import { IconArrowRight, IconChartBar, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { BarChart, Sparkline } from '@mantine/charts';
import { ClearFormattingControl } from '@mantine/tiptap';
import { useForm } from '@inertiajs/react';
import moment from 'moment';
import ModalBarChart from './Components/ModalBarChart';
import axios from 'axios';

export default function SearchKeywordPage() {

    const [clicked, setClicked] = useState<any>(null)
    const { data, setData, post, put, reset, errors, setError } = useForm({
        search: 'Raya'
    });

    const tableData = (data: any[]) => {
        const values: any = [];
        data && data.map((value: any, i:any) => {
            values.push({
                'keyword': value.keyword,
                'trend': <ActionIcon onClick={() => setClicked(i)} variant="subtle" color='green'>
                    <IconChartBar style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>,
                'monthly searches': value.monthly,
            });
        })

        return values;
    }

    return <>
        <Paper radius={'lg'} p={'lg'} withBorder >
            <Stack align='center' my={'xs'}>
                <Text fz={16} fw={600} mr={'xs'}>What kind of keyword discovery you want to generate?</Text>
                <Flex w={'100%'} direction={'row'} align={'center'} justify={'center'} gap={'xs'}>
                    <TextInput leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} placeholder="Keyword"w={400} 
                        value={data.search}
                        onChange={(e:any) => setData('search', e.target.value)}
                    />
                        <Button color='green'>Overwrite</Button>
                        <Button onClick={() => setData('search', '')} variant='default'>Reset</Button>
                </Flex>
            </Stack>
            
        </Paper>

        <Space h={'xs'} />
        <Paper radius={'lg'} p={'lg'} withBorder>

            <AppTable
                data={tableData(exampleListData.data)}
                meta={exampleListData}
                canSort={[{ label: 'keyword', value: 'firstname' }, { label: 'monthly searches', value: 'email' }]}
                // searchPlaceholder='Search keyword'
                filterBy={[
                    { label: 'All', value: '' },
                    { label: 'Keyword', value: 'Keyword' },
                    { label: 'Products', value: 'Products' },
                ]}
            />
        </Paper>

        <ModalBarChart opened={clicked != null} close={setClicked} data={exampleListData.data[clicked]} />
    </>
}

SearchKeywordPage.layout = (page: any) => <AdminLayout children={page} title='Search Keyword' />;
