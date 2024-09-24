
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Group, Button, NumberFormatter, } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable } from '@/Components';
import { getCurrency } from '@/features/helper/Index';
import moment from 'moment';

export default function OrderPage() {
    const { list } = usePage<any>().props;

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            const customerInfo = () => {
                if (value.customer?.firstname && value.customer?.lastname && value.customer?.email) {
                    return <>
                        {value.customer.firstname + ' ' + value.customer.lastname} <br /> {value.customer.email}
                    </>
                }

                return '-';
            }
            values.push({
                'ID Order': value.id_order,
                'reference': value.reference,
                'customer Info': customerInfo(),
                // 'currency': value.currency.iso_code,
                'total': <NumberFormatter
                    value={value.total_paid}
                    prefix={getCurrency(value.id_shop) + ' '}
                />,
                // 'payment type': value.payment,
                'status': value.orderstatelang.name ? value.orderstatelang.name : '-',
                'date': moment(value.date_add).format('DD/MM/YYYY hh:mm A'),
                'action':
                    <Group justify='right' gap='xs'>
                        <Link href={'/order/' + value.id_order}>
                            <Button size='xs'>View</Button>
                        </Link>
                    </Group>
            });
        })
        return values;
    }

    return (
        <>
            <AppCard title='Orders'>
                <AppTable
                    data={tableData(list.data)}
                    meta={list}
                    canSort={[
                        { label: 'ID Order', value: 'id_order' },
                        { label: 'reference', value: 'reference' },
                    ]}
                    searchBy={[
                        { label: 'ID Order', value: 'id_order' },
                        { label: 'Reference', value: 'reference' },
                        { label: 'Email', value: 'email' },
                    ]}
                />
            </AppCard>
        </>
    );

}

OrderPage.layout = (page: any) => <AdminLayout children={page} title='Order List' />;