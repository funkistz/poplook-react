import { Alert, Button, Flex, Group, Modal, TextInput, Text, Select } from '@mantine/core'
import React, { useEffect } from 'react'
import { FormCreate } from './Index';
import { useDisclosure } from '@mantine/hooks';
import { useForm, usePage } from '@inertiajs/react';
import { IconInfoCircle } from '@tabler/icons-react';

export default function EmployeeFormCreate({ opened, open, close }: any) {
    const { flash, status, list, role }: any = usePage().props;
    const { data, setData, post, put, reset, errors, setError } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        id_role: '',
    });

    useEffect(() => {
        if (flash.message == 'Email already exists') {
            setError('email', flash.message)
        }
    }, [flash])

    useEffect(() => {
        if (flash.type != 'error') {
            onClose()
        }
    }, [list])

    const onSubmit = async (e: any) => {

        e.preventDefault();

        if (!errors.firstname && !errors.lastname && !errors.email) {
            try {
                await post(route('employee.store'));
            } catch (error) {
                console.log('error', error)
            } finally {

            }
        }
    }

    const onClose = () => {
        close();
        onReset();
    }

    const onReset = () => {
        reset();
        setError({
            firstname: '',
            lastname: '',
            email: '',
            id_role: '0',
        });
    }


    const handleInput = (type: any, value: any) => {
        if (type == 'firstname') {
            setData(type, value);
            if (value.length == 0) {
                setError(type, 'Firstname Required');
            } else {
                setError(type, '');
            }
        }

        if (type == 'lastname') {
            setData(type, value);
            if (value.length == 0) {
                setError(type, 'Firstname Required');
            } else {
                setError(type, '');
            }
        }

        if (type == 'email') {
            setData(type, value);
            if (value.length > 0) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    setError(type, 'Invalid email address');
                } else {
                    setError(type, '');
                }
            }
        }
    }

    const disabledBtn = () => {
        if (data.firstname.length > 0 && data.lastname.length > 0 && data.email.length > 0) {
            if (!errors.firstname && !errors.lastname && !errors.email) {
                return false
            }
            return true
        }

        return true
    }

    const roleData = role.map((elem: any, index: any) => {
        return { value: "" + elem.value + "", label: elem.label }
    });

    return <>

        <Modal size="xl" opened={opened} onClose={onClose} title="Add New Employee" closeOnClickOutside={false}>
            <form onSubmit={onSubmit} style={{ height: '100%' }}>
                <Flex justify={'space-between'} my={'xs'}>
                    <TextInput
                        label='Firstname'
                        placeholder='Enter lastname'
                        onChange={(e) => handleInput('firstname', e.target.value)}
                        w={'100%'}
                        mr={'xs'}
                        value={data.firstname}
                        error={errors.firstname}
                    />

                    <TextInput
                        label='Lastname'
                        placeholder='Enter lastname'
                        onChange={(e) => handleInput('lastname', e.target.value)}
                        w={'100%'}
                        value={data.lastname}
                        error={errors.lastname}
                    />
                </Flex>

                <TextInput
                    label='Email'
                    placeholder='Enter email'
                    my={'xs'}
                    value={data.email}
                    onChange={(e) => handleInput('email', e.target.value)}
                    error={errors.email}
                />

                <Select
                    label="Role"
                    placeholder="Choose Role"
                    data={roleData}
                    onChange={(e) => setData('id_role', e)}
                />

                <Alert mt={10} variant="light" color="blue" icon={<IconInfoCircle />}>
                    Initial password: <strong>12345</strong>. Change it after your first login for better security.
                </Alert>
                <Flex justify={'end'} mt={'xs'}>
                    <Group>
                        <Button type={'button'} variant="light" color="gray" onClick={() => onReset()}>
                            Reset
                        </Button>
                        <Button type='submit' disabled={disabledBtn()}>
                            Create
                        </Button>
                    </Group>
                </Flex>
            </form>
        </Modal>

    </>
}
