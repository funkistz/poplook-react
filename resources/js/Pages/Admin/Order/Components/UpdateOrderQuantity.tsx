import { UpdateButton } from '@/Components';
import { router } from '@inertiajs/react';
import { Button, Image, ActionIcon, Flex, Table, NumberInput, NumberFormatter } from '@mantine/core';
import { IconX, IconPencil, IconDeviceFloppy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function UpdateOrderQuantity({ data, isPayInStore }: any) {

    interface ValuesType {
        [key: number]: number;
    }
    const [values, setValues] = useState<ValuesType>({})
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        data.orderdetail.map((res: any, i: any) => {
            setValues(values => ({
                ...values,
                [res.id_order_detail]: res.product_quantity,
            }))
        })
    }, [opened])

    const handleChange = (e: any, id: any) => {
        setValues(values => ({
            ...values,
            [id]: e,
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const payload = { ...values };
        router.put('', payload)
        onClose()
    }

    const onClose = () => {
        setOpened(false)
        data.orderdetail.map((res: any, i: any) => {
            setValues(values => ({
                ...values,
                [res.id_order_detail]: res.product_quantity,
            }))
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {data.orderdetail.length > 0 && <Flex justify={'end'}>
                    {!opened ? (
                        !isPayInStore ?
                            <UpdateButton
                                onClick={() => setOpened(true)}
                                // variant="default"
                                // size="lg"
                                iconOnly={true}
                            // color={'red'}
                            >
                                {/* <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5}></IconPencil> */}
                            </UpdateButton>
                            :
                            <></>
                    )
                        :
                        <>
                            <Flex align={'center'}>
                                <Button type='submit' color='green' size='xs' mr={'xs'} leftSection={<IconDeviceFloppy />}>
                                    Submit
                                </Button>
                                <ActionIcon
                                    onClick={() => onClose()}
                                    variant="filled"
                                    size="lg"
                                    color={'red'}>
                                    <IconX style={{ width: '70%', height: '70%' }} stroke={1.5}></IconX>
                                </ActionIcon>
                            </Flex>

                        </>
                    }
                </Flex>}
                <Table striped withTableBorder withColumnBorders mt={'xs'} mb={'xl'}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Product</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th w={100}>Quantity</Table.Th>
                            <Table.Th>Available Quantity</Table.Th>
                            <Table.Th align='center'>Total</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.orderdetail.length > 0 ?
                            <>
                                {data.orderdetail.map((res: any, i: any) => {
                                    return <Table.Tr key={i}>
                                        <Table.Td>
                                            <Flex align={'end'}>
                                                <Image
                                                    src={'https://poplook.com/img/tmp/product_mini_' + res.product_id + '_' + res.product_attribute_id + '.jpg'}
                                                    w={30}
                                                    mr={'xs'}
                                                />
                                                {res.product_name}
                                            </Flex>
                                        </Table.Td>
                                        <Table.Td>
                                            <NumberFormatter
                                                prefix={data.currency.sign + ' '}
                                                value={(Math.round(res.product_price * 100) / 100).toFixed(2)}
                                            />
                                        </Table.Td>
                                        <Table.Td>
                                            {opened ?
                                                <NumberInput
                                                    value={values[res.id_order_detail]}
                                                    onChange={(e) => handleChange(e, res.id_order_detail)}
                                                    min={0}
                                                />
                                                :
                                                res.product_quantity
                                            }
                                        </Table.Td>
                                        <Table.Td>{res.product_quantity_in_stock}</Table.Td>
                                        <Table.Td>
                                            <NumberFormatter
                                                prefix={data.currency.sign + ' '}
                                                value={(Math.round(res.total_price_tax_incl * 100) / 100).toFixed(2)}
                                            />
                                        </Table.Td>
                                    </Table.Tr>
                                })}
                            </>

                            :
                            <Table.Tr>
                                <Table.Td colSpan={5} align='center'>No Data Found</Table.Td>
                            </Table.Tr>}
                    </Table.Tbody>
                </Table>
            </form>
        </>
    );
}