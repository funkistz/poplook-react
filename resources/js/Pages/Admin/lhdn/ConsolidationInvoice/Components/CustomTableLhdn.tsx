import { usePage, router } from "@inertiajs/react";
import { Text, Flex, NumberFormatter, Select, Table } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { useState } from "react";


function CustomTableLhdn({ data, details }: any) {

    const { filters, filterBy } = usePage<any>().props;

    const currency = details.currency;
    const subtotal = details.subtotal;
    const excld_tax = details.excld_tax;
    const total_tax = details.total_tax;
    const total = details.total;

    const queryParams = new URLSearchParams(window.location.search);
    const [filter, setFilter] = useState<any>((filterBy && filterBy) ? filterBy : '');


    const rows = data.map((element:any, i:any) => (
        <Table.Tr key={i}>
            <Table.Td>{i+1}</Table.Td>
            <Table.Td>{element.classification}</Table.Td>
            <Table.Td>{element.description}</Table.Td>
            <Table.Td>{element.quantity}</Table.Td>
            <Table.Td><NumberFormatter prefix={`${currency} `} value={element.unit_price} thousandSeparator decimalScale={2} fixedDecimalScale/></Table.Td>
            <Table.Td><NumberFormatter prefix={`${currency} `} value={element.amount} thousandSeparator decimalScale={2} fixedDecimalScale/></Table.Td>
            <Table.Td>{element.discount ? element.discount :'-'}</Table.Td>
            <Table.Td>{element.tax ? element.tax : '-'}</Table.Td>
            <Table.Td><NumberFormatter prefix={`${currency} `} value={element.total_price_inc_tax} thousandSeparator decimalScale={2} fixedDecimalScale/></Table.Td>
        </Table.Tr>
    ));

    const handleOnChange = async () => {
        filter ? queryParams.set('filterBy', filter) : queryParams.delete('filterBy');

        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        router.get(newUrl);
    }

    useDidUpdate(() => {

        handleOnChange();

    }, [filter])

    return <>
         <Flex gap={'xs'} align={'center'} justify={'end'} mb={'xs'}>
            <Text fz={14}>Filter By</Text>
            <Select
                placeholder="All"
                data={filters}
                allowDeselect={false}
                value={filter}
                onChange={(e) => setFilter(e)}
            />
        </Flex>

        <Table highlightOnHover stickyHeader stickyHeaderOffset={70}>
            <Table.Thead bg={'dark.4'} c={'white'}>
                <Table.Tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Classification</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Unit Price</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Discount</Table.Th>
                    <Table.Th>Tax Amount</Table.Th>
                    <Table.Th>Price (Incl. tax)</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody style={{ borderBottom: '1px solid #dee2e6' }}>
                {rows}
            </Table.Tbody>
            <Table.Tfoot>
                <Table.Tr>
                    <Table.Th colSpan={4}></Table.Th>
                    <Table.Th colSpan={4}>Subtotal</Table.Th>
                    <Table.Th><NumberFormatter prefix={`${currency} `} value={subtotal} thousandSeparator decimalScale={2} fixedDecimalScale/></Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th colSpan={4}></Table.Th>
                    <Table.Th colSpan={4}>Total Excluding Tax</Table.Th>
                    <Table.Th><NumberFormatter prefix={`${currency} `} value={excld_tax} thousandSeparator decimalScale={2} fixedDecimalScale/></Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th colSpan={4}></Table.Th>
                    <Table.Th colSpan={4}>Tax Amount</Table.Th>
                    <Table.Th><NumberFormatter prefix={`${currency} `} value={total_tax} thousandSeparator decimalScale={2} fixedDecimalScale/></Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th colSpan={4}></Table.Th>
                    <Table.Th colSpan={4}>Total Including Tax</Table.Th>
                    <Table.Th><NumberFormatter prefix={`${currency} `} value={total} thousandSeparator decimalScale={2} fixedDecimalScale/></Table.Th>
                </Table.Tr>
            </Table.Tfoot>
        </Table>
    </>
}

export default CustomTableLhdn;
