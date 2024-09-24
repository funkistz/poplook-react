import { CheckNegativeNumber } from '@/features/helper/Index'
import { Text, Flex, NumberInput, Table, UnstyledButton } from '@mantine/core'
import { IconCircleArrowRight } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'

export default function TableSettlement({ data, setCash, setCard, setList }: any) {
    function paymentTypeList() {
        let paymentTypeList: any = [];
        Object.keys(data.paymentList).forEach(function (key, index, value) {
            let variance = data.settlement_list[key + '_variance'];
            let count = data.settlement_list[key + '_count'];
            let entry_amount = data.settlement_list[key + '_entry'];
            let system_amount = data.settlement_list[key + '_system'];
            paymentTypeList.push(<Table.Tr key={index}>
                <Table.Td>
                    <UnstyledButton w={'100%'} onClick={() => setList(key)}>
                        <Flex align={'center'}>
                            <IconCircleArrowRight style={{ width: 20, height: 20 }} color={'green'} />
                            <Text fz={14} ml={'xs'}>{data.paymentList[key]}</Text>
                        </Flex>
                    </UnstyledButton>
                </Table.Td>
                <Table.Td>{count}</Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={entry_amount}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        readOnly
                        onClick={() => (key == 'cash') ? setCash(true) : setCard(key)}
                        style={{ cursor: 'pointer' }}
                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={system_amount}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        readOnly
                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={variance}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        error={CheckNegativeNumber(variance)}
                        readOnly
                    />
                </Table.Td>
            </Table.Tr>);
        });
        return paymentTypeList;
    }

    return <Table highlightOnHover withTableBorder>
        <Table.Thead>
            <Table.Tr>
                <Table.Th w={'40%'}>Payment method</Table.Th>
                <Table.Th>Count</Table.Th>
                <Table.Th>Actual(entry)</Table.Th>
                <Table.Th>System</Table.Th>
                <Table.Th>+/- Variance</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {paymentTypeList()}
            {/* <Table.Tr>
                <Table.Td>
                    <UnstyledButton w={'100%'} onClick={() => setList('cash')}>
                        <Flex align={'center'}>
                            <IconCircleArrowRight style={{ width: 20, height: 20 }} color={'green'} />
                            <Text fz={14} ml={'xs'}>Cash</Text>
                        </Flex>
                    </UnstyledButton>
                </Table.Td>
                <Table.Td>{data.cashCount}</Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.cashEntry}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        readOnly
                        onClick={() => setCash(true)}
                        style={{ cursor: 'pointer' }}
                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.cashSystem}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        readOnly
                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.cashVariance}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        error={CheckNegativeNumber(data.cashVariance)}
                        readOnly
                    />
                </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>
                    <UnstyledButton w={'100%'} onClick={() => setList('credit_debit')}>
                        <Flex align={'center'}>
                            <IconCircleArrowRight style={{ width: 20, height: 20 }} color={'green'} />
                            <Text fz={14} ml={'xs'}>Credit/Debit Card (MY)</Text>
                        </Flex>
                    </UnstyledButton>
                </Table.Td>
                <Table.Td>{data.cardCount}</Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.cardEntry}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        readOnly
                        onClick={() => setCard(true)}
                        style={{ cursor: 'pointer' }}
                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.cardSystem}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        readOnly
                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.cardVariance}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        readOnly
                        error={CheckNegativeNumber(data.cardVariance)}
                    />
                </Table.Td>
            </Table.Tr> */}
            <Table.Tr>
                <Table.Td>
                    <Text fw={'bold'} fz={14}>Total</Text>
                </Table.Td>
                <Table.Td>{data.totalCount}</Table.Td>
                <Table.Td>

                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.totalSystem}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        prefix={'RM '}
                        placeholder='RM'
                        value={data.totalVariance}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        hideControls
                        fw={600}
                        error={CheckNegativeNumber(data.totalVariance)}
                        readOnly
                    />
                </Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
}
