import { Flex, Image } from "@mantine/core";

function WithImage({ img }: any) {
    return <>
        <Flex w={'100%'} style={{ border: '1px solid #eee' }}>
            <Flex w={'100%'} justify={'center'} my={'md'}>
                <Image w={'60%'} src={img} />
            </Flex>
        </Flex>
    </>
}

export default WithImage;