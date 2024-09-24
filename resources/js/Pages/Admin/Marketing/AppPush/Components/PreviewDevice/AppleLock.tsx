import { usePage } from "@inertiajs/react";
import { BackgroundImage, Box, Center, Flex, Image, Stack, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { iphone } from "../Index";

function AppleLock({ data }: any) {

    // const width = '75%';
    const width = 250;

    return <>
    <Flex justify={'center'}>
        <Stack w={350} align={'center'}>
            <BackgroundImage src={iphone} h={780}>
                <Stack justify={'center'} align={'center'} h={700}>
                    <Flex bg={'rgba(255,255,255, 0.7)'} w={width} style={{borderRadius: 5}} justify={'space-between'} align={'align'} p={'xs'}>
                        <Flex gap={0} justify={'flex-start'} align={'center'} >
                            <Image src={'/PL_ICON.png'} w={25} h={25} />
                            <Stack gap={0} px={'xs'} w={150}>
                                <Text fz={11} fw={500} lh={1.2}>{data.title ? data.title : 'Title'}</Text>
                                <Text fz={10} w={(data.img) ? 120 : 170} style={{ lineHeight: 1.2 }}>{data.desc ? data.desc : 'Description'}</Text>
                            </Stack>
                        </Flex>
                        {data.img &&  <Stack justify={'center'}>
                            <Image src={data.img} ml={'xs'} w={30} h={30} />
                        </Stack>}
                    </Flex>
                </Stack>
            </BackgroundImage>
        </Stack>
    </Flex>
        
    </>
}

export default AppleLock;
