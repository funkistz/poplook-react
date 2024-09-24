import { Flex, Stack, Text, Paper, TextInput, Divider, SimpleGrid, ThemeIcon } from "@mantine/core";
import { usePage } from "@inertiajs/react";


function GridAds({ data, col = 2}: any) {
    const paper = (res:any, i: any) => {
        return <Paper key={i} radius={0} withBorder p={'xl'} style={{cursor: 'pointer'}}>
            <Stack gap={'xs'} m={'md'}>
                <Flex align={'center'}>
                    <ThemeIcon size={'xl'} variant="light" color={'green'}>
                        <res.icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ThemeIcon>
                    <Text ml={'xs'} fz={18} fw={500}>{res.title}</Text>
                </Flex>
                <Text fz={14} c={'dimmed'}>{res.desc}</Text>
            </Stack>
    </Paper>}
    
    return <SimpleGrid cols={col} spacing={0} verticalSpacing={0} my={'md'}>
        {data.map((res:any, i:any) => {
            return paper(res, i);
        })}
    </SimpleGrid>
}

export default GridAds;
