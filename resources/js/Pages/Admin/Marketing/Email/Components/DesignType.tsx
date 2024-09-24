import { FileInput, ActionIcon, rem, SimpleGrid, Paper, Flex, Stack, Text, Center } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";

function DesignType({ title, desc, icon: IconComponent, clicked }: any) {

    const size = 40;
    return <>
        <Paper withBorder radius={0} p={'md'} py={50} component="button" onClick={clicked} style={title ?{ cursor: 'pointer' } : {}}>
            <Center>
                <Stack gap={0} w={'70%'}>
                    <Flex justify={'center'} align={'center'} p={10}>
                        {IconComponent && <IconComponent style={{ width: rem(size), height: rem(size), color: '#1cae49' }} stroke={1.7} />}
                        {title && <Text ml={'xs'} fz={20}>{title}</Text>}
                    </Flex>
                    <Text ta={'center'}>{desc}</Text>
                </Stack>
            </Center>
        </Paper>
    </>;
}

export default DesignType;
