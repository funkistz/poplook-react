import AdminLayout from '@/Components/layout/AdminLayout';
import { Text, Button, Group, Drawer, Image, Badge } from '@mantine/core';
import { IconDropletExclamation, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import { useDisclosure } from '@mantine/hooks';
import { AppCard, AppTable, ConfirmButton, DeleteButton, UpdateButton } from '@/Components';
// import { exampleListData } from './Values/data';
import { AddEditForm } from './Components/Index';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getLogo } from './Redux/logoSlice';


export default function LogoPage() {
    const { list } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);
    const [edit, setEdit] = useState(null);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const formProps = useForm({
        id: null,
        name: '',
        logo: '',
        icon: ''
    });

    // table list
    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any, index: any) => {
            values.push({
                'name': value.name,
                'logo': <Image w={80} src={value.logo} />,
                'icon': <Image w={20} src={value.icon} />,
                'status': <Badge variant="light" color={value.status ? 'red' : 'gray'}>{value.status ? 'Live' : 'Offline'}</Badge>,
                '':
                    <Group justify='right' gap='xs'>
                        <DeleteButton
                            disabled={value.status}
                            onDelete={() => router.delete('logo/' + value.id)}
                        />
                        <UpdateButton onClick={() => openEdit(value.id)} />
                        <ConfirmButton
                            label="Live Now"
                            title={'Confirm to Live?'}
                            onConfirm={() => live(value.id)}
                            onOpen={() => formProps.setData('id', value.id)}
                            disabled={value.status}
                        />
                    </Group>
            });
        })
        return values;
    }

    // Function
    const openEdit = (e: any) => {
        const result = list.data.find((res: any) => res.id == e)
        formProps.setData({
            id: e,
            name: result.name,
            logo: result.logo,
            icon: result.icon
        })
        setEdit(e)
        open();
    }
    const closeEdit = () => {
        close();
        setEdit(null)
        formProps.reset();
    }
    const create = (e: any) => {
        formProps.put(route('logo.live', e))
    }
    const live = async (e: any) => {
        try {
            await create(e)
        } catch (error) {

        } finally {
            setTimeout(async () => {
                await dispatch(getLogo());
            }, 500); // 0.5 seconds delay
        }
    }

    return (
        <>
            <AppCard
                title='Logo'
                rightComponent={
                    <Group justify="end">
                        <Button
                            size="xs"
                            leftSection={<IconPlus />}
                            onClick={open}
                        >
                            Create
                        </Button>
                    </Group>
                }>
                <AppTable
                    data={tableData(list.data)}
                    meta={list}
                    canSort={[
                        { label: 'name', value: 'name' },
                        { label: 'status', value: 'status' },
                    ]}
                />
            </AppCard>

            <Drawer opened={opened} onClose={closeEdit} position={'right'} title={edit != null ? 'Edit Logo' : 'New Logo'}>
                <AddEditForm {...formProps} close={closeEdit} />
            </Drawer>
        </>
    );
}

LogoPage.layout = (page: any) => <AdminLayout children={page} title='Logo Settings' />;