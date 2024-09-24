import { AppTable } from '@/Components'
import { ActionIcon, Button, Divider, Flex, LoadingOverlay, Modal, ScrollArea, Text, TextInput, UnstyledButton } from '@mantine/core'
import moment from 'moment';
import { IconCircleArrowRight, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function ListDetailsSettlement({ opened, close, title, data = [] }: any) {

    const [list, setList] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState<any>(false);

    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any, index: any) => {
            values.push({
                'datetime': <Text>{moment(value.datetime).format('DD MMMM YYYY HH:mm A')}</Text>,
                'order ID': <UnstyledButton>
                    <Flex align={'center'}>
                        {/* <Link href={route('payInStore.show', value.order_by_reference.id_order)}> */}
                        <a href={route('payInStore.show', value.id_order)} target='_blank'>
                            <IconCircleArrowRight style={{ width: 20, height: 20, color: 'green', marginRight: 5 }} stroke={1.5} />
                            {value.id_order}
                        </a>
                        {/* </Link> */}
                    </Flex>
                </UnstyledButton>,
                'paid': value.order_payment_by_reference.amount,
                'total': value.total_paid,
            });
        })
        return values;
    }

    const orderDetails = async (id_order: any) => {
        try {
            setLoading(true);
            await router.get('payInStore/' + id_order);
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    const onClose = () => {
        close(null)
        setList([])
        setSearch('')
    }

    const filter = () => {
        if (search.length == 0) {
            return setList(data)
        }

        const result = list.filter((order: any) => order.orderId.includes(search));
        setList(result)
        return
    }


    useEffect(() => {
        setList(data)
    }, [opened])

    useEffect(() => {
        filter()
    }, [search])

    return <>
        <Modal opened={opened} onClose={onClose} title={title} size={'xl'} closeOnClickOutside={false} centered>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <div>
                <Flex justify={'end'} mb={'xs'} w={'100%'}>
                    <TextInput size={'xs'} miw={200} placeholder='Search OrderID' value={search} onChange={(e) => setSearch(e.target.value)}
                        rightSection={search.length > 0 && <ActionIcon variant="transparent" color="gray" onClick={() => setSearch('')}>
                            <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>} />
                </Flex>

                <ScrollArea.Autosize>
                    <AppTable data={tableData(list)} />
                    {Array.isArray(list) && list.length == 0 && <>
                        <Text fz={14} c={'dimmed'} py={'xs'} ta={'center'}>No Data Found</Text>
                        <Divider />
                    </>}
                </ScrollArea.Autosize>

                <Flex style={{ position: 'sticky', bottom: 0, left: 0 }} bg={'#fff'} w={'100%'}>
                    <Flex w={'100%'} justify={'space-between'} align={'center'} mx={'xs'} my={'xs'}>
                        <Text fz={14}>Select a sale to view details and adjust payments(s)</Text>
                        <Button mr={'xs'} variant="outline" color="green">Done</Button>
                    </Flex>
                </Flex>
            </div>
        </Modal>
    </>
}
