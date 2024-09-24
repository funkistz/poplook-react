import { Flex, Checkbox, Stack, Text } from "@mantine/core";

function InfoEmail({id, data}: any) {

    return <Flex justify={'space-between'} align={'center'} my={'md'}>
        <Checkbox
            checked={false}
            onChange={() => console.log()}
        />
        <Stack w={'90%'} gap={0}>
            <Text fz={14} fw={700}>POPLOOK TEAM </Text>
            <Text lh={1.2}>{data.subject}</Text>
            <Text fw={400}>{data.preheader}</Text>
        </Stack>
    </Flex>;
}

export default InfoEmail;
