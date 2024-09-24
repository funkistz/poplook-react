import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard } from '@/Components'
import { Button, Flex, Group, Popover, Select, Stack, TextInput } from '@mantine/core';
import { DateInput, MonthPicker } from '@mantine/dates';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDisclosure } from '@mantine/hooks';


export default function CreateContactGroupPage() {
    const [value, setValue] = useState<Date | null>(null);
    // const [opened, setOpened] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const group = [
        { label: 'Lapsed Customer', value: '0'},
        { label: 'Edm Bulk', value: '1'},
    ]

    const { shop } = usePage<any>().props;
    const { data, setData, post, put, reset, errors, setError, processing } = useForm({
        id: null,
        name: '',
        shop: '',
        group: '',

        // Lapsed Customer
        month: '',
    });

    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await post(route('content_group.store') ,{
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        } catch (error) {
            console.log('error', error)
        } finally {
            // onClose()
        }
    }
    
    return <>
        <AppCard title="Create">
            <form onSubmit={onSubmit}>
                <Stack gap={'xs'}>
                    <TextInput
                        label="Name"
                        placeholder="Enter Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                    />

                    <Select label="Shop"
                        placeholder="Choose Shop"
                        data={shop ?? []}
                        value={data.shop ? data.shop : null}
                        onChange={(e:any) => setData('shop', e)}
                        error={errors.shop}
                    />

                    <Select label="Group"
                        placeholder="Choose Group"
                        data={group ?? []}
                        value={data.group ? data.group : null}
                        onChange={(e:any) => setData('group', e)}
                        error={errors.group}
                    />

                    {data.group == '0'  && <>
                        <Popover width={300} position="bottom-start" withArrow shadow="md" opened={opened} onClose={() => close()}>
                            <Popover.Target>
                                <TextInput
                                    label="Last Month"
                                    placeholder="Choose Month"
                                    readOnly
                                    value={data.month ? moment(data.month).format('MMM YYYY'): ''}
                                    onClick={() => open()}
                                    error={errors.month}
                                />
                            </Popover.Target>
                            <Popover.Dropdown>
                                <MonthPicker 
                                    onChange={(e:any) => {
                                        setData('month', moment(e).format('DD-MMM-YYYY'))
                                        close()
                                    }} 
                                    maxDate={new Date()}
                                />
                            </Popover.Dropdown>
                        </Popover>
                    </>}

                    <Flex justify={'end'} mt={'xs'}>
                        <Group gap={'xs'}>
                            <Button variant="default" onClick={() => reset()}>Reset</Button>
                            <Button color='green' type="submit" disabled={processing}>Submit</Button>
                        </Group>
                    </Flex>
                </Stack>
            </form>
        </AppCard>
    </>
}

CreateContactGroupPage.layout = (page: any) => <AdminLayout children={page} title='Contact Group' back={true} />;
