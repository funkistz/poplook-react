import { AppCard } from "@/Components";
import { router, useForm } from "@inertiajs/react";
import { Flex, Button, Radio, Group, Stack } from "@mantine/core";
import { useEffect, useState } from "react";


function CustomerFormStore({ customer }: any) {

    const { data, setData, post, put, reset, errors, setError } = useForm({
        firstname: customer ? customer.firstname : '',
        lastname: customer ? customer.lastname : '',
        store: customer ? customer.is_store_customer : '',
    });

    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await put(route('customer.update', customer.id_customer));

        } catch (error) {
            console.log('error', error)
        }
    }

    const isStoreOptios = [
        { value: '0', label: 'Normal Customer' },
        { value: '1', label: 'KIV Store' },
        { value: '2', label: 'Staff Purchase' },
    ]

    return <>
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
            <AppCard
                title='Update Store'
                options={{ h: '100%' }}
                rightComponent={
                    <Button
                        size={'xs'}
                        type="submit"
                    >Submit</Button>}>
                <Stack mt={'xs'}>
                    <Radio.Group
                        name={"Store Customer"}
                        value={data.store}
                        onChange={(e) => setData('store', Number(e))}
                    >
                        <Group mb={10}>
                            {isStoreOptios.map((res: any, i: any) => {
                                return <Radio key={i} value={Number(res.value)} label={res.label} />
                            })}
                        </Group>
                    </Radio.Group>
                </Stack>
            </AppCard>
        </form>
    </>
}

export default CustomerFormStore;
