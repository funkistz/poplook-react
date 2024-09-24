import { ActionIcon, Button, Container, Grid, Modal, NumberInput, SimpleGrid, Skeleton, Space, Stack, Text, px, rem, useMantineTheme } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks';
import { IconAdjustments, IconArrowLeft, IconCheck } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'

export default function CashCalculate({ opened, close, data, type, settlementList, setData }: any) {

  const theme = useMantineTheme();

  const BASE_HEIGHT = 250;
  const spacing = px(theme.spacing.md) as number;

  const getSubHeight = (children: number, spacing: number) => BASE_HEIGHT / children - spacing * ((children - 1) / children);

  const btnNumber = (height: any, label: any) => {
    return <ActionIcon w={'100%'} onClick={(e: any) => { inputDigit(e.target.innerText.toString()); }} variant={'light'} size={'xs'} h={height} radius="md" color={'gray'} fz={16}>{label}</ActionIcon>
  }

  const btnOperator = (height: any = 0, label: any) => {
    if (label == '.') {
      return <ActionIcon onClick={() => inputDecimal()} variant={'light'} w={'100%'} color={'gray'} h={height}>
        {label}
      </ActionIcon>
    }

    if (label == '-') {
      return <ActionIcon onClick={() => changeSign()} variant={'light'} w={'100%'} color={'gray'} h={height}>
        {label}
      </ActionIcon>
    }

    if (label == 'c') {
      return <ActionIcon onClick={() => clearDisplay()} variant={'light'} w={'100%'} color={'gray'} h={height}>
        <Text tt={'uppercase'} fz={16}>{label}</Text>
      </ActionIcon>
    }

    if (label == 'back') {
      return <ActionIcon onClick={() => handleBackspace()} variant={'light'} w={'100%'} color={'gray'} h={height}>
        <IconArrowLeft style={{ width: '40%', height: '40%' }} stroke={2} />
      </ActionIcon>
    }

    if (label == '=') {
      return <ActionIcon onClick={() => submit()} variant={'filled'} w={'100%'} color={'green'} h={height}>
        <IconCheck style={{ width: '40%', height: '40%' }} stroke={2} />
      </ActionIcon>
    }
  }

  const [displayValue, setDisplayValue] = useState('0');
  // const [currentValue, setCurrentValue] = useState(0);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: number) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
  };

  const handleBackspace = () => {
    setDisplayValue(displayValue.slice(0, -1));
  };

  const changeSign = () => {
    setDisplayValue((parseFloat(displayValue) * -1).toString());
  };

  const submit = () => {
    close(false)
    let calc_type_entry = type + '_entry';
    let calc_type_variance = type + '_variance';
    let calc_type_system = type + '_system';
    let total_var = 0;
    Object.keys(data.paymentList).forEach(function (key, index, value) {
      // total_var = (Number(displayValue) - settlementList?.[calc_type_system]) + settlementList.cash_variance;
      if (key !== type) {
        total_var = total_var + settlementList?.[key + '_variance'];
      }
    })
    setData({
      ...data,
      cardEntry: displayValue,
      settlement_list: {
        ...settlementList,
        [calc_type_entry]: Number(displayValue),
        [calc_type_variance]: Number(displayValue) - settlementList?.[calc_type_system]
      },
      cardVariance: Number(displayValue) - data.cardSystem,
      // totalVariance: (Number(displayValue) - data.cardSystem) + data.cashVariance
      totalVariance: (Number(displayValue) - settlementList?.[calc_type_system]) + total_var
    })
    setDisplayValue('');
  }

  useHotkeys([
    ['0', (e: any) => inputDigit(e.key)],
    ['1', (e: any) => inputDigit(e.key)],
    ['2', (e: any) => inputDigit(e.key)],
    ['3', (e: any) => inputDigit(e.key)],
    ['4', (e: any) => inputDigit(e.key)],
    ['5', (e: any) => inputDigit(e.key)],
    ['6', (e: any) => inputDigit(e.key)],
    ['7', (e: any) => inputDigit(e.key)],
    ['8', (e: any) => inputDigit(e.key)],
    ['9', (e: any) => inputDigit(e.key)],

    ['.', (e: any) => inputDecimal()],

    ['ENTER', (e: any) => submit()],
    ['-', (e: any) => changeSign()],

    ['Backspace', (e: any) => handleBackspace()],

    ['Delete', (e: any) => clearDisplay()],



  ]);

  return (
    <Modal opened={opened} onClose={() => close(false)} title={'Credit/Debit Card (MY)'} size={'xs'} closeOnClickOutside={false} centered>
      <Text>Enter Actual amount collected:</Text>
      <NumberInput
        value={displayValue}
        prefix='RM '
        thousandSeparator
        // decimalScale={2}
        // fixedDecimalScale
        hideControls
        onChange={(e: any) => setDisplayValue(e)}
        readOnly
      />
      <Space h={'xs'} />
      <SimpleGrid spacing={'xs'} cols={{ base: 1, xs: 4 }}>
        <Stack>
          {btnNumber(getSubHeight(4, spacing), 7)}
          {btnNumber(getSubHeight(4, spacing), 4)}
          {btnNumber(getSubHeight(4, spacing), 1)}
          {btnNumber(getSubHeight(4, spacing), 0)}
        </Stack>
        <Stack>
          {btnNumber(getSubHeight(4, spacing), 8)}
          {btnNumber(getSubHeight(4, spacing), 5)}
          {btnNumber(getSubHeight(4, spacing), 2)}
          {btnOperator(getSubHeight(4, spacing), '.')}
        </Stack>
        <Stack>
          {btnNumber(getSubHeight(4, spacing), 9)}
          {btnNumber(getSubHeight(4, spacing), 6)}
          {btnNumber(getSubHeight(4, spacing), 3)}
          {btnOperator(getSubHeight(4, spacing), '-')}
        </Stack>
        <Stack>
          {btnOperator(getSubHeight(4, spacing), 'back')}
          {btnOperator(getSubHeight(4, spacing), 'c')}
          {btnOperator(getSubHeight(2, spacing), '=')}
        </Stack>
      </SimpleGrid>
    </Modal>
  )
}
