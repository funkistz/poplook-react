import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip, NumberInput
} from '@mantine/core';
import {
    IconUpload, IconFileZip, IconEye, IconTrash, IconDots, IconAt, IconListSearch, IconHome2, IconGauge, IconChevronRight, IconCircleOff, IconActivity, IconSettings, IconSearch, IconAdjustments, IconX, IconEdit, IconEditCircle, IconPencil, IconSort09, IconSortAscending, IconSortAscending2, IconSortAZ, IconSortAscendingLetters, IconSortZA, IconSortDescending2, IconSquareArrowUp, IconArrowUpBar, IconArrowUp, IconArrowDown, IconArrowUpTail, IconSortDescending, IconCaretUp, IconCaretDown, IconArrowsSort, IconUser, IconKey, IconUsersGroup, IconUsers, IconLink, IconDatabase, IconDeviceFloppy
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';

export default function OrderQuantityEdit({ data, close }: any) {
    const { id, order } = usePage<any>().props;
    const [dialogPass, setDialogPass] = useState<boolean>(false);
    const [title, setTitle] = useState('');
    const [values, setValues] = useState({})
    // const [editQty, setEditQty] = useState(false);

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        // console.log(values);
        router.put('', values)
        close(false);
    }

    useEffect(() => {
        console.log(values);
    }, [])

    const rows = data.map((element: any) => (
        <tr>
            <td>{element.product_name}</td>
            <td align='right'>{(Math.round(element.product_price * 100) / 100).toFixed(2)}</td>
            <td align='center'>
                <input
                    type="number"
                    id={element.id_order_detail}
                    placeholder={element.product_quantity}
                    style={{
                        width: '30%'
                    }}
                    min={1}
                    onChange={handleChange}
                />
            </td>
            <td align='center'>{element.product_quantity_in_stock}</td>
            <td align='right'>{(Math.round(element.total_price_tax_incl * 100) / 100).toFixed(2)}</td>
        </tr>
    ));
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th style={{ textAlign: 'center' }}>Qty</th>
                            <th>Available Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                <br />
                <Grid>
                    <Grid.Col span={10}>&nbsp;</Grid.Col>
                    <Grid.Col span={2} style={{ textAlign: 'right' }}>
                        <Button type='submit' color='green' size='xs' leftSection={<IconDeviceFloppy />}>
                            Submit
                        </Button>
                    </Grid.Col>
                </Grid>

            </form>
        </>
    );

}

OrderQuantityEdit.layout = (page: any) => <AppLayout children={page} title={'test'} />;