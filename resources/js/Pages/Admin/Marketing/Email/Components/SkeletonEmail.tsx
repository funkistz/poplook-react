import { Flex, Checkbox, Stack, Skeleton } from "@mantine/core";

function SkeletonEmail() {
    return <Flex justify={'space-between'} align={'center'} my={'md'}>
        <Checkbox
            checked={false}
            onChange={() => console.log()}
        />
        <Stack w={'90%'} gap={0}>
            <Skeleton height={20} w={'70%'} mb={'xs'} radius={0} />
            <Skeleton height={8} mb={5} radius={0} />
            <Skeleton height={8} radius={0} />
        </Stack>
    </Flex>;
}

export default SkeletonEmail;
