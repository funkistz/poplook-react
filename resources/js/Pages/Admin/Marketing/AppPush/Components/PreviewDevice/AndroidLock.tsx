import { usePage } from "@inertiajs/react";
import { BackgroundImage, Flex, Image, Stack, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { iphone, android } from "../Index";




function AndroidLock({ data }: any) {

    // const width = '80%';
    const width = 250;

    return <>
        {/* <div style={{ position: 'relative' }}>
            <Flex bg={'rgba(255,255,255, 0.7)'}
                w={'55%'}
                style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -45%)',
                    borderRadius: 5,
                }}
                p={'xs'}
                align={'center'}
            >

                <Image src={'https://poplook.com/assets/img/PL_ICON.png'} w={25} h={25} />
                <Stack w={(data.img) ? 130 : 170} gap={0} px={'xs'}>
                    <Text fz={11} fw={500} truncate="end">{data.title ? data.title : 'Title'}</Text>
                    <Text fz={10} w={(data.img) ? 120 : 170} style={{ lineHeight: 1.2 }}>{data.desc ? data.desc : 'Description'}</Text>
                </Stack>


                {data.img && <Image src={data.img} ml={'xs'} w={25} h={25} />}
            </Flex>
            <Image
                radius="md"
                src={android}
                my={'xs'}
                py={35}
                px={60}
            />
        </div> */}
        <Flex justify={'center'} p={'lg'}>
            <Stack w={300} align={'center'}>
                <BackgroundImage src={android}>
                    <Stack justify={'center'} align={'center'} h={620} >
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

export default AndroidLock;
