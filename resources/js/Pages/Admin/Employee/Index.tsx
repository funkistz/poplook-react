import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { ActionIcon, Badge, Button, Flex, Group, Highlight, Switch, Tooltip } from '@mantine/core';
import { IconPencil, IconKey, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import AppModal from '@/Components/AppModal';
import EmployeeFormPassword from './Components/EmployeeFormPassword';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable, UpdateButton } from '@/Components';
import { FormCreateBtn } from './Components/Index';


export default function EmployeePage() {
    const { list, role } = usePage<any>().props;
    const [dialogPass, setDialogPass] = useState<boolean>(false);
    const [dialogEdit, setDialogEdit] = useState<boolean>(false);
    const [id, setId] = useState<any>(null);
    const [pass, setPass] = useState<any>('');
    const [confPass, setConfPass] = useState<any>('');

    const { data, setData, post, put, reset, errors, setError } = useForm({
        id_employee: null,
        firstname: '',
        lastname: '',
        password: '',
        confirmpass: '',
    });

    // Modal
    const setDialogPassFunc = (e: any) => {
        setDialogPass(!dialogPass)
        if (dialogPass) {
            return setId(null);
        }
        setId(e.id_employee)
    }
    const setDialogEditFunc = (e: any) => {
        setDialogEdit(!dialogEdit)
        if (dialogEdit) {
            setId(null);
            return
        }
        setId(e.id_employee)
    }

    // API
    const updatePass = async () => {
        try {
            const params = {
                password: pass,
                id_employee: id
            }

            await router.post('employee/update_pass', params);

        } catch (error) {
            console.log('error', error)
        } finally {
            setId(null)
            setPass('')
            setConfPass('')
            setDialogPass(false)
        }
    }

    const activeChecked = async (elem: any, id: any) => {
        try {
            const params = {
                active: elem,
                id_employee: id
            }

            await router.post('employee/update_status', params);

        } catch (error) {
            console.log('error', error)
        } finally {
            setId(null)
            setPass('')
            setConfPass('')
            setDialogPass(false)
        }
    }

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            let role = '';
            if (value.role != null) {
                role = value.role.name;
            }
            values.push({
                'name': value.firstname + ' ' + value.lastname,
                'email': value.email,
                'role': role ? role : '-',
                'active': <Switch
                    checked={value.active}
                    onLabel="Active" offLabel="Inactive"
                    radius="sm"
                    size={'md'}
                    onChange={(e) => activeChecked(e.target.checked, value.id_employee)}
                />,
                'action':
                    <Group justify='right' gap='xs'>
                        <UpdateButton iconOnly={true} link={route('employee.show', {id: value.id_employee})}></UpdateButton>
                        {/* <Link href={route('employee.show', { id: value.id_employee })}>
                            <Button size='xs'>View</Button>
                        </Link> */}
                    </Group>
            });
        })
        return values;
    }

    return (
        <>
            <AppModal
                data={<EmployeeFormPassword pass={pass} confPass={confPass} setPass={setPass} setConfPass={setConfPass} />}
                opened={dialogPass}
                close={setDialogPassFunc}
                title={'Change Password'}
                closeOutside={false}
                closeOnEscape={false}
                textSubmit={'Reset Password'}
                center={true}
                size={'lg'}
                action={updatePass}
                submitColor={'green'}
                disabledBtn={(pass.length > 0 && confPass.length > 0 && pass === confPass) ? false : true}
            ></AppModal>

            <AppCard
                title='Employee'
                rightComponent={<FormCreateBtn />}>
                <AppTable
                    data={tableData(list.data)}
                    meta={list}
                    canSort={[{ label: 'name', value: 'firstname' }, { label: 'email', value: 'email' }, { label: 'active', value: 'active' }]}
                    searchPlaceholder='Search by name or email'
                    filterBy={role}
                />
            </AppCard>
        </>
    );

}

EmployeePage.layout = (page: any) => <AdminLayout children={page} title='Employee List' />;