import { AppCard, AppTable, DeleteButton } from "@/Components";
import Checkbox from "@/Components/Checkbox";
import MultiSelectApi from "@/Components/Forms/MultiSelectApi";
import { Link, router, useForm } from "@inertiajs/react";
import { ActionIcon, Button, Flex, Grid, TextInput } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

function CustomerGroupAddCustomer(params: any) {
    const { data, setData, post, get, put, reset, errors, setError } = useForm({
        id: params.group.id_group ? params.group.id_group : '',
        id_customer_selected: []
    });

    const [deleteCustomer, setDeleteCustomer] = useState<any>([]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        router.post(route('customer_group.addcustomertogroup'), data);
    }

    const setDeleteCustomerId = (id_customer: any) => {

        setDeleteCustomer([...deleteCustomer, id_customer]);
    }

    const onDelete = (id_group: any) => {
        let delete_customer_id = document.querySelectorAll('#delete_customer_id');
        let delete_customer_id_arr: any = [];
        delete_customer_id.forEach(element => {
            if (element.checked) {
                delete_customer_id_arr.push(element.value);
            }
        });
        let data = {
            id_customer: delete_customer_id_arr
        }
        router.delete(route('customer_group.destroy', id_group), { data });
    }

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'name': value.customer.firstname,
                'email': value.customer.email,
                'shop': value.shop.name,
                'action':
                    <Flex justify='left' gap='xs'>
                        <Checkbox id='delete_customer_id' value={value.id_customer} onChange={(e: any) => setDeleteCustomerId(value.customer.id_customer)} />
                    </Flex>
            });
        })
        return values;
    }

    const headerOptions = {
        'action': { width: '10%', ta: 'center' }
    }

    function handleDataFromChild(data: any) {
        setData('id_customer_selected', data);
    }

    const selectAllCustomer = (e:any) => {
        let delete_customer_id = document.querySelectorAll('#delete_customer_id');
        let delete_customer_id_arr: any = [];
        let all_delete_customer_id = document.getElementById('all_delete_customer_id') as HTMLElement;
        delete_customer_id.forEach(element => {
            if (all_delete_customer_id.checked) {
                element.checked = true;
            }else{
                element.checked = false;
            }
        });
    }

    return <>
        <form onSubmit={onSubmit}>
            <AppCard title={'Add Customer to Group'}>
                <Grid>
                    <Grid.Col span={12}>
                        <MultiSelectApi
                            id='search_customer'
                            label="Customer List"
                            placeholder="Search Customer name or email"
                            description="This list will display the first 1000 record for customer that does not belongs to this group."
                            searchable
                            data={{
                                id: params.group.id_group,
                                group: true //dropdown group
                            }}
                            apiurl={route('customer_group.getcustomerselection')}
                            sendDataToParent={handleDataFromChild}
                        />
                    </Grid.Col>
                </Grid>
                <Flex style={{justifyContent: 'flex-end'}}>
                    <Button color='green' style={{ float: 'right' }} m={10} type='submit'>submit</Button>
                </Flex>
                <Flex style={{justifyContent: 'flex-end'}}>
                    <Checkbox id='all_delete_customer_id' onChange={(e:any) => selectAllCustomer(e)} />
                    <DeleteButton style={{ margin: 10 }} onDelete={() => onDelete(params.group.id_group)} />
                </Flex>
                <AppTable
                    meta={params.customerlist}
                    headerOptions={headerOptions}
                    data={tableData(params.customerlist.data)}
                />
            </AppCard>
        </form >
    </>
}

export default CustomerGroupAddCustomer;