import UploadImageForm from '@/Components/Forms/UploadImageForm';
import { usePage } from '@inertiajs/react';
import { Text, NavLink, Box, TextInput, Switch, MultiSelect, Select, Textarea, Flex, Button, Image, Group, ScrollArea, NumberInput } from '@mantine/core';
import { DateInput, DateTimePicker, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import moment from 'moment';


function ConfigurationInput({ res, index, onChangeData }: any) {
    const { categorylist, appUrl } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);
    const widthForm = '60%';


    const stringToArray = (data: any) => {
        const arrayValue: string[] = data.split(',');
        return arrayValue;
    }

    const updateImgUrl = async (url: any, i: any) => {
        await onChangeData(index, url)
        close();
    }

    useEffect(() => {

    }, [])


    return (
        <>
            <UploadImageForm opened={opened} setOpen={open} setClose={close} setImageSelected={updateImgUrl} />

            {res.value_type == "string" && <>
                <Text>{res.label}</Text>
                <TextInput
                    value={res.configuration.value}
                    onChange={(e) => onChangeData(index, e.target.value)}
                    w={widthForm}
                />
            </>}

            {res.value_type == "number" && <>
                <Text>{res.label}</Text>
                <NumberInput
                    value={res.configuration.value}
                    onChange={(e) => onChangeData(index, e)}
                    w={widthForm}
                />
            </>}

            {res.value_type == "textarea" && <>
                <Text>{res.label}</Text>
                <Textarea
                    minRows={10}
                    value={res.configuration.value}
                    onChange={(e) => onChangeData(index, e.target.value)}
                    w={widthForm}
                />
            </>}

            {res.value_type == "boolean" && <>
                <Text>{res.label}</Text>
                <Switch
                    size='md'
                    checked={res.configuration.value == 1 ? true : false}
                    onChange={(e) => onChangeData(index, e.target.checked)}
                />

            </>}

            {res.value_type == "image" && <Flex justify={'space-between'} w={'100%'}>
                <Text>{res.label}</Text>
                <Flex direction={'column'} w={widthForm}>
                    <Image w={'100%'} mb={10} src={res.configuration.value.includes("assets") ? appUrl + res.configuration.value : res.configuration.value} alt="Upload Image" withPlaceholder />
                    <TextInput
                        value={res.configuration.value}
                        onChange={(e) => onChangeData(index, e.target.value)}
                        w={'100%'}
                    />

                    <Flex justify={'end'} mt={5}>
                        <Button size='xs' color='green' onClick={open}>Upload</Button>
                    </Flex>
                </Flex>

            </Flex>}

            {res.value_type == "datetime" && <>
                <Text>{res.label}</Text>
                <DateTimePicker
                    placeholder="Pick date and time"
                    value={new Date(res.configuration.value)}
                    onChange={(e) => onChangeData(index, moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                    w={widthForm}
                />
            </>}

            {res.value_type == "date" && <>
                <Text>{res.label}</Text>
                <DateInput
                    placeholder="Date input"
                    value={new Date('2023-05-03')}
                    onChange={() => console.log('date')}
                    w={widthForm}
                />
            </>}

            {res.value_type == "time" && <>
                <Text>{res.label}</Text>
                <TimeInput
                    w={widthForm}
                    value={res.configuration.value}
                    onChange={(e) => onChangeData(index, e.target.value)}
                />
            </>}

            {res.value_type == "multiple_select" && <>
                <Text>{res.label}</Text>
                <MultiSelect
                    data={res.option != null ? JSON.parse(res.option) : categorylist}
                    value={stringToArray(res.configuration.value)}
                    placeholder="Pick all that you like"
                    onChange={(e) => onChangeData(index, e)}
                    searchable
                    nothingFound="Nothing found"
                    clearable
                    w={widthForm}
                />
            </>}

            {res.value_type == "select" && <>
                <Text>{res.label}</Text>
                <Select
                    w={widthForm}
                    placeholder="Pick one"
                    data={[
                        { value: 'react', label: 'React' },
                        { value: 'ng', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'vue', label: 'Vue' },
                    ]}
                    onChange={() => console.log('select')}
                />
            </>}
        </>
    );

}
export default ConfigurationInput;