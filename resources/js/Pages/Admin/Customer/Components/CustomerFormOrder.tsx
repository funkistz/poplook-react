import { AppCard, AppTable } from "@/Components";
import { Link, usePage } from "@inertiajs/react";
import { Badge, Button, Flex, Group, Skeleton, Text } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";


function CustomerListOrder() {
    const { customer } = usePage<any>().props;

    const [meta, setMeta] = useState<any>(null);

    const getOrders = async () => {
       
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const params = {
            search: urlParams.get('search'),
            per_page: urlParams.get('per_page')
        }

        await axios.get('/api/order/getOrdersUser/' + customer.id_customer, { params })
            .then(response => {
                setMeta(response.data)
            })
            .catch(error => {
                setMeta([])
            });
    }

    useEffect(() => {
        getOrders()
    },[])

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'order no': <Badge variant="light" color="gray"># {value.id_order}</Badge>,
                'status': value.orderstatelang?.name,
                'tracking no': value.ordernetsuite?.tracking_number ? value.ordernetsuite.tracking_number: '-' ,
                'delivery info': value.carrier.name,
                'date': moment(value.date_upd).format('DD/MM/YYYY hh:mm A'),
                'action': <Group justify='right' gap='xs'>
                    <Link href={'/order/' + value.id_order}>
                        <Button size='xs'>View</Button>
                    </Link>
                </Group>
            });
        })
        return values;
    }

    return <>
        <AppCard title='Order History'>          
            {meta != null ? 
                meta?.data.length > 0 ? 
                <>
                <AppTable
                    data={tableData(meta?.data ? meta.data : [])}
                    meta={meta}
                    searchPlaceholder='Search by ID Order'
                />
                </>
                
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
    </>


}

export default CustomerListOrder;
