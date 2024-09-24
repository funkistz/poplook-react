import AdminLayout from '@/Components/layout/AdminLayout';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AppCard } from '@/Components';
import { IconClock, IconInfoCircle, IconPrinter, IconX } from '@tabler/icons-react';
import { Alert, Button, Divider, Flex, Group, Modal, Paper, Space, Stack, Table, Text, Title } from '@mantine/core';
import { router, useForm, usePage } from '@inertiajs/react';
import { TableSettlement } from './Components';
import { CardCalculator, CashCalculator, EndTime, ListSettlement } from '@/features/retail';
import { CheckNegativeNumber } from '@/features/helper/Index';
import { dummyCard, dummyCash } from '@/features/retail/components/values/values';
import moment from 'moment';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

export default function SettlementDetail({ data, opened, close, notsave, setLoading, settleDate }: any) {
    const contentRef = useRef(null);
    const urlParams = new URLSearchParams(window.location.search);
    var date = (urlParams.get('dates')) ? urlParams.get('dates') : '';
    var time = (urlParams.get('times')) ? urlParams.get('times') : '';
    const [alert, showAlert] = useState<any>(false);
    const [closingDate, setClosingDate] = useState<any>('');

    function paymentList() {
        let payment_type: any = [];
        if (data.paymentList) {
            Object.keys(data.paymentList).forEach(function (key, index, value) {
                payment_type.push(
                    <tr key={key} style={{ borderBottom: '1px solid' }}>
                        <td>{index + 1}</td>
                        <td>{data.paymentList[key]}</td>
                        <td style={{ textAlign: 'right' }}>{'RM ' + data.orderPayment[key]}</td>
                    </tr>
                );
            })
        }
        return payment_type;
    }

    useEffect(() => {
        let date_selected = date + ' ' + time;
        if (settleDate) {
            date_selected = settleDate;
        }
        let dates = (date_selected !== ' ') ? new Date(date_selected) : new Date();

        let date_formatted = moment(dates).format('Do MMMM YYYY HH:mm');
        setClosingDate(date_formatted);
    })


    const afterPrint = async () => {
        let datas = {
            data: data,
            date: date + ' ' + time,
            orderPayment: data.orderPayment
        };
        try {
            if (!notsave) {
                setLoading(true);
                await router.post('settlement/success_settlement', datas, {
                    onFinish: visit => {
                        setLoading(true);
                        window.location.reload();
                    },
                });
            }
        } catch (error) {

        } finally {
            showAlert(false);
            close(false);
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={() => close(false)}>
                {!notsave &&
                    <Alert variant="filled" color="blue" title="Check the data" icon={<IconInfoCircle />}>
                        Please double check the data, once it is printed you cannot edit the data.
                    </Alert>
                }
                <Paper>
                    <div ref={contentRef}>
                        <Title order={1}>Settlement</Title>
                        <div style={{ borderTop: '1px solid' }}>&nbsp;</div>
                        <Text>{data.orderPayment.outlet}</Text>
                        <Text>{'Shift close on ' + closingDate}</Text>
                        <div style={{ borderBottom: '1px solid' }}>&nbsp;</div>
                        <Title mt={30} order={1}>Collection</Title>
                        <div style={{ borderTop: '1px solid' }}>&nbsp;</div>
                        <table width={'100%'} style={{ borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid', textAlign: 'left' }}>
                                    <th>Num</th>
                                    <th>Mode</th>
                                    <th>Actual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentList()}
                                <tr>
                                    <td style={{ fontWeight: 'bold' }}>
                                        Total
                                    </td>
                                    <td></td>
                                    <td style={{ textAlign: 'right' }}>{'RM ' + data.totalSystem}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ borderTop: '1px solid' }}>&nbsp;</div>
                    </div>
                </Paper>
                <Modal opened={alert} withCloseButton={false} closeOnClickOutside={false} onClose={() => showAlert(false)} title="Is the data correct?, Once print you cannot change the data." centered>
                    <Group justify='flex-end'>
                        <Button variant="default" onClick={() => showAlert(false)}>Cancel</Button>
                        <ReactToPrint
                            pageStyle="@page { size: A5; margin: 100px}"
                            trigger={() => <Button><IconPrinter className='print' /> Print</Button>}
                            content={() => contentRef.current}
                            onAfterPrint={() => afterPrint()}
                        />
                    </Group>
                </Modal>
                <Button onClick={() => showAlert(true)}>Confirm</Button>
            </Modal>
        </>
    );

}

SettlementDetail.layout = (page: any) => <AdminLayout children={page} title='Settlement' />;