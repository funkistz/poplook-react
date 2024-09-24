import { Flex, Text, rem } from "@mantine/core";
import { IconLayoutCollage } from "@tabler/icons-react";

function NoImageUpload({ desc }: any) {
    return <>
        <Flex w={'100%'} style={{ border: '1px solid #eee' }} direction={'column'}>
            <Flex w={'100%'} justify={'center'} mt={'md'}>
                <IconLayoutCollage style={{ width: rem(40), height: rem(40) }} />
            </Flex>
            <Text mb={'md'} ta={'center'}>{desc}</Text>
        </Flex>
    </>
}

export default NoImageUpload;