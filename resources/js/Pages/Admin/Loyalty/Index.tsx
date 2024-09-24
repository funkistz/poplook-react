import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, createStyles, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip, Loader, Collapse, SegmentedControl, Alert
} from '@mantine/core';
import {
    IconUpload, IconFileZip, IconEye, IconTrash, IconDots, IconAt, IconListSearch, IconHome2, IconGauge, IconChevronRight, IconCircleOff, IconActivity, IconSettings, IconSearch, IconAdjustments, IconX, IconEdit, IconEditCircle, IconPencil, IconSort09, IconSortAscending, IconSortAscending2, IconSortAZ, IconSortAscendingLetters, IconSortZA, IconSortDescending2, IconSquareArrowUp, IconArrowUpBar, IconArrowUp, IconArrowDown, IconArrowUpTail, IconSortDescending, IconCaretUp, IconCaretDown, IconArrowsSort, IconUser, IconKey, IconUsersGroup, IconUsers, IconLink, IconChevronDown, IconArrowBadgeDown, IconArrowBadgeDownFilled, IconLoader, IconArrowsLeftRight, IconCoffee, IconDownload, IconMoneybag, IconPlus, IconChartArrowsVertical, IconInfoCircle, IconFileExport, IconFile
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AppCard from '@/Components/AppCard';
import FilterTop from '@/Components/FilterTop';
import { DateInput, DatePicker } from '@mantine/dates';
import { useDisclosure, useToggle } from '@mantine/hooks';
import axios from 'axios';
import AdminLayout from '@/Components/layout/AdminLayout';
import moment from 'moment';
import { notifications } from '@mantine/notifications';

export default function PicklistPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const [custDateOpened, setCustDateOpened] = useToggle([false, true]);
    const [opened, { toggle }] = useDisclosure(false);
    const [loading, setLoading] = useState('none');
    const [DtLoading, setDtLoading] = useState('block');
    var year_sel = (urlParams.get('year_sel')) ? urlParams.get('year_sel') : new Date().getFullYear();
    var year_sel_cust_from = (urlParams.get('year_sel_cust_from')) ? urlParams.get('year_sel_cust_from') : '';
    var year_sel_cust_to = (urlParams.get('year_sel_cust_to')) ? urlParams.get('year_sel_cust_to') : '';
    const { data, setData, post, processing, errors } = useForm({
        year_sel: year_sel,
        year_sel_cust_from: year_sel_cust_from,
        year_sel_cust_to: year_sel_cust_to,
        // filter_button: filter_button,
    })
    const { list, search, request, param } = usePage<any>().props;
    const [fullfill, setFulfill] = useState<boolean>(false);
    const [loyaltyDate, setLoyaltyDate] = useState<any>();
    const [exportLoyalty, setExportLoyalty] = useState<any>();
    const [fetchFilterButton, setFetchFilterButton] = useState<boolean>(false);
    const customHighlight = (data: any) => {
        if (search != null) {
            return <Highlight color="green" highlight={search} children={"" + data + ""} />
        }
        return data;
    }

    // Components
    const header = [
        {
            "name": "internalid",
            "label": "Internal Id",
            "align": true,
            "width": '10%',
            "sort": false
        },
        {
            "name": "name",
            "label": "Name",
            "align": true,
            "width": '5%',
            "sort": false
        },
        {
            "name": "email",
            "label": "Email",
            "align": true,
            "width": '5%',
            "sort": true
        },
        {
            "name": "country",
            "label": "Country",
            "align": true,
            "width": '5%',
            "sort": false
        },
        {
            "name": "year",
            "label": "Year",
            "align": true,
            "width": '5%',
            "sort": true
        },
        {
            "name": "tier_prev",
            "label": "Previous Tier",
            "align": true,
            "width": '5%',
            "sort": true
        },
        {
            "name": "tier_now",
            "label": "Current Tier",
            "align": true,
            "width": '5%',
            "sort": true
        },
        {
            "name": "currency",
            "label": "Currency",
            "align": true,
            "width": '5%',
            "sort": false
        },
        {
            "name": "amount_prev",
            "label": "Previous Amount",
            "align": true,
            "width": '5%',
            "sort": true
        },
        {
            "name": "amount_now",
            "label": "Current Ammount",
            "align": true,
            "width": '5%',
            "sort": true
        },
    ]
    const row = (res: any) => {
        return <>
            {res.map((res: any, index: any) => {
                var json = JSON.parse(res.content);
                var currency_label = '';
                var tier_prev = '';
                var tier_now = '';
                var country = json['country'];
                if (json['currency'] == 1) {
                    if (!json['country']) {
                        country = 'MY'
                    }
                    currency_label = 'MYR';
                } else if (json['currency'] == 5) {
                    if (!json['country']) {
                        country = 'SG'
                    }
                    currency_label = 'SGD';
                } else if (json['currency'] == 2) {
                    if (!json['country']) {
                        country = 'INTL'
                    }
                    currency_label = 'USD';
                }
                if (res.tier_prev == 2) {
                    tier_prev = 'Silver';
                } else if (res.tier_prev == 3) {
                    tier_prev = 'Gold';
                } else {
                    tier_prev = 'Bronze';
                }
                if (res.tier_now == 2) {
                    tier_now = 'Silver';
                } else if (res.tier_now == 3) {
                    tier_now = 'Gold';
                } else {
                    tier_now = 'Bronze';
                }
                return <Table.Tr key={index}>
                    <Table.Td>{json['internalid']}</Table.Td>
                    <Table.Td>{customHighlight((json['name']) ? json['name'] : res.name)}</Table.Td>
                    <Table.Td>{customHighlight(res.email)}</Table.Td>
                    <Table.Td>{customHighlight(country)}</Table.Td>
                    <Table.Td>{customHighlight(res.year)}</Table.Td>
                    <Table.Td>{customHighlight(tier_prev)}</Table.Td>
                    <Table.Td>{customHighlight(tier_now)}</Table.Td>
                    <Table.Td>{customHighlight(currency_label)}</Table.Td>
                    <Table.Td>{customHighlight(res.amount_prev)}</Table.Td>
                    <Table.Td>{customHighlight(res.amount_now)}</Table.Td>
                    {/* <Table.Td>{customHighlight((json['channel'] == 5) ? json['netamounttax'] : json['fxamount'])}</Table.Td> */}
                </Table.Tr>
            })}
        </>
    }

    const filterchild = (res: any) => {
        return <>
            <Grid.Col span={12}>
                <Flex>
                    <Flex style={{
                        alignItems: 'flex-end'
                    }}>
                        <Select
                            checkIconPosition="right"
                            data={param.year_list}
                            // dropdownOpened
                            label="Loyalty List year"
                            placeholder="Select A year"
                            value={'' + data.year_sel + ''}
                            pr={10}
                            onChange={(e: any) => setData('year_sel', e)}
                        />
                        {res == 'spending' ? (
                            <ActionIcon onClick={() => setCustDateOpened()}><IconArrowsLeftRight></IconArrowsLeftRight> </ActionIcon>
                        ) : (
                            <></>
                        )}

                    </Flex>
                    {/* <Button color={'green'} onClick={() => setCustDateOpened()}>Custom</Button> */}
                    {res == 'spending' ? (
                        <Collapse in={custDateOpened}>
                            <Flex id='custom-date' style={{
                                alignItems: 'flex-end'
                            }}>
                                <DateInput
                                    // value={value}
                                    // onChange={setValue}
                                    valueFormat="DD/MM/YYYY"
                                    label="Custom Date"
                                    placeholder="Date input"
                                    maw={400}
                                    mx="auto"
                                    onChange={(e: any) => setCustomDate('year_sel_cust_from', e)}
                                />
                                To
                                <DateInput
                                    // value={value}
                                    // onChange={setValue}
                                    valueFormat="DD/MM/YYYY"
                                    label="Custom Date"
                                    placeholder="Date input"
                                    maw={400}
                                    mx="auto"
                                    onChange={(e: any) => setCustomDate('year_sel_cust_to', e)}
                                />
                            </Flex>
                        </Collapse>
                    ) : (
                        <></>
                    )}
                </Flex>
            </Grid.Col>
            {/* <Grid.Col span={12}>
                <SegmentedControl
                    radius="xl"
                    size="sm"
                    data={[
                        { label: 'MY', value: '5' },
                        { label: 'SG', value: '6' },
                        { label: 'INTL', value: '7' },
                    ]}
                    value={'' + data.filter_id_shop + ''}
                    onChange={(e: any) => setData('filter_id_shop', e)}
                />
            </Grid.Col> */}
            <Grid.Col span={12} style={{ textAlign: 'right' }}>
                {/* <Button color='green' id="fetchnfilter" onClick={(e) =>setFetchFilterButton(true)}>Fetch & Filter</Button> */}
                <Button color='green' id="fetchnfilter" onClick={(e) => filterLoyaltyfetch(e, 1)} mr="xs">Netsuite Sync</Button>
                {/* <Button color='green' id="filters" onClick={(e) =>setFetchFilterButton(false)}>Filter</Button> */}
                <Button color='green' id="filter" onClick={(e) => filterLoyaltyfetch(e, 0)}>Filter</Button>
            </Grid.Col>
        </>
    }

    useEffect(() => {
        if (param.data_fetch) {
            var filter_button = document.getElementById('filter');
            filter_button?.click();
        }
    })

    const setCustomDate = (label: any, e: any) => {
        let date = moment(e).format('D/MM/YYYY');
        setData(label, date);
    }

    useEffect(() => {
        if (param.notification) {
            notifications.show({
                // title: 'Default notification',
                message: 'The data is being fetch in the background we will send you a notification/email once the fetch is completed. In the meantime you can do other task.',
                color: 'green',
                autoClose: false
            })
        }
    }, [param.notification])

    const filterLoyaltyfetch = async (e: any, fnf: any) => {
        // var test = document.getElementById(e.target.id)?.dataset;
        const urlParams = new URLSearchParams(window.location.search);
        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${urlParams}`;
        if (data.year_sel_cust_from === "" && data.year_sel_cust_to === "") {
            delete data.year_sel_cust_from;
            delete data.year_sel_cust_to;
        } else if (data.year_sel_cust_from && data.year_sel_cust_to) {
            data.year_sel = data.year_sel_cust_from + "|" + data.year_sel_cust_to;
        }
        data.fetch_filter_button = fnf;

        try {
            setDtLoading('none');
            setLoading('block');
            await router.get(newUrl, data);
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    const exportFile = async (e: any) => {
        const urlParams = new URLSearchParams(window.location.search);
        const baseUrl = window.location.href.split('?')[0];
        const param = window.location.href.split('?')[1];
        const param_item = param.split('&');
        const newUrl = `${baseUrl}/export_loyalty?${urlParams}`;
        setExportLoyalty(newUrl);
        var download = false;
        param_item.forEach(element => {
            if (element.includes("filter_tier")) {
                const val = element.split('=')[1];
                if (val == '2' || val == '3') {
                    download = true;
                }
            }
        });
        if (download) {
            document.getElementById('download')?.click();
        } else {
            notifications.show({
                // title: 'Default notification',
                message: 'The data is being process in the background, we will send you a notification/email once the fetch is completed. In the meantime you can do other task.',
                color: 'green',
                autoClose: false
            })
            try {
                await router.get(newUrl);
            } catch (error) {
                console.log('error', error)
            } finally {
            }
        }
    }

    function handleSubmit(e: any) {
        e.stopPropagation();
        const urlParams = new URLSearchParams(window.location.search);
        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}/export_loyalty?${urlParams}`;
        // setExportLoyalty(newUrl);
        // document.getElementById('download')?.click();
        // return true;
        // console.log('You clicked submit.');
    }

    function updateDownloadUrl(e: any) {
        const urlParams = new URLSearchParams(window.location.search);
        const baseUrl = window.location.href.split('?')[0];
        const param = window.location.href.split('?')[1];
        const param_item = param.split('&');
        const newUrl = `${baseUrl}/export_loyalty?${urlParams}`;
        param_item.forEach(element => {
            if (element.includes("filter_tier")) {
                const val = element.split('=')[1];
                if (val == '2' || val == '3') {
                    setExportLoyalty(newUrl);
                }
            }
        });
    }


    return (
        <>
            <Paper p={'xl'}>
                <Tabs defaultValue="tier">
                    <Tabs.List>
                        <Tabs.Tab value="tier" leftSection={<IconChartArrowsVertical></IconChartArrowsVertical>}>
                            Tier
                        </Tabs.Tab>
                        {/* <Tabs.Tab value="spending" leftSection={<IconMoneybag></IconMoneybag>}>
                            Spending
                        </Tabs.Tab> */}
                    </Tabs.List>

                    <Tabs.Panel value="spending">
                        <FilterTop title="Filter" children={filterchild('spending')} opened={opened} rightComponents={<ActionIcon onClick={toggle}><IconCaretDown></IconCaretDown></ActionIcon>}></FilterTop>
                        <Grid>
                            <Grid.Col span={2}></Grid.Col>
                            <Grid.Col span={8}>
                                <Flex style={{
                                    flexDirection: 'column',
                                    flexWrap: 'nowrap',
                                    alignItems: 'center',
                                }}>
                                    <Loader mt={'md'} className='loader' id={'loader'} style={{ display: loading }} />
                                    <Text style={{ display: loading }}>While the data is being <IconDownload></IconDownload> fetched, drink a <IconCoffee></IconCoffee> coffee and relax.</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={2}></Grid.Col>
                            <Grid.Col span={12} style={{ display: DtLoading }}>
                                <Text>This data was last sync with netsuite on <Text fw={700}>{param.last_fetch} ({param.last_fetch_interval}).</Text></Text>
                                <AppDatatable
                                    data={list}
                                    head={header}
                                    row={row(list.data)}
                                    overflow={true}
                                    newData={{
                                        shop: {
                                            data: [
                                                { label: 'MY', value: '5' },
                                                { label: 'SG', value: '6' },
                                                { label: 'INTL', value: '7' },
                                            ], status: true
                                        }
                                    }}
                                />
                            </Grid.Col>
                        </Grid>
                    </Tabs.Panel>

                    <Tabs.Panel value="tier">
                        <FilterTop title="Filter" children={filterchild('tier')} opened={opened} rightComponents={<ActionIcon onClick={toggle}><IconCaretDown></IconCaretDown></ActionIcon>}></FilterTop>
                        <Grid>
                            <Grid.Col span={2}></Grid.Col>
                            <Grid.Col span={8}>
                                <Flex style={{
                                    flexDirection: 'column',
                                    flexWrap: 'nowrap',
                                    alignItems: 'center',
                                }}>
                                    <Loader mt={'md'} className='loader' id={'loader'} style={{ display: loading }} />
                                    {param.alert &&
                                        <Alert variant="light" color="blue" title="Alert title" icon={<IconInfoCircle />}>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
                                        </Alert>
                                    }
                                    {/* <Text >While the data is being <IconDownload></IconDownload> fetched, drink a <IconCoffee></IconCoffee> coffee and relax.</Text> */}
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={2}></Grid.Col>
                            <Grid.Col span={12} style={{ display: DtLoading }}>
                                <Text>This data was last sync with netsuite on <Text fw={700}>{param.last_fetch} ({param.last_fetch_interval}).</Text></Text>
                                <ActionIcon color='green' onMouseEnter={(e)=>updateDownloadUrl(e)} onClick={(e) => exportFile(e)}><IconFileExport></IconFileExport></ActionIcon>
                                <a id='download' style={{
                                    'display': 'none'
                                }} href={exportLoyalty} onClick={(e) => handleSubmit(e)}><IconFileExport></IconFileExport></a>
                                <AppDatatable
                                    data={list}
                                    head={header}
                                    row={row(list.data)}
                                    overflow={true}
                                    newData={{
                                        shop: {
                                            data: [
                                                { label: 'MY', value: '5' },
                                                { label: 'SG', value: '6' },
                                                { label: 'INTL', value: '7' },
                                            ], status: true
                                        },
                                        tier: {
                                            data: [
                                                { label: 'Bronze', value: '1' },
                                                { label: 'Silver', value: '2' },
                                                { label: 'Gold', value: '3' },
                                            ], status: true
                                        }
                                    }}
                                />
                            </Grid.Col>
                        </Grid>
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </>
    );

}

PicklistPage.layout = (page: any) => <AdminLayout children={page} title='Loyalty List' />;