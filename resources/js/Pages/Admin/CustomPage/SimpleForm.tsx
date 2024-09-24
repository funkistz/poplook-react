import React from 'react';
import { AppInput, AppTextArea } from '@/Components';
import { router, useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function SimpleForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        url: values ? values.url : '',
        description: (values && values.description) ? values.description : '',
    });

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/\s+/g, '-').toLowerCase();
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('custom_page.store'), {
                data,
                onSuccess: (data: any) => {
                    console.log('data', data.props?.params?.id)

                    data.props?.params?.id ? router.get(route('custom_page.show', data.props?.params?.id)) : '';
                    // router.get(route('custom_page', 1));
                },
            });
        } else {
            put(route('custom_page.update', id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>

                <AppInput label='Name' required description='*display at mobile app only.' id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Url' required description='*url for web.' id='url' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('url', urlSafe(e.target.value))} />
                <AppTextArea label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
