import { Flex, Stack, Text, Paper, TextInput } from "@mantine/core";
import { InternalBreadcrumbs } from '../../Components/Index';
import { data } from "../values/listData";
import { usePage } from "@inertiajs/react";


function EmailTitle({ title, description, value, rightSection }: any) {

    const { id } = usePage<any>().props;

    return <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>

        <InternalBreadcrumbs data={data(id)} rightsection={rightSection} />

        <hr style={{ borderTop: '1px dashed gray', marginTop: 20 }} />

        <Flex justify={'space-between'} p={'xs'}>
            <Stack w={'50%'} gap={0}>
                <Text fz={26} fw={200}>{title}</Text>
                <Text>{description}</Text>
            </Stack>
            <Stack w={'50%'}>
                <TextInput
                    label="Campaign Name"
                    value={value}
                    disabled={true}
                    w={'100%'}
                />
            </Stack>
        </Flex>
    </Paper>;
}

export default EmailTitle;
