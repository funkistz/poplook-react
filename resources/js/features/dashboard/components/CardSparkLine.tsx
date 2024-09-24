import { ActionIcon, Box, Flex, Group, NumberFormatter, Paper, Skeleton, Slider, Stack, Text, Transition, rem } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { Sparkline } from '@mantine/charts';
import { getCurrency } from '@/features/helper/Index';


export default function CardSparkLine({ options, data = [], icon: Icon }: any,) {

    const convertTotal = () => {
        return <NumberFormatter
            value={options?.total}
            prefix={options?.id_shop ? getCurrency(options?.id_shop) : ''}
            thousandSeparator
        />
    }

    return <>
        <Paper radius={'lg'} p={'lg'} withBorder>
            {data != null ? 
                <>
                    <Stack gap={0} mb={'xs'}>
                        <Flex align={'center'}>
                            <ActionIcon
                                    variant={options?.variant ? options.variant : 'light'}
                                    radius={options?.radius ? options.radius : 'xl'}
                                    color={options?.color ? options.color : 'blue'}
                                    size={options?.size ? options.size : 'xl'}>
                                    {Icon ? <Icon style={{ width: '70%', height: '70%' }} stroke={1.5} /> : <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                                </ActionIcon>
                                <Stack gap={0} ml={'md'}>
                                    <Text fz={17} fw={600}>{options?.total ? convertTotal() : 0}</Text>
                                    <Text fz={14} c={'dimmed'}>{options?.title ? options.title : 'Title'}</Text>
                                </Stack>
                        </Flex>
                    </Stack>

                    <Sparkline
                        w={'100%'}
                        h={options?.height ? options.height : 60}
                        data={data.recent_count}
                        curveType={options?.curveType ? options.curveType : 'natural'}
                        color={options?.color ? options.color : 'blue'}
                        fillOpacity={0.6}
                        strokeWidth={2}
                    />
                </>
                :
                <>
                    <Stack gap={0} mb={'xs'}>
                        <Flex align={'center'}>
                            <Skeleton height={50} circle />
                            <Stack gap={0} ml={'md'} style={{flexGrow: 1}}>
                                <Skeleton height={10}  mb={'xs'}/>
                                <Skeleton height={10}  />
                            </Stack>
                        </Flex>
                    </Stack>

                    <Skeleton h={options?.height ? options.height : 60} />
                </>
            }
        </Paper>
    </>
}
