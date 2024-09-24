import { ActionIcon, Box, Flex, Group, Paper, Skeleton, Stack, Text, Transition, rem } from '@mantine/core';
import { BarChart, Sparkline } from '@mantine/charts';
import { AppCard } from '@/Components';


export default function CardBarChart({ options, data = [], series = [] }: any,) {

    return <>
        <AppCard title={"Statistics This week's sales"} options={{ h: options?.h ? options?.h : '100%' }}>
            {data != null ? 
                data.length > 0 ? 
                <Transition
                    mounted={true}
                    transition="fade"
                    duration={400}
                    timingFunction="ease"
                    >
                    {(styles) => <Flex justify={'center'} align={'center'}>
                        <BarChart
                            h={options?.barHeight ? options?.barHeight : '100%'}
                            data={data}
                            dataKey={options?.dataKey ? options?.dataKey : '-'}
                            series={series}
                            tickLine="none"
                            gridAxis="xy"
                            tooltipAnimationDuration={200}
                            withLegend
                            legendProps={{ verticalAlign: 'top', height: 50 }}
                        />
                    </Flex>}
                </Transition>
                :
                <Transition
                    mounted={true}
                    transition="fade"
                    duration={400}
                    timingFunction="ease"
                    >
                    {(styles) => <Flex justify={'center'} align={'center'} h={options?.barHeight ? options?.barHeight : '100%'}>
                        <Text mb={'xl'}>No results found</Text>
                    </Flex>}
                </Transition>
                
            :
            <>
            <Flex direction={'row'} align={'baseline'}>
                <Skeleton h={250} w={70} ml={75}/>
                <Skeleton h={200} w={70} mx={'xs'}/>
                <Skeleton h={170} w={70} mx={'xs'}/>
                <Skeleton h={200} w={70} mx={'xs'}/>
                <Skeleton h={70} w={70}/>
            </Flex>
            </>}
        </AppCard>
    </>
}
