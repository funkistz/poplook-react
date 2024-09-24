import { router, usePage } from '@inertiajs/react';
import { ActionIcon, Badge, Group, ThemeIcon } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable, UpdateButton } from '@/Components';
import moment from 'moment';
import {  IconCheck, IconX } from '@tabler/icons-react';
import { useSessionStorage } from '@mantine/hooks';


export default function CustomerPage() {
    const { list } = usePage<any>().props;

    const [value, setValue] = useSessionStorage({
        key: 'customer-tab',
        defaultValue: 'profile',
    });

    const clicked = (id_customer: any) => {
        setValue('profile')
        window.location.href = '/customer/' + id_customer;
    }

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.firstname + ' ' + value.lastname,
                'email': value.email,
                'age': getAge(value.birthday),
                'news': <ThemeIcon radius={'xl'} color={value.newsletter ? 'green': 'red'} variant='light'>
                    {value.newsletter ? <IconCheck style={{ width: '70%', height: '70%' }} />: <IconX style={{ width: '70%', height: '70%' }} />}
                </ThemeIcon>,
                'opt':  <ThemeIcon radius={'xl'} color={value.optin ? 'green': 'red'} variant='light'>
                    {value.optin ? <IconCheck style={{ width: '70%', height: '70%' }} />: <IconX style={{ width: '70%', height: '70%' }} />}
                </ThemeIcon>,
                'shop': value.shop?.name,
                'action':
                    <Group justify='right' gap='xs'>
                        <UpdateButton onClick={() => clicked(value.id_customer)} />
                    </Group>
            });
        })
        return values;
    }

    const getAge = (data:any) => {
        const convert = Number(moment(data).format('YYYY'));
        const now = Number(moment(new Date()).format('YYYY'))
        const result = now - convert;
        if(result) {
            return result
        }

        return '-'
    }

    return (
        <>
            <AppCard title='Customers'>
                <AppTable
                    data={tableData(list.data)}
                    meta={list}
                    canSort={[{ label: 'name', value: 'firstname' }, { label: 'email', value: 'email' }, { label: 'shop', value: 'id_shop' }]}
                    searchPlaceholder='Search by name or email'
                />
            </AppCard>
        </>
    );

}

CustomerPage.layout = (page: any) => <AdminLayout children={page} title='Customer List' />;