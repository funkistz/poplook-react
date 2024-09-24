import cx from 'clsx';
import { useState, useMemo, useEffect } from 'react';
import { Table, ScrollArea, Text, Paper, Flex, Pagination, NativeSelect, Input, ActionIcon, Button, Tooltip, TextInput, rem, Group, Menu, Select, FocusTrap } from '@mantine/core';
import classes from './AppTable.module.css';
import { router } from '@inertiajs/react';
import { IconAdjustments, IconArrowsSort, IconCalendar, IconChevronDown, IconSearch, IconSortAscending, IconSortDescending, IconX } from '@tabler/icons-react';
import { useDidUpdate } from '@mantine/hooks';

const defaultHeaderOptions = {
    'action': { ta: 'right' }
}

export default function AppTable({ data, options, headerOptions = defaultHeaderOptions, children, height = 'auto', meta, canSort = [], searchPlaceholder = 'Search', searchBy = null, filterBy = null, autoFocus = false }: any) {

    const queryParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState<any>((meta && meta.search) ? meta.search : '');
    const [searchColumn, setSearchColumn] = useState<any>((meta && meta.search_by) ? meta.search_by : '');
    const [perPage, setPerPage] = useState<any>((meta && meta.per_page) ? meta.per_page : 10);
    const [page, setPage] = useState<any>((meta && meta.current_page) ? meta.current_page : 1);
    const [sortBy, setSortBy] = useState<any>((meta && meta.sort_by) ? meta.sort_by : '');
    const [orderBy, setOrderBy] = useState<any>((meta && meta.order_by) ? meta.order_by : 'asc');
    const [filter, setFilter] = useState<any>((meta && meta.filter_by) ? meta.filter_by : '');

    const headers = useMemo(() => {
        return data[0] ? Object.keys(data[0]) : [];
    }, [data])

    const [scrolled, setScrolled] = useState(false);

    const renderTableRows = (data:any, headers:any, headerOptions:any) => {
        if (data.length === 0) {
          return (
            <Table.Tr>
              <Table.Td colSpan={headers.length + 1} style={{ textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>
                <Text py={5} fz={14}> No data available</Text>
              </Table.Td>
            </Table.Tr>
          );
        }
      
        return data.map((row: any, index: any) => (
          <Table.Tr key={index}>
            <Table.Td>{index + 1}.</Table.Td>
                {headers.map((header: any, index2: any) => (
                <Table.Td key={index2} {...(headerOptions[header] ? headerOptions[header] : {})}>
                    {row[header]}
                </Table.Td>
                ))}
          </Table.Tr>
        ));
      };

    const rows = renderTableRows(data, headers, headerOptions);

    // const rows = data.map((row: any, index: any) => (
    //     <Table.Tr key={index}>
    //         <Table.Td>{index + 1}.</Table.Td>
    //         {headers.map((header: any, index2) => {
    //             return <Table.Td key={index2} {...(headerOptions[header] ? headerOptions[header] : {})}>{row[header]}</Table.Td>;
    //         })}
    //     </Table.Tr>
    // ));

    const handleOnChange = async (isSearch = false, isSearchDel = false) => {
        // setLoading(true)
        queryParams.set('page', page);
        queryParams.set('per_page', perPage);
        queryParams.set('search_by', searchColumn);
        queryParams.set('filter_by', filter);

        sortBy ? queryParams.set('sort_by', sortBy) : false;
        orderBy ? queryParams.set('order_by', orderBy) : false;
        search ? queryParams.set('search', search) : queryParams.delete('search');
        searchColumn ? queryParams.set('search_by', searchColumn) : queryParams.delete('search_by');
        filter ? queryParams.set('filter_by', filter) : queryParams.delete('filter_by');

        if(isSearch) {
            queryParams.set('page', '1');
        }

        if (isSearchDel) {
            queryParams.delete('search')
        }

        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        // console.log(newUrl);
        router.get(newUrl);
    }

    const onChangeSort = (column_name: any) => {
        if (sortBy == column_name) {
            setSortBy(column_name);
            setOrderBy((orderBy == 'asc') ? 'desc' : 'asc');
        } else {
            setSortBy(column_name);
            setOrderBy('asc');
        }
    }

    // console.log('meta', meta)

    useDidUpdate(() => {

        handleOnChange();

    }, [page, perPage, sortBy, orderBy, filter])

    const onSearch = (e: any) => {
        e.preventDefault();
        handleOnChange(true);
    }

    const xxx = () => {
        setSearch('')
        handleOnChange(true, true)
    }

    return (
        // <Paper shadow="xs" radius="xs" p="xl">
        <>
            {meta && <Flex justify={'space-between'} my={10}>
                <Flex align={'center'}>
                    <Text size={'xs'} pt={3}>Show</Text>
                    <NativeSelect
                        data={['5', '10', '20', '50', '100']}
                        value={meta.per_page.toString()}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        mx={5}
                        w={70}
                        size='xs'
                    />
                    <Text size={'xs'} pt={3}>entries</Text>
                </Flex>

                <Flex>
                    <form onSubmit={onSearch}>
                        {Array.isArray(searchBy) ?
                            <Group gap={'xs'}>
                                <NativeSelect
                                    data={Array.isArray(searchBy) ? searchBy : []}
                                    radius={'sm'}
                                    value={searchColumn}
                                    onChange={(e) => setSearchColumn(e.target.value)}
                                />
                                <FocusTrap active={autoFocus}>
                                    <TextInput
                                        placeholder={searchPlaceholder}
                                        size='sm'
                                        radius={'sm'}
                                        data-autofocus
                                        style={{ borderTopLeftRadius: '0px !important', borderBottomLeftRadius: 25, minWidth: 250, maxWidth: 300 }}
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                        rightSection={search.length > 0 && <ActionIcon variant="transparent" color="gray" onClick={() => xxx()}>
                                            <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>}
                                    />
                                </FocusTrap>
                                
                                <Button
                                    type={'submit'} variant="filled" color="green"
                                    leftSection={<IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                                    disabled={search.length == 0}
                                    style={{display: 'none'}}
                                >Search</Button>

                                {Array.isArray(filterBy) && <Select
                                    data={filterBy}
                                    value={filter}
                                    onChange={(e) => setFilter(e)}
                                    placeholder='All'
                                    allowDeselect={false}
                                />}
                            </Group>
                            :
                            <>
                                <Group gap={'xs'}>

                                    {Array.isArray(filterBy) && <Select
                                        data={filterBy}
                                        value={filter}
                                        onChange={(e) => setFilter(e)}
                                        placeholder='All'
                                        allowDeselect={false}
                                    />}


                                    <FocusTrap active={autoFocus}>
                                        <TextInput
                                            placeholder={searchPlaceholder}
                                            size='sm'
                                            onChange={(e) => { setSearch(e.target.value) }}
                                            value={search}
                                            radius={'sm'}
                                            data-autofocus
                                            style={{ borderTopLeftRadius: '0px !important', borderBottomLeftRadius: 25, minWidth: 250, maxWidth: 300 }}
                                            rightSection={search.length > 0 && <ActionIcon variant="transparent" color="gray" onClick={() => xxx()}>
                                                <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                            </ActionIcon>}
                                        />
                                    </FocusTrap>
                                    <Button
                                        type={'submit'} variant="filled" color="green"
                                        leftSection={<IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                                        disabled={search.length == 0}
                                        style={{display: 'none'}}
                                    >Search</Button>
                                </Group>
                            </>
                        }
                    </form>
                </Flex>
            </Flex>}
            <ScrollArea h={height} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table highlightOnHover {...options} >
                    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <Table.Tr>
                            <Table.Th w={50}>#</Table.Th>
                            {headers.map((header: any, index: any) => {

                                const canSortColumn = canSort.find((e: any) => e.label === header);

                                return <Table.Th key={index} tt="capitalize" {...(headerOptions[header] ? headerOptions[header] : {})}>
                                    {/* {header} */}
                                    <Flex justify={'space-between'} align={'center'} onClick={() => canSortColumn ? onChangeSort(canSortColumn.value) : null}>
                                        <Text fz={13} pr={5}>{header}</Text>
                                        {canSortColumn ?
                                            <>
                                                {/* {orderBy ? <IconSortAscending size="1rem" /> : <IconSortDescending size="1rem" />} */}
                                                {(sortBy && sortBy == canSortColumn.value) ? <>
                                                    {(orderBy == 'asc') ? <IconSortAscending size="1rem" /> : <IconSortDescending size="1rem" />}
                                                </> :
                                                    <>
                                                        <IconArrowsSort size="1rem" />
                                                    </>}

                                            </> :
                                            <>
                                                {/* <IconArrowsSort size="1rem" /> */}
                                            </>}
                                    </Flex>
                                </Table.Th>;
                            })}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {children ? children : rows}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            {meta && <Flex justify={'space-between'} my={20}>
                <Text fz={14}>Showing {meta.from} to {meta.to} of {meta.total} entries</Text>
                <Pagination
                    total={meta.last_page}
                    color='green'
                    size={'md'}
                    withEdges
                    siblings={0}
                    boundaries={0}
                    defaultValue={Number(meta.current_page)}
                    onChange={(e: any) => setPage(Number(e))}
                />
            </Flex>}
        </>
        // </Paper>
    );
}