import { ActionIcon, Flex, Tooltip, Text, Stack, Paper, Select } from '@mantine/core';
import { AppCard } from '@/Components';
import { Link } from '@inertiajs/react';

export default function CardQuickAccess({ options, data = [] }: any,) {

    const card = (res: any, i: any) => {

        const { icon: IconComponent, name, url } = res;

        // return <Tooltip key={i} label={res.name}>
        //     <ActionIcon variant="light" color="gray" size="lg" radius="xl" m={'xs'}>
        //         <IconComponent style={{ width: '70%', height: '70%' }} stroke={1.5} />
        //     </ActionIcon>
            
        // </Tooltip>

        return <Paper key={i} radius="md" m={'xs'} p={'xs'} w={'10%'}  withBorder component={Link} href={url}>
            <Stack gap={0} justify='center' align={'center'}h={'100%'} >
                <IconComponent style={{ width: '35%', height: '35%', color: 'gray' }} stroke={1.5} />
                <Text fz={10} ta={'center'} mt={5} c={'dark'}>{name}</Text>
            </Stack>
        </Paper>
       
    }

    return <>
        <AppCard title={"Quick Access"} options={{ h: options?.h ? options?.h : '100%' }}>
            <Flex mx={'xs'} direction={'row'} wrap={'wrap'}>
                {data.map((res: any, i: any) => {
                    return card(res, i);
                })}
            </Flex>
        </AppCard>
    </>
}
