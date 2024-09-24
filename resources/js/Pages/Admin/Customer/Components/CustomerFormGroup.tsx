import { AppCard } from "@/Components";
import { getGroups } from "@/features/data_dropdown/redux/DataDropdown";
import { router, useForm, usePage } from "@inertiajs/react";
import { Flex, Button, MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function CustomerFormGroup({ customer, group }: any) {

    const { data, setData, post, put, reset, errors, setError } = useForm({
        id_customer: customer?.id_customer,
        group: group ? group : [],
    });
    const { listGroup } = usePage<any>().props;

    useEffect(() => {
        // console.log('list group: ', data.group)
    }, [])


    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await post(route('customer.update_group'));

        } catch (error) {
            console.log('error', error)
        } finally {
            // setId(null)
            // setPass('')
            // setConfPass('')
            // setDialogPass(false)
        }
    }

    return <>
        <form onSubmit={onSubmit}>
            <AppCard title='Update Group' options={{ h: '100%' }} rightComponent={<Button size={'xs'} type="submit">Submit</Button>}>
                <MultiSelect
                    placeholder="Pick one"
                    searchable
                    nothingFoundMessage="No options"
                    data={listGroup}
                    value={data.group}
                    clearable
                    onChange={(newValue) => setData('group', newValue)}
                    mb={'md'}
                />
            </AppCard>
        </form>
    </>
}

export default CustomerFormGroup;
