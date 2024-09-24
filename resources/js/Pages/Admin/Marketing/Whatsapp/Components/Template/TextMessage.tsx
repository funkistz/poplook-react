import { Avatar, Flex, Image, Stack,  Text} from "@mantine/core";
import { iphone } from "../Index";

function TextMessageOnly({data}:any) {
 
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
        <Flex bg={'rgba(255,255,255, 0.7)'} w={'65%'} p={'xs'} align={'center'}
            style={{
                position: 'absolute',
                top: '20%',
                left: '13%',
                borderRadius: 5,
            }}>
                <Text fz={13}>{data.text.length > 0 ? data.text : 'Write Something ...'}</Text>
        </Flex>
        <Image radius="md"src={iphone} my={'xs'} />
    </div>
    }

export default TextMessageOnly;
