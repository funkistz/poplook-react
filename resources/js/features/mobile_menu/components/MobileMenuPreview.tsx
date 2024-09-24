import { setShop } from '@/features/block_creator/redux/blockSlice';
import { getShopName } from '@/features/helper/Index';
import { Flex, Tabs, ScrollArea, Box, Group, Select, Button } from '@mantine/core'
import { ThunkDispatch } from '@reduxjs/toolkit';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classes from './MobileMenuPreview.module.css';
import { PreviewTextIconStyle } from '@/features/block_creator';
import { PreviewDesktopBanner } from '@/features/preview_banner';

function MobileMenuPreview({ data, setActiveIndex }: any) {


    const { shop } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [view, setView] = useState<boolean>(true);

    return (
        <>
            <Group justify='space-between'>
                <Button
                    variant={'default'}
                    leftSection={view ? <IconEye /> : <IconEyeOff />}
                    onClick={() => setView(!view)}
                >Preview</Button>
                {view && <Select
                    placeholder="Shop"
                    data={[
                        { value: '1', label: 'MYR' },
                        { value: '2', label: 'SGD' },
                        { value: '3', label: 'USD' },
                    ]}
                    onChange={(val) => dispatch(setShop(Number(val)))}
                    defaultValue={shop.toString()}
                />}
            </Group>
            {view && <Flex justify={'center'}>
                <Box w={400}>
                    {Array.isArray(data) && <Flex>
                        <Tabs color={'gray'} defaultValue="0" w={400} bg={'#eee'}>
                            <Tabs.List style={{ borderBottom: 0 }}>
                                <ScrollArea type={'never'} w={'100%'}>
                                    <Flex direction={'row'}>
                                        {data.map((res: any, index: any) => {

                                            return <React.Fragment key={index}>
                                                {(res.active == 1 && Array.isArray(res.block)) && <>
                                                    {res.resource[getShopName(shop)]?.labelObj && <Tabs.Tab value={index.toString()} onClick={() => setActiveIndex(index)} className={classes.linkMobile} key={index}>
                                                        <Flex direction={'row'}>
                                                            <PreviewTextIconStyle obj={res.resource[getShopName(shop)]?.labelObj} />
                                                        </Flex>
                                                    </Tabs.Tab>}
                                                </>}

                                            </React.Fragment>
                                        })}
                                    </Flex>
                                </ScrollArea>
                            </Tabs.List>

                            {data.map((res: any, index: any) => {
                                return <Tabs.Panel key={index} value={index.toString()} style={{ overflowY: 'auto', height: 600, scrollbarWidth: 'none' }}>
                                    <PreviewDesktopBanner json={res.block} shop={shop} mobile={true} />
                                </Tabs.Panel>
                            })}
                        </Tabs>
                    </Flex>}
                </Box>
            </Flex>}


        </>
    )
}

export default MobileMenuPreview;