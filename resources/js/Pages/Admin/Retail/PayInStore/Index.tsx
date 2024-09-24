import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppTable, UpdateButton } from '@/Components';
import { payInstore } from '@/features/retail/components/values/values';
import { ActionIcon, Badge, Box, Button, Flex, FocusTrap, Grid, Group, Loader, LoadingOverlay, Select } from '@mantine/core';
import moment from 'moment';
import { getShopName } from '@/features/helper/Index';
import { router, useForm, usePage } from '@inertiajs/react';
import FilterTop from '@/Components/FilterTop';
import { IconCaretDown } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function PayInStorePage() {
    const { pis_list, outlet_list } = usePage<any>().props;
    const [opened, { toggle }] = useDisclosure(false);
    const urlParams = new URLSearchParams(window.location.search);
    var outlet_filter = (urlParams.get('outlet')) ? urlParams.get('outlet') : '0';
    const { data, setData, post, processing, errors } = useForm({
        outlet: (outlet_filter) ? outlet_filter : '0'
    })
    const [loading, setLoading] = useState<any>(false);

    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any, index: any) => {
            values.push({
                'order ID': value.id_order,
                'order Reference': value.reference,
                'customer Info': value.customer.firstname + ' ' + value.customer.lastname,
                'total': value.total_paid,
                'payment status': (value.current_state == 48) ? <Badge color="green">{value.orderstatelang.name}</Badge> : <Badge variant="light" color="blue">{value.orderstatelang.name}</Badge>,
                // 'status': <Badge variant="light" color="blue">{value.status}</Badge>,
                // 'date': moment(value.data).format('DD/MM/YYYY HH:mm A'),
                'shop': value.payment,
                'action':
                    <Group justify='right' gap='xs'>
                        <UpdateButton iconOnly={true} link={'/payInStore/' + value.id_order} />
                    </Group>
            });
        })
        return values;
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
                <Button color='green' id="pay_in_store_filter" onClick={(e: any) => pisFilter(e)} mr="xs">Filter</Button>
            </Grid.Col>
        </>
    }

    const pisFilter = async (e: any) => {

        // var test = document.getElementById(e.target.id)?.dataset;
        const urlParams = new URLSearchParams(window.location.search);
        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${urlParams}`;
        data.outlet = data.outlet;

        try {
            setLoading(true);
            await router.get(newUrl, data);
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    return (
        <>
            {outlet_list &&
                <FilterTop title={'Filters'} children={filterchild(outlet_list)} opened={true} rightComponents={<ActionIcon onClick={toggle}><IconCaretDown></IconCaretDown></ActionIcon>} />
            }

            <Box style={{ marginTop: '10px' }} pos="relative">
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <AppCard title={'Pay In Store'}>
                    {/* ...other content */}
                    <AppTable
                        data={tableData(pis_list.data)}
                        meta={pis_list}
                        searchPlaceholder='Search by name or email'
                        autoFocus={true}
                    // meta={payInstore}
                    // canSort={[{ label: 'created on', value: 'firstname' }, { label: 'send date', value: 'email' }]}
                    // searchPlaceholder='Search by name or email'
                    />
                </AppCard>
            </Box>
        </>
    );

}

PayInStorePage.layout = (page: any) => <AdminLayout children={page} title='Pay In Store' />;