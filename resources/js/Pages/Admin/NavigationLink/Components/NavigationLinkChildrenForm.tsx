import { AddButton, AppCard, AppTable, UpdateButton } from "@/Components";
import Checkbox from "@/Components/Checkbox";
import { router, useForm, usePage } from "@inertiajs/react";
import { Flex, Button, PasswordInput, Stack, Modal, Grid, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";


function NavigationLinkChildrenForm({ navigation, navchildata, closeModal }: any) {
    const { data, setData, post, put, reset, errors, setError } = useForm({
        id: navchildata ? navchildata.id : '',
        id_navigation_link: navchildata ? navchildata.id_navigation_link : navigation.id,
        label: navchildata ? navchildata.label : 'New Navigation Children Link',
        custom_link: navchildata ? navchildata.link : '',
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        let id_navigation_link = document.getElementById('id_navigation_link') as HTMLInputElement;
        try {
            await post(route('navigation_link.updateorcreatechild'));
            // if (create) {
            //     await post(route('navigation_link.store'));
            // } else {
            //     await put(route('navigation_link.update', id_navigation_link.value));
            // }
        } catch (error) {
            console.log('error', error)
        } finally {
            closeModal();
        }
    }

    return <>
        <form onSubmit={onSubmit}>
            <Grid grow gutter="xs" >
                <Grid.Col span={8}>
                    <TextInput
                        label="Label"
                        placeholder="navigation Child label"
                        value={data.label}
                        onChange={(e) => setData('label', e.target.value)}
                    >
                    </TextInput>
                </Grid.Col>
                <Grid.Col span={8}>
                    <TextInput
                        label="Custom Link"
                        placeholder="Custom Link"
                        description="fill in this box if you are using a different / custom link"
                        value={data.custom_link}
                        onChange={(e) => setData('custom_link', e.target.value)}
                    >
                    </TextInput>
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextInput type='hidden' id='id_navigation_link' value={data.id_navigation_link} />
                    <TextInput type='hidden' id='id_navigation_link_children' value={data.id} />
                    <Button color='green' style={{ float: 'right' }} type='submit' onClick={closeModal}>submit</Button>
                </Grid.Col>
            </Grid>
        </form>
    </>
}

export default NavigationLinkChildrenForm;
