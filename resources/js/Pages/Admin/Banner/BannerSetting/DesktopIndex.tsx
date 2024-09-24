import { router, useForm, usePage } from '@inertiajs/react';
import { Box, Flex, Text, Center, Card } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { BlockCreator } from '@/features/block_creator';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { saveBlock, resetBlock } from '@/features/block_creator/redux/blockSlice';
import { TransferList } from '@/features/transfer_list_preview/Index';
import { PreviewFormBanner } from '@/features/preview_banner';
import AdminLayout from '@/Components/layout/AdminLayout';

export default function BannerPage() {

    const { block, shop } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const url = 'desktop_banner';

    // Define
    const { listBanner } = usePage<any>().props;
    const scrollRef = useRef<HTMLDivElement>(null);

    // Details
    const { data, setData, put, processing, errors } = useForm({
        id: null,
        name: '',
        description: '',
        start_at: null,
    })

    // List Data from DB
    const [listActive, setListActive] = useState<any>([]);
    const [listDraft, setListDraft] = useState<any>([]);

    // useEffect
    useEffect(() => {
        dispatch(resetBlock());
        setListActive(listBanner.active);
        setListDraft(listBanner.draft);

        if (listBanner.active && listBanner.active[0] != undefined) {
            const checkDate = listBanner.active[0].start_at !== null ? listBanner.active[0].start_at : null;
            setData({
                id: listBanner.active[0].id,
                name: listBanner.active[0].name,
                description: listBanner.active[0].description,
                start_at: checkDate,
            })
            dispatch(saveBlock(JSON.parse(listBanner.active[0].data)));
        }
    }, []);

    useEffect(() => {
        setListActive(listBanner.active);
        setListDraft(listBanner.draft);
    }, [listBanner]);

    const setActiveDataFunc = (res: any, index: any) => {
        const tempData = JSON.parse(JSON.stringify(res));
        setData({
            id: tempData.id,
            name: tempData.name,
            description: tempData.description,
            start_at: tempData.start_at,
        });
        dispatch(saveBlock(JSON.parse(tempData.data)));
    }

    return (
        <>
            <TransferList
                listActive={listActive}
                listDraft={listDraft}
                onSetActive={setActiveDataFunc}
                url={url}
                setData={setData}
                data={data}
                apiDuplicate={url + '/duplicate'}
                apiActivate={url + '/activate'}
                apiDeactivate={url + '/deactivate'}
            />

            {data.id != null && <>
                <Card p='xl' radius='lg' withBorder shadow='xs' mt={'lg'}>
                    <div className='' style={{ position: 'relative', marginTop: 10 }} ref={scrollRef}>
                        <PreviewFormBanner
                            data={data}
                            setData={setData}
                            primaryKey={data.id}
                            api={url + '/'}
                        />

                        {
                            (block != null) ? (
                                <Box style={{ transition: 'width 0.2s' }} m={0} mt={10} mb={40}>
                                    <BlockCreator />
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
            </>}


        </>
    );
}

BannerPage.layout = (page: any) => <AdminLayout children={page} title='Desktop Banner Setting' />;
