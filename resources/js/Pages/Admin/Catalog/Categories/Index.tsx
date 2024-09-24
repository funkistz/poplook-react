import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Button, Flex, Group, Highlight, Tooltip, Text } from '@mantine/core';
import { IconPencil, IconKey } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable, UpdateButton } from '@/Components';
import AddButton from '@/Components/Buttons/AddButton';


export default function EmployeePage() {
    const { category_list, search } = usePage<any>().props;

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.id_category + ' - ' + value.categories_lang.name,
                'action':
                    // <Group justify='right' gap='xs'>
                    //     <Link href={route('category.show', { id: value.id_category })}>
                    //         <Button size='xs'>View</Button>
                    //     </Link>
                    // </Group>
                    <Flex justify='left' gap='xs'>
                        {/* <ActionIcon variant="light" color='blue' mx={2} data-id={value.id}>
                            <Link href={route('role.show', { id: value.id })}>
                                <IconPencil></IconPencil>
                            </Link>
                        </ActionIcon> */}
                        <UpdateButton iconOnly={true} link={route('category.show', { id: value.id_category })}></UpdateButton>
                    </Flex>
            });
        })
        return values;
    }

    return (
        <>
            <AppCard
                title='&nbsp;'
                rightComponent={<AddButton color={'green'} size={'xs'}>Add New</AddButton>}
            >
                <AppTable
                    data={tableData(category_list.data)}
                    meta={category_list}
                    // canSort={[{ label: 'name', value: 'name' }]}
                    searchPlaceholder='Search by name'
                />
            </AppCard>
        </>
    );

}

EmployeePage.layout = (page: any) => <AdminLayout children={page} title='Category List' />;