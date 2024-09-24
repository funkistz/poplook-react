
import { useForm } from "@inertiajs/react";
import { Button, ActionIcon, rem, SimpleGrid, Paper, Flex, Stack, Text, Center, TextInput } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";

function CreateCampaignForm({ title, desc, icon: IconComponent, clicked }: any) {

    const { data, setData, post, put, reset, errors, setError } = useForm({
        name: '',
    });

    const submit = () => {
        // console.log('testtss')
        const url = 'app_notification.store';
        post(route(url), {
            data,
            onSuccess: (data: any) => {
                console.log(route(url))
                // router.get( + id + '/segment')
            }
        })
    }
    return <Stack w={'100%'}>
        <TextInput
            label="Campaign Name"
            placeholder="Enter Campaign Name"
            value={data.name}
            onChange={(e) => {setData('name', e.target.value); setError('name','')}}
            error={errors.name}
        />

        <Flex w={'95%'} justify={'space-between'} py={20} style={{ position: 'absolute', bottom: 0, borderTopStyle: 'solid', borderTopColor: '#ced4da', borderTopWidth: 1 }}>
            <Button variant="transparent" color={'gray'} onClick={clicked}>
                Cancel
            </Button>

            <Button color="green" onClick={() => submit()}>
                Create
            </Button>
        </Flex>
    </Stack>
}

export default CreateCampaignForm;
