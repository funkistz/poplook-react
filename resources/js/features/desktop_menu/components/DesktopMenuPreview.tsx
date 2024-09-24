import React, { useState } from 'react'
import { Box, Group, Stack, Flex, Select, Button } from '@mantine/core'
import { BlockPreview, PreviewTextIconStyle } from '@/features/block_creator';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setShop } from '@/features/block_creator/redux/blockSlice';
import { getShopName } from '@/features/helper/Index';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import classes from './DesktopMenuPreview.module.css';

function DesktopMenuPreview({ data, activeIndex, setActiveIndex }: any) {

    const { shop } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [view, setView] = useState<boolean>(false);

    const getNameByShop = (resource: any, index: any, color: any) => {

        return <>
            <PreviewTextIconStyle
                obj={resource[getShopName(shop)].labelObj}
            />
        </>
    }


    return (
        <>
            <Group justify='space-between'>
                <Button
                    variant={'default'}
                    leftSection={view ? <IconEye /> : <IconEyeOff />}
                    onClick={() => setView(!view)}
                    size='md'
                >
                    Full Preview
                </Button>
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
            {view && <>
                {Array.isArray(data) &&
                    <Box bg={'#fff'} w={'100%'} >
                        <Stack align='center' p='md'>
                            <Group h={'100%'} gap={0} className={classes.hiddenMobile}>
                                {data.map((res: any, index: any) => {

                                    return (<React.Fragment key={index}>
                                        {res.active == 1 && <>
                                            <a className={classes.link} onClick={() => setActiveIndex(index)} style={{ marginLeft: 15, marginRight: 15, cursor: 'pointer' }}>
                                                {getNameByShop(res.resource, index, res.resource[getShopName(shop)].color)}
                                            </a>
                                        </>
                                        }
                                    </React.Fragment>)
                                })}
                            </Group>
                            <Flex className={classes.tabContainer} justify="center" >
                                <BlockPreview shop={shop} block={data[activeIndex]?.block} />
                            </Flex>
                        </Stack>
                    </Box>
                }
            </>}

        </>
    )
}

export default DesktopMenuPreview;
