import  { useState } from 'react';
import { Paper, SimpleGrid, Text, Skeleton, Image, Flex, Stack, List } from '@mantine/core';
import { defaultData } from '../../values';
import { CreateNewRowCss } from '../../index';
import { IconBrandZoom } from '@tabler/icons-react';

export default function CreateNewRow({ addRow }: any) {

    const [click, setClick] = useState<[string | null, number | null]>([null, null]);

    const data = defaultData;
    const height = 120;

    const previewGrid = (grid: any, type: any, index: any) => {

        const totalItem: number = grid.col * grid.row;
        let items = [];

        for (let i = 0; i < totalItem; i++) {
            items.push({ id: i });
        }

        const height = 120;

        return (
            <Paper key={index} shadow='xl' withBorder p={10} className={(type == click[0] && index == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} radius='md' onClick={(e) => { addRow(grid); setClick([type, index]) }}>
                <SimpleGrid cols={grid.col} spacing={5} verticalSpacing={5} h={height} w='100%'>
                    {items.map((item: any, index2) => {
                        return <Skeleton key={index2} h={height / grid.row} className={CreateNewRowCss.box} animate={false}></Skeleton>;
                    })}
                </SimpleGrid>
                <Text mt={10}>{grid.title}</Text>
            </Paper>
        )

    }

    const previewTemplates = (res: any, type: any, index: any) => {

        const totalItem: number = res.col * res.row;
        let items = [];

        for (let i = 0; i < totalItem; i++) {
            items.push({ id: i });
        }


        return (
            <Paper key={index} shadow='xl' withBorder p={10} className={(type == click[0] && index == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} radius='md' onClick={() => { addRow(res); setClick([type, index]) }}>

                <Stack justify='space-between' h={'100%'}>
                    <Image src={window.location.origin + '/' + res.img} />
                    <Text mt={10}>{res.title}</Text>
                </Stack>
            </Paper>
        )

    }

    return (
        <>
            <Text >Parent Pre-built Grid</Text>

            <Paper bg='#FFD740' p={15} radius={10}>
                <Text fz={14}>This grid contain many child that can be change to anything, such as images, images grid, slider etc</Text>
                <Text fz={14}>Use this if u prefer to customize each child content. different height, width anc content type.</Text>
            </Paper>

            <SimpleGrid cols={4} mt={20}>
                {data.single && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('single' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.single); setClick(['single', 0]); }}>
                        <SimpleGrid cols={1} spacing={5} verticalSpacing={5} h={height} w='100%'>
                            <Skeleton h={height} className={CreateNewRowCss.box} animate={false}></Skeleton>
                        </SimpleGrid>
                        <Text mt={20}>Image or Video</Text>
                    </Paper>
                </>}
                {data.customGrid && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('customGrid' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.customGrid); setClick(['customGrid', 0]) }}>
                        <SimpleGrid cols={2} spacing={5} verticalSpacing={5} h={height} w='100%'>
                            <Skeleton h={height / 2} className={CreateNewRowCss.box} animate={false}></Skeleton>
                            <Skeleton h={height / 2} className={CreateNewRowCss.box} animate={false}></Skeleton>
                            <Skeleton h={height / 2} className={CreateNewRowCss.box} animate={false}></Skeleton>
                            <Skeleton h={height / 2} className={CreateNewRowCss.box} animate={false}></Skeleton>
                        </SimpleGrid>
                        <Text mt={20}>Grid 4x4</Text>
                    </Paper>
                </>}
                {data.carousel && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('carousel' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.carousel); setClick(['carousel', 0]) }}>
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
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('slider' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.slider); setClick(['slider', 0]) }}>
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
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('productList' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.productList); setClick(['productList', 0]) }}>
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
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('navigationList' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.navigationList); setClick(['navigationList', 0]) }}>
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
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('vimeo' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.vimeo); setClick(['vimeo', 0]) }}>
                        <Flex justify={'center'} align={'center'} p={0} h={height}>
                            <IconBrandZoom size={150} color={'#dee2e6'} />
                        </Flex>
                        <Text mt={20}>Vimeo</Text>
                    </Paper>
                </>}
                {data.text && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('text' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.text); setClick(['text', 0]) }}>
                        <Flex justify={'center'} align={'center'} h={height}>
                            <Text fw={700} fz={45} c={'#dee2e6'} style={{ whiteSpace: 'nowrap' }} p={10}>lorem</Text>
                        </Flex>
                        <Text mt={20}>Text</Text>
                    </Paper>
                </>}
                {data.countdown && <>
                    <Paper shadow='xl' withBorder p={10} radius='md' className={('countdown' == click[0] && 0 == click[1]) ? CreateNewRowCss.paperSelected : CreateNewRowCss.paper} onClick={(e) => { addRow(data.countdown); setClick(['countdown', 0]) }}>
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

            <Text mt={50}>Template</Text>
            <SimpleGrid cols={4} mt={10}>
                {data.template.map((res: any, index: any) => {

                    return previewTemplates(res, 'template', index);

                })}
            </SimpleGrid>
        </>
    )
}
