
import { useForm, usePage } from "@inertiajs/react";
import { Button, ActionIcon, rem, SimpleGrid, Paper, Flex, Stack, Text, Center, TextInput, Select } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";

function CreateCampaignForm({ title, desc, icon: IconComponent, clicked }: any) {

    const { shop } = usePage<any>().props;

    const { data, setData, post, put, reset, errors, setError } = useForm({
        name: '',
        type: '',
        template: '',
        loyalty: '',
        shop: ''
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('campaign.email.create'), {
            data,
            onSuccess: (data: any) => {
                clicked()
            }
        })
    }

    const type = [
        { value: 'Single', label: 'Single'},
        { value: 'Recurring', label: 'Recurring'},
    ]

    const template = [
        { value: 'Birthday', label: 'Birthday'},
        { value: 'Welcome', label: 'Welcome'}
    ]

    const loyaly = [
        { value: '3', label: 'Gold'},
        { value: '2', label: 'Silver'},
        { value: '1', label: 'Bronze'},
    ]

    return <form onSubmit={onSubmit}>
        <Stack w={'100%'} gap={'xs'}>
            <TextInput
                label="Campaign Name"
                placeholder="Enter Campaign Name"
                onChange={(e: any) => {setData('name', e.target.value), setError('name', '') }}
                error={errors.name}
            />

            <Select
                label="Type"
                placeholder="Choose Type"
                onChange={(e: any) => {setData('type', e), setError('type', '')}}
                data={type}
                allowDeselect={false}
                error={errors.type}
            />

            {data.type === 'Recurring' && <Select
                label="Type Template"
                placeholder="Choose Template"
                data={template}
                value={data.template}
                onChange={(e:any) => {setData('template', e), setError('template', '')}}
                allowDeselect={false}
                error={errors.template}
            />}

            {data.template == 'Birthday' &&  <Flex justify={'space-between'} gap={'xs'}>
                <Select
                    label="Shop"
                    placeholder="Choose Shop"
                    onChange={(e: any) => {setData('shop', e), setError('shop','')}}
                    data={shop}
                    allowDeselect={false}
                    error={errors.shop}
                />
                <Select
                    label="Loyalty"
                    placeholder="Choose Loyalty"
                    onChange={(e: any) => {setData('loyalty', e), setError('loyalty','')}}
                    data={loyaly}
                    allowDeselect={false}
                    error={errors.loyalty}
                />
            </Flex>}



            <Flex w={'95%'} justify={'space-between'} py={20} style={{ position: 'absolute', bottom: 0, borderTopStyle: 'solid', borderTopColor: '#ced4da', borderTopWidth: 1 }}>
                <Button variant="transparent" color={'gray'} onClick={clicked}>
                    Cancel
                </Button>

                <Button type={'submit'} color="green">
                    Create
                </Button>
            </Flex>
        </Stack>
    </form>
}

export default CreateCampaignForm;
