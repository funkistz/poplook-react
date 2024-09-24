import { Text, Group, Button, Badge, Flex, Stack, Divider, Space, NumberFormatter } from '@mantine/core';
import { AddButton, AppCard } from '@/Components';
import { useState } from 'react';
import { PayInStorePaymanet, TableOrder } from './Index';

export default function OrderDetails({ order , isPayInStore = false }: any) {
    const [payNow, setPayNow] = useState<any>(false);

    const setTotal = (price: any, shipping: any) => {
        var total = price + shipping;
        return total.toFixed(2);
    }

    const address = (props: any) => {
        if (props.address) {
            return <Text fz={14}>
                {order.address?.firstname + ' ' + order.address?.lastname}
                <br />
                {order.address?.address1 && <>{order.address?.address1} <br /></>}
                {order.address?.address2 && <>{order.address?.address2} <br /></>}
                {order.address?.postcode + ' ' + order.address?.city}
                <br />
                {order.address.state?.name ? order.address.state?.name : '' + ' ' + order.address?.countrylang.name}
                <br />
                {order.address.phone ? order.address.phone : '-'}
            </Text>
        }

        return '-'
    }

    return (
        <>
            {/* <AppCard title={'Customer Information'} rightComponent={isPayInStore && <Button onClick={() => setPayNow(true)} color='dark' size={'xs'}>Pay Now</Button>}> */}
            <AppCard title={'Customer Information'} rightComponent={isPayInStore && order.current_state !== 48 && <AddButton onClick={() => setPayNow(true)} label='Pay Now'></AddButton>}>
                <Stack gap={0} mx={'xs'}>
                    <Stack gap={0}>
                        <Group my={'xs'} align='top'>
                            <Stack gap={0}>
                                <Text fw={500}>{order.customer.firstname + ' ' + order.customer.lastname}</Text>
                                <Text fw={500} size="sm">({order.customer.email})</Text>
                            </Stack>

                            <Badge color="gray" variant="light" >
                                # {order.customer.id_customer}
                            </Badge>
                        </Group>

                        <Flex justify={'space-between'}>
                            <Stack gap={0}>
                                <Text fz={14}>Account registered: <span style={{ color: 'gray' }}>{order.customer.date_add}</span></Text>
                                <Text fz={14}>Valid orders placed: <span style={{ color: 'gray' }}>{order.customer.email}</span></Text>
                                <Text fz={14}>Total spent since registration:
                                    <span style={{ color: 'gray' }}>
                                        <NumberFormatter
                                            prefix={order.currency.sign + ' '}
                                            value={order.total_paid}
                                        />
                                    </span>
                                </Text>
                            </Stack>
                            <Stack gap={0}>
                                <Text fz={14}>Ref Num: <span style={{ color: 'gray' }}>{order.reference}</span></Text>
                                <Text fz={14}>Shop: <span style={{ color: 'gray' }}>{order.shop.name}</span></Text>
                                <Text fz={14}>Cart number: <span style={{ color: 'gray' }}>#{order.id_cart}</span></Text>
                            </Stack>
                        </Flex>
                    </Stack>

                    <Divider my={'xl'} />

                    <Flex justify={'space-between'}>
                        <Stack gap={0} w={'50%'}>
                            <Text fz={14} fw={700} mb={'xs'}>Shipping Address</Text>
                            {address(order)}
                        </Stack>
                        <Stack gap={0} w={'50%'}>
                            <Text fz={14} fw={700} mb={'xs'}>Billing Address</Text>
                            {address(order)}
                        </Stack>
                    </Flex>

                    <Space h={'xl'} />

                    <TableOrder data={order} isPayInStore={isPayInStore}/>
                   
                    <Flex justify={'space-between'} mb={'xs'}>
                        <Stack gap={0}>
                            <Text fz={14} fw={'bolder'} tt={'capitalize'}>Payment Info:</Text>
                            <Text fz={14}>Payment Type: {order.order_payment_by_reference ? order.order_payment_by_reference.payment_method : order.payment}</Text>
                            <Text fz={14}>Status: {order.orderstatelang?.name ? order.orderstatelang.name : '-'}</Text>
                            <Text fz={14}>Transaction ID: {order.order_payment_by_reference ? order.order_payment_by_reference.transaction_id : '-'}</Text>
                        </Stack>

                        <Stack gap={0}>
                            <Flex justify={'space-between'} w={300}>
                                <Text fz={14}>Sub Total</Text>
                                <Text fz={14}>
                                    <NumberFormatter
                                        prefix={order.currency.sign + ' '}
                                        value={order.total_paid ? order.total_paid : '-'}
                                    />
                                </Text>
                            </Flex>
                            <Flex justify={'space-between'} w={300}>
                                <Text fz={14}>Shipping</Text>
                                <Text fz={14}>
                                    <NumberFormatter
                                        prefix={order.currency.sign + ' '}
                                        value={order.total_shipping ? order.total_shipping : '-'}
                                    />
                                </Text>
                            </Flex>
                            <Flex justify={'space-between'} w={300}>
                                <Text fz={14}>Discount</Text>
                                <Text fz={14}>
                                    <NumberFormatter
                                        prefix={order.currency.sign + ' '}
                                        value={order.total_discounts}
                                    />
                                </Text>
                            </Flex>
                            <Flex justify={'space-between'} w={300}>
                                <Text fz={14} fw={700}>Total</Text>
                                <Text fz={14} fw={700}>
                                    <NumberFormatter
                                        prefix={order.currency.sign + ' '}
                                        value={setTotal(Number(order.total_paid), Number(order.total_shipping))}
                                    />
                                </Text>
                            </Flex>
                        </Stack>
                    </Flex>

                    <Divider my={'xl'} />

                    <Flex justify={'space-between'} mb={'xl'}>
                        <Stack gap={0} w={'50%'} px={'xs'}>
                            <Text fz={14} fw={'bolder'} tt={'capitalize'}>Gift Message</Text>
                            {order?.cart.gift ? 
                                <Text fz={14} fs="italic">{order?.cart.gift_message}</Text>
                                :
                                <Text fz={14}>No Message Available.</Text> 
                            }
                            
                        </Stack>
                        <Stack gap={0} w={'50%'} px={'xs'}>
                            <Text fz={14} fw={'bolder'} tt={'capitalize'}>Order Message</Text>
                            <Text fz={14}>No Message Available.</Text>
                        </Stack>
                    </Flex>
                </Stack>
            </AppCard>

            <PayInStorePaymanet opened={payNow} close={setPayNow} id={order.id_order} />
        </>
    );

}


