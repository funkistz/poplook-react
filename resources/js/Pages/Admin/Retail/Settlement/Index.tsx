import AdminLayout from '@/Components/layout/AdminLayout';
import { useEffect, useMemo, useState } from 'react';
import { AppCard } from '@/Components';
import { IconCaretDown, IconClock, IconListCheck, IconPrinter, IconX } from '@tabler/icons-react';
import { ActionIcon, Box, Button, Divider, Flex, Grid, Group, LoadingOverlay, Modal, Paper, Select, Space, Stack, Table, Text, Title } from '@mantine/core';
import { router, useForm, usePage } from '@inertiajs/react';
import { TableSettlement } from './Components';
import { CardCalculator, CashCalculator, EndTime, ListSettlement } from '@/features/retail';
import { CheckNegativeNumber } from '@/features/helper/Index';
import { dummyCard, dummyCash } from '@/features/retail/components/values/values';
import moment from 'moment';
import { useDisclosure } from '@mantine/hooks';
import SettlementDetail from './SettlementDetail';
import FilterTop from '@/Components/FilterTop';
import { data } from '../../Marketing/AppPush/values/listData';
import SettlementHistory from './SettlementHistory';
export default function SettlementPage() {
    const { orderPayment, outlet_list, settlement_history }: any = usePage().props;
    const [opened, setOpened] = useState<any>(false);
    const [settlementOpen, setSettlementOpen] = useState<any>(false);
    const [loading, setLoading] = useState<any>(false);
    const [print, setPrint] = useState<any>(false);
    const urlParams = new URLSearchParams(window.location.search);
    var outlet_filter = (urlParams.get('outlet')) ? urlParams.get('outlet') : '0';
    const [openedFilter, { toggle }] = useDisclosure(false);

    const cashTotal = (orderPayment.cash) ? orderPayment.cash : 0;
    const cashCount = (orderPayment.cash_list) ? orderPayment.cash_list.length : 0;
    const cashList = (orderPayment.cash_list) ? orderPayment.cash_list : [];
    const cardTotal = (orderPayment.credit_debit_list) ? orderPayment.credit_debit : 0;
    const cardCount = (orderPayment.credit_debit_list) ? orderPayment.credit_debit_list.length : 0;
    const cardList = (orderPayment.credit_debit_list) ? orderPayment.credit_debit_list : [];
    const paymentList = (orderPayment.payment_type_list) ? orderPayment.payment_type_list : [];
    const totalCounts = (orderPayment.total_count) ? orderPayment.total_count : 0;

    function totals() {
        let totalSystem = 0;
        let totalVariance = 0;
        if (orderPayment.payment_type_list) {
            Object.keys(orderPayment.payment_type_list).forEach(function (key, index, value) {
                totalSystem = totalSystem + orderPayment[key];
                totalVariance = totalVariance + orderPayment[key + '_variance'];
            })
        }
        return {
            totalSystem: totalSystem,
            totalVariance: totalVariance
        };
    }

    let settlement_list: any = {};
    if (orderPayment.payment_type_list) {
        Object.keys(orderPayment.payment_type_list).forEach(function (key, index, value) {
            settlement_list[key + '_count'] = orderPayment[key + '_list'].length;
            settlement_list[key + '_entry'] = orderPayment[key + '_entry'];
            settlement_list[key + '_system'] = orderPayment[key];
            settlement_list[key + '_variance'] = 0 - orderPayment[key];
        })
    }

    const { data, setData, post, put, reset, errors, setError } = useForm({
        settlement_list,
        // Cash
        // cashCount: dummyCash.data.length,
        // cashSystem: cashTotal,
        cashCount: cashCount,
        cashEntry: 0,
        cashSystem: cashTotal,
        cashVariance: 0 - cashTotal,
        fiveSen: 0,
        tenSen: 0,
        twentySen: 0,
        fiftySen: 0,
        oneRigt: 0,
        twoRigt: 0,
        fiveRigt: 0,
        tenRigt: 0,
        twentyRigt: 0,
        fiftyRigt: 0,
        hundrRigt: 0,
        fiftyHundRigt: 0,

        // Card
        cardCount: cardCount,
        cardEntry: 0,
        cardSystem: cardTotal,
        cardVariance: 0 - cardTotal,

        // Total
        // totalCount: dummyCash.data.length + dummyCard.data.length,
        // totalSystem: cashTotal + cardTotal,
        // totalVariance: (0 - cashTotal) + (0 - cardTotal),
        totalCount: totalCounts,
        totalSystem: totals().totalSystem,
        totalVariance: totals().totalVariance,

        //
        datetime: null,
        paymentList: paymentList,
        orderPayment: orderPayment,
        outlet: (outlet_filter) ? outlet_filter : '',
    });

    const [cash, setCash] = useState<boolean>(false)
    const [card, setCard] = useState<boolean>(false)
    const [list, setList] = useState<any>(null)
    const [time, setTime] = useState<any>(false)

    const space = 'lg';

    const title = () => {
        if (orderPayment.payment_type_list) {
            return orderPayment.payment_type_list[list] + ' List';
        }

        return '';
    }

    const receive = () => {
        if (orderPayment.payment_type_list) {
            return orderPayment?.[list + '_list'];
        }

        return [];
    }

    async function finalize(negative: any) {
        let orderPaymentExist = (Array.isArray(orderPayment)) ? false : true;
        try {
            if (!negative && orderPaymentExist) {
                setOpened(true);
            }
        } catch (error) {
            console.log('An error occured.');
        }
    }

    const filterchild = (res: any) => {
        let outlet = outlet_list.map((elem: any, key: any) => {
            return { value: "" + elem.value + "", label: elem.label }
        });
        return <>
            <Grid.Col span={12}>
                <Flex>
                    <Flex style={{
                        alignItems: 'flex-end'
                    }}>
                        <Select
                            checkIconPosition="right"
                            data={outlet}
                            // dropdownOpened
                            label="Store"
                            placeholder="Select Store"
                            value={data.outlet}
                            id='outlet_list'
                            pr={10}
                            clearable
                            onChange={(e: any) => setData('outlet', e)}
                        />
                    </Flex>
                </Flex>
            </Grid.Col>
            <Grid.Col span={12} style={{ textAlign: 'right' }}>
                <Button color='green' id="pay_in_store_filter" onClick={(e: any) => settlementFilter(e)}>Filter</Button>
            </Grid.Col>
        </>
    }

    const settlementFilter = async (e: any) => {
        const urlParams = new URLSearchParams(window.location.search);
        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${urlParams}`;
        let datas = {
            outlet: data.outlet
        };

        try {
            setLoading(true);
            await router.get(newUrl, datas);
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    function getSettlement(e: any) {
        setSettlementOpen(true);
    }

    return (
        <>
            {outlet_list &&
                <FilterTop title={'Filters'} children={filterchild(outlet_list)} opened={true} rightComponents={<ActionIcon onClick={toggle}><IconCaretDown></IconCaretDown></ActionIcon>} />
            }
            <br />
            <Box style={{ marginTop: '10px' }} pos="relative">
                <LoadingOverlay visible={loading} zIndex={1} overlayProps={{ radius: "sm", blur: 2 }} />
                <AppCard title='Settlement' rightComponent={
                    <Group justify="flex-end" w={'50%'}>
                        <Button onClick={() => setTime(true)} variant="outline" leftSection={<IconClock style={{ width: '80%', height: '80%' }} />} color='green'>Specify end time</Button>
                        <Button color='green' onClick={(e: any) => getSettlement(e)} leftSection={<IconListCheck style={{ width: '80%', height: '80%' }} />}>Settlement History</Button>
                        {/* <Button variant="subtle" leftSection={<IconPrinter style={{ width: '80%', height: '80%' }} />} color="gray">Print Preview</Button> */}
                    </Group>
                }>
                    <Flex justify={'space-between'}>
                        <Stack gap={0} w={'50%'}>
                            <Text fw={600}>Settlement for current  shift ({totalCounts} sales)</Text>
                            <Text c={'dimmed'}>Enter actuals below , tap or click on a payment method name to adjust payments. All variances must zero or positive before the settlement can be submitted</Text>
                        </Stack>
                    </Flex>

                    <Space h={space} />

                    <TableSettlement data={data} setCard={setCard} setCash={setCash} setList={setList} />

                    <Space h={space} />

                    <Flex align={'center'} justify={'space-between'}>
                        <Flex>
                            <Button color='green' onClick={() => finalize(CheckNegativeNumber(data.totalVariance))}>Finalize..</Button>
                            {CheckNegativeNumber(data.totalVariance) && <Flex ml={'xs'} align={'center'}>
                                <IconX style={{ width: 20, height: 20 }} color='red' />
                                <Text c={'red'} ml={'xs'}>Remove negative variance before submitting</Text>
                            </Flex>}
                        </Flex>

                        <Text fw={500} fz={14} mr={'xs'}>Specify End Time: <span style={{ color: 'gray' }}><i>{data.datetime ? moment(data.datetime).format('DD/MM/YYYY hh:mm A') : '-'}</i></span></Text>
                    </Flex>
                </AppCard>
            </Box>

            <CashCalculator opened={cash} close={setCash} amount={data} settlementList={data.settlement_list} setData={setData} reset={reset} />
            <CardCalculator opened={card} close={setCard} type={card} data={data} settlementList={data.settlement_list} setData={setData} />
            <ListSettlement opened={list} close={setList} title={title()} data={receive()} />
            <EndTime opened={time} close={setTime} data={data.datetime} setData={setData} reset={reset} setLoading={setLoading} />
            <SettlementDetail data={data} opened={opened} close={setOpened} setLoading={setLoading}/>
            <SettlementHistory data={data} opened={settlementOpen} settlementHistory={settlement_history} print={setPrint} close={setSettlementOpen} />
        </>
    );

}

SettlementPage.layout = (page: any) => <AdminLayout children={page} title='Settlement' />;