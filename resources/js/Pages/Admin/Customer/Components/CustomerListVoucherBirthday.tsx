import { AppCard, AppTable } from "@/Components";
import { getCurrency } from "@/features/helper/Index";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import {Button, Flex, Group, Modal, Skeleton, Stack, Text} from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;


function CustomerListVoucher() {
    const {  customer } = usePage<any>().props;
    const [opened, setOpened] = useState(false);

    const [meta, setMeta] = useState<any>(null);

    const { data, setData, post, put, reset, errors, setError } = useForm({
        customer_id: customer?.id_customer,
    });

    useEffect(() => {
        getVouchers()
    },[])

    const openModal = () => setOpened(true);
    const closeModal = () => setOpened(false);

    const getVouchers = async () => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const params = {
            search: urlParams.get('search'),
            per_page: urlParams.get('per_page')
        }

        await axios.get('/api/cart_rule/getVoucherByUser/' + data.customer_id, { params })
            .then(response => {
                setMeta(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
                setMeta([])
            });
    }

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'code': value.code,
                'descript': value.description,
                'date': moment(value.date_from).format('DD/MM/YYYY') + " - " + moment(value.date_to).format('DD/MM/YYYY'),
                'discount': value.reduction_percent > 0.00 ? Number(value.reduction_percent) + "%" : getCurrency(value.cart_rule_shop.id_shop) + value.reduction_amount
            });
        })
        return values;
    }

    const confirmationVoucher = (e: any) => {
        e.preventDefault();

        openModal();

    }

    const onSubmit = async (e: any) => {

        e.preventDefault();
        closeModal();
        try {
            await post(route('customer.generate_voucher'));
        } catch (error) {
            console.log('error', error)
        } finally {

        }
    }

    return <>
        <AppCard title='Customer ID - Cart Rules' rightComponent={<form onSubmit={confirmationVoucher}><Button size="xs" type="submit">Generate Voucher</Button></form>}>
            {meta != null ?
                meta?.data.length > 0 ?
                <AppTable
                    data={tableData(meta?.data ? meta.data : [])}
                    meta={meta}
                    searchPlaceholder='Search by Code'
                />
                :
                <Text ml={'xs'}>No results found</Text>
            :
            <>
                <Flex justify={'space-between'}>
                    <Skeleton h={25} w={'10%'} mt={10} />
                    <Skeleton h={25} w={'20%'} mt={10} />
                </Flex>
                <Skeleton h={25} mt={10} />
                <Skeleton h={25} mt={15}/>
                <Skeleton h={25} mt={10}/>
                <Skeleton h={25} mt={'xs'}/>
                <Skeleton h={25} mt={'xs'}/>
                <Skeleton h={25} mt={'xs'}/>
                <Flex justify={'space-between'}>
                    <Skeleton h={25} w={'10%'} mt={10} />
                    <Skeleton h={25} w={'20%'} mt={10} />
                </Flex>
            </>}
        </AppCard>
        <Modal
            opened={opened}
            onClose={closeModal}
            title="Confirmation"
            centered
        >
            <p>Are you sure you want to generate the code? After generation, an email will be sent to
                the customer.</p>
            <Group position="right">
                <Button
                    variant="outline"
                    color="dark"
                    onClick={closeModal}
                    style={{borderColor: 'black', color: 'black'}}
                >
                    Cancel
                </Button>
                <Button color="blue" onClick={onSubmit}>Confirm</Button>
            </Group>
        </Modal>
    </>


}

export default CustomerListVoucher;
