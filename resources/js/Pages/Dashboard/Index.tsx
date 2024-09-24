import AppLayout from '@/Components/AppLayout';
import { ColorSchemeScript, Grid, SimpleGrid, Text } from '@mantine/core';
import DashboardShopTotalCount from './Components/ShopBy/Index';
import DashboardOrderTotalCount from './Components/OrderBy/Index';
import AdminLayout from '@/Components/layout/AdminLayout';
import { CardBarChart, CardQuickAccess, CardSparkLine, CardTable } from '@/features/dashboard';
import { IconReportMoney, IconShoppingCart, IconUsers } from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { dummy } from './Values/Data';
import axios from 'axios';



export default function DashboardPage() {

    const { shop } = usePage<any>().props;

    const [totalOrderByMonth, setTotalOrderByMonth] = useState<any>(null);
    const [totalUserByMonth, setTotalUserByMonth] = useState<any>(null);
    const [totalSaleByMonth, setTotalSaleByMonth] = useState<any>(null);
    const [totalWeekSale, setTotalWeekSale] = useState<any>(null);
    const [recentOrder, setRecentOrder] = useState<any>(null);

    useEffect(() => {
        reset();
        getTotalOrderbyMonth();
        getTotalSalebyMonth();
        getTotalUserbyMonth();
        getWeekSale();
        getRecentOrder();
    },[shop])

    const reset = () => {
        setTotalOrderByMonth(null);
        setTotalUserByMonth(null);
        setTotalSaleByMonth(null);
        setTotalWeekSale(null);
        setRecentOrder(null);
    }

    const getTotalOrderbyMonth = async () => {
        await axios({
            method: 'get',
            url: '/api/order/getTotalOrderByMonth',
          })
            .then(function (response) {
                setTotalOrderByMonth(response.data)
            });
    }

    const getTotalSalebyMonth = async () => {
        await axios({
            method: 'get',
            url: '/api/order/getTotalSaleByMonth',
          })
            .then(function (response) {
                setTotalSaleByMonth(response.data)
            });
    }

    const getTotalUserbyMonth = async () => {
        await axios({
            method: 'get',
            url: '/api/customer/getTotalUserByMonth',
          })
            .then(function (response) {
                setTotalUserByMonth(response.data)
            });
    }

    const getWeekSale = async () => {
        await axios({
            method: 'get',
            url: '/api/order/getWeekSale',
          })
            .then(function (response) {
                setTotalWeekSale(response.data)
            });
    }

    const getRecentOrder = async () => {
        await axios({
            method: 'get',
            url: '/api/order/getRecentOrder',
          })
            .then(function (response) {
                setRecentOrder(response.data)
            });
    }

    return (
        <>
            <Grid grow>
                <Grid.Col span={12}>
                    <CardQuickAccess
                        options={{ title: 'Quick Access' }}
                        data={dummy}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CardSparkLine
                        options={{
                            title: totalSaleByMonth != null ? 'Sale in ' + moment(totalSaleByMonth.date).format('MMM YYYY') : '',
                            total: totalSaleByMonth != null ?  totalSaleByMonth.data : '',
                            color: 'yellow',
                            height: 100,
                            id_shop: 1,
                        }}
                        data={totalSaleByMonth}
                        icon={IconReportMoney}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CardSparkLine
                        options={{
                            title: totalUserByMonth != null ? 'Total registrations in ' + moment(totalUserByMonth.date).format('MMM YYYY') :  '',
                            total: totalUserByMonth != null ?  totalUserByMonth.data : '',
                            color: 'red',
                            height: 100,
                        }}
                        data={totalUserByMonth}
                        icon={IconUsers}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CardSparkLine
                        options={{
                            title: totalOrderByMonth != null ? 'Total orders in ' + moment(totalOrderByMonth.date).format('MMM YYYY') : '',
                            total: totalOrderByMonth != null ?  totalOrderByMonth.data : '',
                            color: 'blue',
                            height: 100,
                        }}
                        data={totalOrderByMonth}
                        icon={IconShoppingCart}
                    />
                </Grid.Col>
                <Grid.Col span={5}>
                    <CardBarChart
                        options={{ barHeight: 250, dataKey: 'day' }}
                        data={totalWeekSale}
                        series={[{ name: 'sale', color: 'violet.5' }]}
                    />
                </Grid.Col>
                <Grid.Col span={7}>
                    <CardTable
                        options={{ title: 'Recent Orders ' }}
                        data={recentOrder}
                    />
                </Grid.Col>
            </Grid>
        </>
    );
}

DashboardPage.layout = (page: any) => <AdminLayout children={page} title='Dashboard' />;
