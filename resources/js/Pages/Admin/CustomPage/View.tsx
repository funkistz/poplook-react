import { router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton, AppInput, AppTextArea } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider, Card, Flex, Center, Stack } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import SimpleForm from './SimpleForm';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { saveBlock, resetBlock, setShop } from '@/features/block_creator/redux/blockSlice';
import { BlockCreator } from '@/features/block_creator';

export default function View() {

    const { customPage }: any = usePage().props;
    const { block, shop } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { data, setData, post, put, reset, errors } = useForm({
        name: customPage ? customPage.name : '',
        url: customPage ? customPage.url : '',
        description: (customPage && customPage.description) ? customPage.description : '',
        data: (customPage && customPage.data) ? customPage.data : '',
    });

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/\s+/g, '-').toLowerCase();
    }

    useEffect(() => {
        console.log('customPage', customPage)
        if (customPage && customPage.data) {
            dispatch(saveBlock(JSON.parse(customPage.data)));
        } else {
            dispatch(saveBlock([]));
        }
    }, []);

    useEffect(() => {
        if (block) {
            setData('data', block);
        }
    }, [block]);

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('custom_page.update', customPage.id), {
            data,
            onSuccess: () => {
            },
        });
    }

    return (
        <>
            <Card p='xl' radius='lg' withBorder shadow='xs'>
                <SimpleGrid cols={{ sm: 1, lg: 2 }}>
                    <form onSubmit={onSubmit}>
                        <Stack>
                            <AppInput required label='Name' description='*display at mobile app only.' id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                            <AppInput required label='Url' description='*url for web.' id='url' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('url', urlSafe(e.target.value))} />
                            <AppTextArea label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />
                            <Button maw={200} color='green' type='submit'>Save</Button>
                        </Stack>
                    </form>
                </SimpleGrid>

                <div className='' style={{ position: 'relative', marginTop: 10 }}>
                    {
                        (block != null) ? (
                            <Box style={{ transition: 'width 0.2s' }} m={0} mt={10} mb={40}>
                                <BlockCreator defaultPreviewSize={100} />
                            </Box>
                        ) : (
                            <Flex bg={'#fff'} p={10}>
                                <Center maw={400} h={100} mx="auto">
                                    <Text fz={20} fw={500}>Block null</Text>
                                </Center>
                            </Flex>
                        )
                    }
                </div>
            </Card>
        </>
    )
}


View.layout = (page: any) => <AdminLayout children={page} title='Edit Custom Page' back={true} />;