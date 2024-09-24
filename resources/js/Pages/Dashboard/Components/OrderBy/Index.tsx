import { Text, SimpleGrid, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import OrderPendingOrderCount from "./OrderPendingCount";
import OrderFailOrderCount from "./OrderFailCount";
import OrderSuccessOrderCount from "./OrderSuccessCount";


function DashboardOrderTotalCount() {

    const my = 20;

    useEffect(() => {

    }, [])

    return <>
        <Flex my={my} direction={'column'}>
            <Text color="dark" fw={600}>Order Status</Text>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <OrderPendingOrderCount color={'yellow'} label={'Pending'} />
                <OrderFailOrderCount color={'red'} label={'Fail'} />
                <OrderSuccessOrderCount color={'green'} label={'Success'} />
            </SimpleGrid>
        </Flex>

    </>
}

export default DashboardOrderTotalCount;
