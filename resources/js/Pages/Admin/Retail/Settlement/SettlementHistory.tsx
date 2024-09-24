import AdminLayout from '@/Components/layout/AdminLayout';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AppCard, AppTable } from '@/Components';
import { IconClock, IconInfoCircle, IconPrinter, IconX } from '@tabler/icons-react';
import { Alert, Button, Divider, Flex, Group, Modal, Paper, Space, Stack, Table, Text, Title } from '@mantine/core';
import { router, useForm, usePage } from '@inertiajs/react';
import { TableSettlement } from './Components';
import { CardCalculator, CashCalculator, EndTime, ListSettlement } from '@/features/retail';
import { CheckNegativeNumber } from '@/features/helper/Index';
import { dummyCard, dummyCash } from '@/features/retail/components/values/values';
import moment from 'moment';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import SettlementDetail from './SettlementDetail';
import axios from 'axios';
export default function SettlementHistory({ data, settlementHistory, opened, close, print }: any) {
    const contentRef = useRef(null);
    const [alert, showAlert] = useState<any>(false);
    const [settlementDetailOpened, setSettlementDetailOpened] = useState<any>(false);
    const [settleHistory, setSettleHistory] = useState<any>(false);
    const [settleDate, setSettleDate] = useState<any>(false);

    const getSettlementHistoryDetails = async (id: any) => {
        try {
            axios.get(route('settlement.getSettlementHistoryDetail', id))
                .then(data => {
                    let result = JSON.parse(data.data.data);
                    let date = data.data.date;
                    setSettleHistory(result);
                    setSettleDate(date);
                    setSettlementDetailOpened(true);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const tableData = (data: any[]) => {
        const values: any = [];
        let table: any = '';
        Object.keys(data).forEach(function (key: any, index: any) {
            let dates = (data[key].date) ? new Date(data[key].date) : new Date();
            let date_formatted = moment(dates).format('D MMMM YYYY HH:mm');
            table = <Table.Tr key={index}>
                <Table.Td>
                    <Button onClick={() => getSettlementHistoryDetails(key)}><IconPrinter /></Button>
                </Table.Td>
                <Table.Td>{'RM ' + data[key].total}</Table.Td>
                <Table.Td>{date_formatted}</Table.Td>
            </Table.Tr>
            values.push(table);
        })
        return values;
    }

    return (
        <>
            {settleHistory &&
                <SettlementDetail notsave={true} settleDate={settleDate} data={settleHistory} opened={settlementDetailOpened} close={setSettlementDetailOpened} />
            }
            <Modal title={'Settlement History'} opened={opened} onClose={() => close(false)}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Print</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th>Date</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {tableData(settlementHistory)}
                    </Table.Tbody>
                </Table>
            </Modal>
        </>
    );

}

SettlementHistory.layout = (page: any) => <AdminLayout children={page} title='Settlement' />;