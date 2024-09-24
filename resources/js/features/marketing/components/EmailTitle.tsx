import { Flex, Stack, Text, Paper, TextInput, Divider } from "@mantine/core";
import { usePage } from "@inertiajs/react";
import { InternalBreadcrumbs } from "..";


function EmailTitle({ title, description, data, rightButton, campaign = '' }: any) {

    const { id } = usePage<any>().props;
    return <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>

        <InternalBreadcrumbs data={data(id)} rightsection={rightButton} />
        
        <Divider my="md" variant="dashed"  />

        <Flex justify={'space-between'} p={'xs'}>
            <Stack w={'50%'} gap={0}>
                <Text fz={26} fw={200}>{title}</Text>
                <Text>{description}</Text>
            </Stack>
            <Stack w={'50%'}>
                <TextInput
                    label="Campaign Name"
                    value={campaign}
                    disabled={true}
                    w={'100%'}
                />
            </Stack>
        </Flex >
    </Paper>;
}

export default EmailTitle;
