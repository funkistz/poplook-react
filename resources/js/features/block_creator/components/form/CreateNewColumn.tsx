import { Paper, SimpleGrid, Text, Skeleton, Flex,  List, Stack } from '@mantine/core';
import { IconBrandZoom } from '@tabler/icons-react';
import { defaultData } from '../../values';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { saveBlock, setActiveParent, } from "../../redux/blockSlice";

const classes: any = {
    paper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        cursor: 'pointer',
        padding: '10px 10px'
    },
    box: {
        cursor: 'pointer'
    }
};

export default function CreateNewChild({ closeModal }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { block, activeParent, activeChild,} = useSelector((storeState: any) => storeState.block);

    const data = defaultData;
    const height = 120;

    const addChild = (data: any = null) => {
        const temp = JSON.parse(JSON.stringify(block));
        let newChild = JSON.parse(JSON.stringify(data.children[0]));

        // activeChild null = Add Function else it use Change Content Type Function
        if (activeChild == null) {
            temp[activeParent].children.push(newChild);
        } else {
            temp[activeParent].children[activeChild] = newChild;
        }

        dispatch(saveBlock(temp))
        dispatch(setActiveParent(null));
        closeModal();
    }

    return (
        <>
            <Text>Components</Text>
            <SimpleGrid cols={4} mt={20}>
                {data.single && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.single) }} style={{ cursor: 'pointer' }}>
                        <SimpleGrid cols={1} spacing={5} verticalSpacing={5} h={height} w='100%'>
                            <Skeleton h={height} className={classes.box} animate={false}></Skeleton>
                        </SimpleGrid>
                        <Text mt={20}>Image or Video</Text>
                    </Paper>
                </>}
                {data.customGrid && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.customGrid) }} style={{ cursor: 'pointer' }}>
                        <SimpleGrid cols={2} spacing={5} verticalSpacing={5} h={height} w='100%'>
                            <Skeleton h={height / 2} className={classes.box} animate={false}></Skeleton>
                            <Skeleton h={height / 2} className={classes.box} animate={false}></Skeleton>
                            <Skeleton h={height / 2} className={classes.box} animate={false}></Skeleton>
                            <Skeleton h={height / 2} className={classes.box} animate={false}></Skeleton>
                        </SimpleGrid>
                        <Text mt={20}>Grid 4x4</Text>
                    </Paper>
                </>}
                {data.carousel && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.carousel) }} style={{ cursor: 'pointer' }}>
                        <Stack h={height} justify='space-between'>
                            <Flex direction={'column'}>
                                <Flex justify={'center'} align={'center'} mt={10}>
                                    <Flex w={'10%'} px={1}>
                                        <Skeleton height={80} animate={false} radius={0} />
                                    </Flex>
                                    <Flex w={'80%'} align={'center'} px={1}>
                                        <Skeleton height={100} animate={false} radius={0} />
                                    </Flex>
                                    <Flex w={'10%'} px={1}>
                                        <Skeleton height={80} animate={false} radius={0} />
                                    </Flex>
                                </Flex>
                                <Flex justify={'center'} mt={'xs'}>
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                </Flex>
                            </Flex>
                        </Stack>
                        <Text mt={20}>Carousel</Text>
                    </Paper>
                </>}
                {data.slider && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.slider) }} style={{ cursor: 'pointer' }}>
                        <Stack h={height} justify='space-between'>
                            <Flex direction={'column'} mt={10}>
                                <Flex justify={'center'} align={'center'}>
                                    <Flex w={'40%'} px={1}>
                                        <Skeleton height={100} animate={false} radius={0} />
                                    </Flex>
                                    <Flex w={'40%'} align={'center'} px={6}>
                                        <Skeleton height={100} animate={false} radius={0} />
                                    </Flex>
                                    <Flex w={'20%'} px={1}>
                                        <Skeleton height={100} animate={false} radius={0} />
                                    </Flex>
                                </Flex>
                                <Flex justify={'center'} h={10} mt={10}>
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                </Flex>
                            </Flex>
                        </Stack>
                        <Text mt={20}>Slider</Text>
                    </Paper>
                </>}
                {data.productList && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.productList) }} style={{ cursor: 'pointer' }}>
                        <Stack h={height} justify='space-between'>
                            <Flex direction={'column'} mt={10}>
                                <Flex justify={'center'} align={'center'}>
                                    <Flex w={'40%'} px={1}>
                                        <Skeleton height={100} animate={false} radius={0} />
                                    </Flex>
                                    <Flex w={'40%'} align={'center'} px={6}>
                                        <Skeleton height={100} animate={false} radius={0} />
                                    </Flex>
                                    <Flex w={'20%'} px={1}>
                                        <Skeleton height={100} animate={false} radius={0} />
                                    </Flex>
                                </Flex>
                                <Flex justify={'center'} h={10} mt={10}>
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                    <Skeleton height={10} animate={false} circle mb="xl" mx={1} />
                                </Flex>
                            </Flex>
                        </Stack>
                        <Text mt={20}>Product List</Text>
                    </Paper>
                </>}
                {data.navigationList && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.navigationList) }} style={{ cursor: 'pointer' }}>
                        <Stack h={height} justify='space-between'>
                            <Flex direction='column' justify={'center'} px={10} h={'auto'} mt={5}>
                                <Text fw={700} c={'dimmed'}>Title</Text>
                                <List size="xs" c={'dimmed'}>
                                    <List.Item>
                                        <Skeleton height={10} w={100} animate={false} />
                                    </List.Item>
                                    <List.Item>
                                        <Skeleton height={10} w={100} animate={false} />
                                    </List.Item>
                                    <List.Item>
                                        <Skeleton height={10} w={100} animate={false} />
                                    </List.Item>
                                    <List.Item>
                                        <Skeleton height={10} w={100} animate={false} />
                                    </List.Item>
                                    <List.Item>
                                        <Skeleton height={10} w={100} animate={false} />
                                    </List.Item>
                                </List>
                            </Flex>
                        </Stack>
                        <Text mt={20}>Navigation List</Text>
                    </Paper>
                </>}
                {data.vimeo && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.vimeo) }} style={{ cursor: 'pointer' }}>
                        <Flex justify={'center'} align={'center'} p={0} h={height}>
                            <IconBrandZoom size={150} color={'#dee2e6'} />
                        </Flex>
                        <Text mt={20}>Vimeo</Text>
                    </Paper>
                </>}
                {data.text && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.text) }} style={{ cursor: 'pointer' }}>
                        <Flex justify={'center'} align={'center'} h={height}>
                            <Text fw={700} fz={45} c={'#dee2e6'} style={{ whiteSpace: 'nowrap' }} p={10}>lorem</Text>
                        </Flex>
                        <Text mt={20}>Text</Text>
                    </Paper>
                </>}
                {data.countdown && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' onClick={(e) => { addChild(data.countdown) }} style={{ cursor: 'pointer' }}>
                        <Flex direction={'row'} align={'center'} h={height}>
                            <Text fz={12} style={{ border: '1px solid #dee2e6', borderRadius: 5, cursor: 'pointer' }} p={5} px={10}>H</Text>
                            <Text fz={12} style={{ border: '1px solid #dee2e6', borderRadius: 5, cursor: 'pointer' }} p={5} px={10} mx={5}>H</Text>
                            :
                            <Text fz={12} style={{ border: '1px solid #dee2e6', borderRadius: 5, cursor: 'pointer' }} p={5} px={10} mx={5}>M</Text>
                            <Text fz={12} style={{ border: '1px solid #dee2e6', borderRadius: 5, cursor: 'pointer' }} p={5} px={10}>M</Text>
                        </Flex>
                        <Text mt={20}>Countdown</Text>
                    </Paper>
                </>}
            </SimpleGrid>
        </>


    )
}
