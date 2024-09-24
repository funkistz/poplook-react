import { AppCard, AppTable, ConfirmButton, UpdateButton, } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { Group, Text } from '@mantine/core';
import { exampleListData } from '../../Marketing/Whatsapp/values/listData';
import { usePage } from '@inertiajs/react';
import { getStatusEInvoice } from '@/features/helper/components/status';
import moment from 'moment';

export default function ConsolidationInvoicePage() {

    const { list } = usePage<any>().props;

    console.log('list: ', list)
    
    const date = new Date()

    const getRandomDateInMonth = () => {
        const year = 2024;
        const month = 7; // July
        // Create start and end dates for the specified month and year
        const startDate = moment(`${year}-${month}-01`);
        const endDate = startDate.clone().endOf('month');
        
        // Calculate the difference in days between the start and end dates
        const daysInMonth = endDate.diff(startDate, 'days') + 1;
        
        // Generate a random number of days to add to the start date
        const randomDays = Math.floor(Math.random() * daysInMonth);
        
        // Add the random number of days to the start date
        const randomDate = startDate.clone().add(randomDays, 'days');
        
        return randomDate;
    };
    
    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any, i: any) => {
            values.push({
                'status': getStatusEInvoice(value.status),
                'month': moment(date).subtract(i, 'months').format('MMMM YYYY'),
                'created on': `${getRandomDateInMonth().format('YYYY-MM-DD')} at ${getRandomDateInMonth().format('HH:mm A')}`,
                'send date': `${getRandomDateInMonth().format('YYYY-MM-DD')} at ${getRandomDateInMonth().format('HH:mm A')}`,
                'action' : <Group justify='right' gap='xs'>
                    <UpdateButton link={route('consolodation-invoice.show', {id: 1})} />
                </Group>
            });
        })
        return values;
    }

    return <>
        <AppCard withoutHeader>
            <AppTable
                    data={tableData(exampleListData.data)}
                    meta={exampleListData}
                    // canSort={[{ label: 'created on', value: 'firstname' }, { label: 'send date', value: 'email' }]}
                    searchPlaceholder='Search by month'
                />
        </AppCard>
    </>
}

ConsolidationInvoicePage.layout = (page: any) => <AdminLayout children={page} title='Consolidation Invoice' />;
