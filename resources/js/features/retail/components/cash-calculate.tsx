import { useForm } from '@inertiajs/react';
import { Button, Divider, Flex, Group, Modal, NumberFormatter, NumberInput, SimpleGrid, Space, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { cashForm } from './values/values';

export default function CashCalculate({ opened, close, amount, settlementList, setData, reset }: any) {

    const cash = cashForm(amount);

    const calculateTotal = () => {

        const fiveSen = (amount.fiveSen * 0.05).toFixed(2)
        const tenSen = (amount.tenSen * 0.1).toFixed(2)
        const twentySen = (amount.twentySen * 0.20).toFixed(2)
        const fiftySen = (amount.fiftySen * 0.50).toFixed(2)
        const oneRigt = (amount.oneRigt * 1).toFixed(2)
        const twoRigt = (amount.twoRigt * 2).toFixed(2)
        const fiveRigt = (amount.fiveRigt * 5).toFixed(2)
        const tenRigt = (amount.tenRigt * 10).toFixed(2)
        const twentyRigt = (amount.twentyRigt * 20).toFixed(2)
        const fiftyRigt = (amount.fiftyRigt * 50).toFixed(2)
        const hundrRigt = (amount.hundrRigt * 100).toFixed(2)
        const fiftyHundRigt = (amount.fiftyHundRigt * 500).toFixed(2)
        const total = Number(fiveSen) + Number(tenSen) + Number(twentySen) + Number(fiftySen) + Number(oneRigt) + Number(twoRigt) + Number(fiveRigt) + Number(tenRigt) + Number(twentyRigt) + Number(fiftyRigt) + Number(hundrRigt) + Number(fiftyHundRigt);

        let total_var = 0;
        Object.keys(amount.paymentList).forEach(function (key, index, value) {
            // total_var = (Number(displayValue) - settlementList?.[calc_type_system]) + settlementList.cash_variance;
            if (key !== 'cash') {
                total_var = total_var + settlementList?.[key + '_variance'];
            }
        })
        setData('cashEntry', total)
        setData({
            ...amount,
            cashEntry: total,
            settlement_list: {
                ...settlementList,
                cash_entry: total,
                cash_variance: total - settlementList.cash_system
            },
            cashVariance: total - amount.cashSystem,
            // totalVariance: (total - amount.cashSystem) + amount.cardVariance
            totalVariance: (total - settlementList.cash_system) + total_var
        })
    }

    const onClose = () => {
        close()
        reset()
    }


    useEffect(() => {
        calculateTotal()
    }, [amount.fiveSen, amount.tenSen, amount.twentySen, amount.fiftySen, amount.oneRigt, amount.twoRigt, amount.fiveRigt, amount.tenRigt, amount.twentyRigt, amount.fiftyRigt, amount.hundrRigt, amount.fiftyHundRigt])


    return <>
        <Modal opened={opened} onClose={() => close(false)} title={'Cash Count'} size={'xl'} closeOnClickOutside={false} centered>
            <Text>Enter all amounts for cash on hand(including float of RM 500.00)</Text>

            <Space h={'md'} />

            <SimpleGrid cols={3}>
                {cash.map((res: any, i: any) => {
                    return <CustomInput label={'RM ' + res.label} value={res.value} onChange={res.dataValue} update={setData} key={i} />
                })}
            </SimpleGrid>

            <Divider my={'lg'} />

            <Flex justify={'space-between'}>
                <Text>Total <b><NumberFormatter prefix="RM " value={amount.cashEntry} thousandSeparator decimalScale={2} fixedDecimalScale /> / <NumberFormatter prefix="RM " value={settlementList.cash_system} thousandSeparator decimalScale={2} fixedDecimalScale /></b></Text>
                <Group>
                    <Button variant="default" color="gray" onClick={() => reset()}>Reset</Button>
                    <Button color={'green'} onClick={() => close()}>Confirm</Button>
                </Group>

            </Flex>
        </Modal>
    </>
}

function CustomInput({ label, value, data, onChange, update }: any) {
    return <Flex align={'center'}>
        <Text ta={'end'} w={80} mr={'xs'}>{label}</Text>
        <NumberInput placeholder='0' value={value} min={0} onChange={(e) => update(onChange, e)} />
    </Flex>
}
