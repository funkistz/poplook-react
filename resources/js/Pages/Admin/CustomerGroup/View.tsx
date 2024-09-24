import AdminLayout from '@/Components/layout/AdminLayout';
import React, { useEffect, useState } from 'react'
import { router, useForm, usePage } from '@inertiajs/react';
import { Flex, Paper, SimpleGrid, Grid, TextInput, Button, List, Autocomplete, MultiSelect } from '@mantine/core';
import { AppCard, AppTable } from '@/Components';
import axios from 'axios';
import MultiSelectApi from '@/Components/Forms/MultiSelectApi';
import CustomerGroupNameForm from './Components/CustomerGroupNameForm';
import CustomerGroupAddCustomer from './Components/CustomerGroupAddCustomer';

export default function CustomerGroupViewPage() {

    const { group, customer_list, customer_selection, create } = usePage<any>().props;
    const { data, setData, post, get, put, reset, errors, setError } = useForm({
        id: group.id_group ? group.id_group : '',
        id_customer_selected: ''
    });
    const [dataFromChild, setDataFromChild] = useState<any>();

    const onSubmit = (e: any) => {
        e.preventDefault();
        setIdCustomerSelection(e);
        let id_customer = document.getElementById('search_customer');
        router.post(route('customer_group.addcustomertogroup'), data);
    }

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.customer.firstname,
                'action':
                    <Flex justify='left' gap='xs'>
                        {/* <Link href={route('customer_group.show', { id: value.id_group })}>
                            <ActionIcon>
                                <IconPencil></IconPencil>
                            </ActionIcon>
                        </Link> */}
                    </Flex>
            });
        })
        return values;
    }

    const setIdCustomerSelection = (e: any) => {
        console.log(e);
    }

    const headerOptions = {
        'action': { width: '10%', ta: 'center' }
    }

    function handleDataFromChild(data: any) {
        // setDataFromChild(data);
        setData('id_customer_selected', data);
    }

    return (
        <>
            <CustomerGroupNameForm
                data={group}
            />
            {create == false &&
                <CustomerGroupAddCustomer
                    group={group}
                    customerlist={customer_list}
                />
            }
            {/* <form onSubmit={onSubmit}>
                <AppCard title={'Add Customer to Group'}>
                    <Grid>
                        <Grid.Col span={12}>
                            <MultiSelectApi
                                id='search_customer'
                                label="Customer List"
                                placeholder="Search Customer name or email"
                                searchable
                                data={{
                                    id: group.id_group,
                                }}
                                apiurl={route('customer_group.getcustomerselection')}
                                sendDataToParent={handleDataFromChild}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Button color='green' style={{ float: 'right' }} type='submit'>submit</Button>
                        </Grid.Col>
                    </Grid>
                    <AppTable
                        meta={customer_list}
                        headerOptions={headerOptions}
                        data={tableData(customer_list.data)}
                    />
                </AppCard>
            </form > */}
        </>
    )
}

CustomerGroupViewPage.layout = (page: any) => <AdminLayout children={page} title='Customer Group' />;
