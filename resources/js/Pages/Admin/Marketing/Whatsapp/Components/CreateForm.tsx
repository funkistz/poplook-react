
import { useForm } from "@inertiajs/react";
import { Button, ActionIcon, rem, SimpleGrid, Paper, Flex, Stack, Text, Center, TextInput } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";

function CreateCampaignForm({ title, desc, icon: IconComponent, clicked }: any) {

    const { data, setData, post, put, reset, errors } = useForm({
        name: '',
    });

    return <Stack w={'100%'}>
        <TextInput
            label="Campaign Name"
            placeholder="Enter Campaign Name"
        />

        <Flex w={'95%'} justify={'space-between'} py={20} style={{ position: 'absolute', bottom: 0, borderTopStyle: 'solid', borderTopColor: '#ced4da', borderTopWidth: 1 }}>
            <Button variant="transparent" color={'gray'} onClick={clicked}>
                Cancel
            </Button>

            <Button>
                Create
            </Button>
        </Flex>
    </Stack>
}

export default CreateCampaignForm;
