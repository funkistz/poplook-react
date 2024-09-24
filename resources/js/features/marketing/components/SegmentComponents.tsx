import { Flex, Stack, Text, Paper, Tabs, ThemeIcon } from "@mantine/core";
import { GridAds} from "..";
import { AppCard } from "@/Components";
import { useState } from "react";
import { predictive, saved, standard } from "./values/dummyData";


function SegmentComponents() {

    const [segment, setSegment] = useState<any>('standard');

    const paper = (res:any, i: any) => {
        return <Paper key={i} radius={0} withBorder p={'xl'}>
            <Stack gap={'xs'} m={'md'}>
                <Flex align={'center'}>
                    <ThemeIcon size={'xl'} variant="light" color={'green'}>
                        <res.icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ThemeIcon>
                    <Text ml={'xs'} fz={18} fw={500}>{res.title}</Text>
                </Flex>
                <Text fz={14} c={'dimmed'}>{res.desc}</Text>
            </Stack>
    </Paper>
    }

    return <AppCard title={'Segments'}>
        <Tabs variant="outline" value={segment} onChange={setSegment}>
            <Tabs.List>
                <Tabs.Tab value="standard">Standard</Tabs.Tab>
                <Tabs.Tab value="predictive">Predictive</Tabs.Tab>
                <Tabs.Tab value="saved">Saved</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="standard">
                <GridAds data={standard} />
            </Tabs.Panel>

            <Tabs.Panel value="predictive">
                <GridAds data={predictive} />
            </Tabs.Panel>

            <Tabs.Panel value="saved">
                <GridAds data={saved} />
            </Tabs.Panel>
        </Tabs>
    </AppCard>
}

export default SegmentComponents;
