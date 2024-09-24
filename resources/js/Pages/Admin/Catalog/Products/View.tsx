import { AppCard, AppTable } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { getShopName } from '@/features/helper/Index';
import { Link, usePage } from '@inertiajs/react';
import { Button, Group, Stack, Table } from '@mantine/core';
import { Pages, TableContent } from './Components/Index';
import { useEffect, useState } from 'react';
import { links } from './Values/Data';

export default function ProductDetailsPage() {

    const { list, search } = usePage<any>().props;
    const [active, setActive] = useState(links[0].link);

    useEffect(() => {
        console.log(active);
    }, [active])

    return <>

        <Table>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td w={'70%'} style={{ padding: 0, verticalAlign: 'top' }}>
                        <Pages current={active} />
                    </Table.Td>
                    <Table.Td w={'30%'} pl={'xs'} style={{ padding: 0, verticalAlign: 'top' }}>
                        <Stack style={{ position: 'sticky', top: 80 }} >
                            <TableContent current={active} setCurrent={setActive} />
                        </Stack>
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>

    </>
}

ProductDetailsPage.layout = (page: any) => <AdminLayout children={page} title='Product' />;
