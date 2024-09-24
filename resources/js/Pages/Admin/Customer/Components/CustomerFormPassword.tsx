import { AppCard } from "@/Components";
import { router, useForm } from "@inertiajs/react";
import { Flex, Button, PasswordInput, Stack } from "@mantine/core";
import { useEffect, useState } from "react";


function CustomerFormPassword({ customer }: any) {

    const { data, setData, post, put, reset, errors, setError } = useForm({
        password: '',
        confirmPassword: '',
        id_customer: customer?.id_customer,
    });

    useEffect(() => {
        if (data.password != data.confirmPassword) {
            setError('confirmPassword', 'Password not matched!');
        } else {
            setError('confirmPassword', '');
        }

    }, [data.password, data.confirmPassword])


    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await post(route('customer.update_pass'));
        } catch (error) {
            console.log('error', error)
        } finally {
            setData({
                password: '',
                confirmPassword: '',
                id_customer: customer?.id_customer
            })
        }
    }

    return <>
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
            <AppCard
                title='Change Password'
                options={{ h: '100%' }}
                rightComponent={
                    <Button
                        size={'xs'}
                        disabled={((data.password == '' && data.confirmPassword == '') || data.password != data.confirmPassword)}
                        type="submit">Submit</Button>
                }>
                <Flex direction={'column'} align={'center'} justify="start" h={'100%'}>
                    <PasswordInput
                        placeholder="Password"
                        label="Password"
                        withAsterisk
                        value={data.password}
                        error={errors.password}
                        w={'100%'}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <PasswordInput
                        placeholder="Re-enter new password"
                        label="Re-enter new password"
                        withAsterisk
                        value={data.confirmPassword}
                        error={errors.confirmPassword}
                        onChange={(e) => setData('confirmPassword', e.target.value)}
                        my={20}
                        w={'100%'}
                    />
                </Flex>
            </AppCard>
        </form>
    </>
}

export default CustomerFormPassword;
