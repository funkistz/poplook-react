import { Text, SimpleGrid, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import MYCount from "./MyCount";
import USDCount from "./USDCount";
import SGDCount from "./SGCount";


function DashboardShopTotalCount() {

    const my = 20;

    useEffect(() => {

    }, [])

    return <>
        <Flex my={my} direction={'column'}>
            <Text color="dark" fw={600}>Customer</Text>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <MYCount color={'blue'} label={'Malaysia'} />
                <SGDCount color={'orange'} label={'Singapore'} />
                <USDCount color={'grape'} label={'Other'} />
            </SimpleGrid>
        </Flex>

    </>
}

export default DashboardShopTotalCount;
