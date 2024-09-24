import { Anchor, Avatar, Flex, Image ,Stack,  Text} from "@mantine/core";
import { iphone } from "../Index";
import { usePage } from "@inertiajs/react";

function MessageButton({data, url}:any) {
    const { env } = usePage<any>().props;

    return <div style={{ position: 'relative' }}>
        <Flex w={'55%'} p={'xs'} align={'center'}
            style={{
                position: 'absolute',
                top: '8%',
                left: '18%',
                borderRadius: 5,
            }}>
            <Avatar src={'/PL_ICON.png'} size={30}/>
            <Stack w={(data.img) ? 130 : 170} gap={0} px={'xs'}>
                <Text fz={11} fw={600} truncate="end">Poplook</Text>
                <Text fz={10} fw={300} style={{ lineHeight: 1.2 }}>Business Account</Text>
            </Stack>
        </Flex>
        <Stack gap={0} bg={'rgba(255,255,255, 0.7)'} w={'65%'}  align={'center'}
            style={{
                position: 'absolute',
                top: '20%',
                left: '13%',
                borderRadius: 5,
            }}>
            <Stack w={'100%'} gap={0} style={{borderBottom: '1px solid #ccc'}}>
                <Stack p={'xs'} gap={0}>
                    <Text fz={13}>{data.text.length > 0 ? data.text : 'Write Something ...'}</Text>
                </Stack> 
            </Stack>
            <Anchor href={data.linkUrl ? url(): '#'} underline="never" target="_blank" w={'100%'} my={'xs'}>
                <Text ta={'center'}  fz={12}>{data.linkLabel ? data.linkLabel : 'Button Text'}</Text>
            </Anchor>
        </Stack>
        
        <Image radius="md"src={iphone} my={'xs'} />
    </div>
    }

export default MessageButton;
