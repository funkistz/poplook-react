import AppLayout from '@/Components/AppLayout';
import { Alert, Grid, SimpleGrid, Text } from '@mantine/core';
import DashboardShopTotalCount from './Components/ShopBy/Index';
import DashboardOrderTotalCount from './Components/OrderBy/Index';
import AdminLayout from '@/Components/layout/AdminLayout';
import { CardBarChart, CardQuickAccess, CardSparkLine, CardTable } from '@/features/dashboard';
import { IconInfoCircle, IconReportMoney, IconShoppingCart, IconUsers } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';



export default function DashboardPage() {

    const icon = <IconInfoCircle />;
    return (
        <>
            <Alert variant="light" color="red" title="No Role" icon={icon}>
                Oops Looks like your role is not set, please contact your System Admin.
            </Alert>
        </>
    );
}

DashboardPage.layout = (page: any) => <AdminLayout children={page} title='Dashboard' />;
