import { Anchor, Avatar, Center, Flex, Image ,Stack,  Text} from "@mantine/core";
import { NoTemplate, iphone } from "../Index";
import { IconLayoutCollage } from "@tabler/icons-react";

function MessageMediaHeader({data}:any) {
    return  <div style={{ position: 'relative' }}>
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
                <Center>
                    {data.img 
                        ? <Image src={data.img} w={'100%'}  />
                        :  <Stack gap={0} w={'100%'} justify={'center'} align={'center'}>
                            <IconLayoutCollage style={{width: '50%', height: '50%'}} stroke={1} />
                        </Stack>}
                </Center>
                <Stack p={'xs'} gap={0}>
                    <Text fz={13}>{data.text.length > 0 ? data.text : 'Write Something ...'}</Text>
                </Stack> 
            </Stack>
        </Stack>
        <Image radius="md"src={iphone} my={'xs'} />
    </div>
    }

export default MessageMediaHeader;
