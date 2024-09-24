import { router, usePage } from "@inertiajs/react";
import { Table, ActionIcon, Text, Flex, Highlight, NativeSelect, Input, Pagination, LoadingOverlay, Box, Button, SegmentedControl, TextInput } from "@mantine/core";
import { IconArrowsSort, IconSearch, IconSortAscending, IconSortDescending, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";


function AppDatatable({ data, head, row, newData = [], overflow }: any) {

    // Define
    const queryParams = new URLSearchParams(window.location.search);
    const [searchTerm, setSearchTerm] = useState<any>('');
    const [sort, setSort] = useState<any>(null);
    const [orderBy, setOrderBy] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [shop, setShop] = useState<any>([]);
    const [tier, setTier] = useState<any>([]);
    const [filterExist, setFilterExist] = useState({
        shop: { data: ['MYR', 'SGD', 'USD'], status: false },
        tier: { data: ['Silver', 'Gold'], status: false },
        input: { status: false, placeholder: 'Input Here.' },
        show: { status: true },
        search: { status: true },
    });
    const [overflows, setOverflows] = useState<any>((overflow) ? { overflow: 'scroll' } : { overflow: 'none' });

    // Function
    const calPagination = () => {
        const result = data.total / data.per_page;

        if (result % 1) {
            return Math.floor(result) + 1;
        }

        return Number(result);
    }
    const enterSearch = (e: any) => {
        if (e.type == "click") {
            if (searchTerm.length > 0) {
                return handleOnChange(searchTerm, 'search')
            }
        }

        if (e.key == "Enter") {
            if (searchTerm.length > 0) {
                return handleOnChange(searchTerm, 'search')
            }

        }
    }
    const clearSearch = () => {
        setSearchTerm('')
        handleOnChange('', 'search')
    }
    const handleOnChange = async (e: any, params: any) => {
        setLoading(true)
        if (params) {
            queryParams.set(params, e);
        }

        // search will change page to 1
        if (params == "search") {
            queryParams.set('page', '1');
            if (e.length == 0) {
                queryParams.delete('search');
            }
        }

        if (params == "filter") {
            queryParams.set('filter', e);
            queryParams.set('page', '1');
        }

        if (params == "filter_tier") {
            queryParams.set('filter_tier', e);
            queryParams.set('page', '1');
        }

        // sort 
        if (params == "sort") {
            queryParams.set('sort', e);
            queryParams.set('order', !orderBy ? 'asc' : 'desc');

            await setSort(e);
        }
        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        router.get(newUrl);
    }

    const onChangeSort = async (e: any) => {
        await handleOnChange(e, 'sort')
    }

    useEffect(() => {
        setSearchTerm(queryParams.get('search') != null ? queryParams.get('search') : "");
        setSort(queryParams.get('sort') != null ? queryParams.get('sort') : head[1].name);
        setOrderBy(queryParams.get('order') == 'desc' ? false : true);
        setOrderBy(queryParams.get('order') == 'desc' ? false : true);
        setShop(queryParams.get('filter_shop'));
        setTier(queryParams.get('filter_tier'));
        // setFilterBy(queryParams.get('filter') != null ? queryParams.get('filter') : "");
        // var filter_by = queryParams.get('filter')?.split('|');
        // if (filter_by != undefined) {
        //     setFilterBy(filter_by[1]);
        // } else {
        //     setFilterBy('All');
        // }
    }, [])

    useEffect(() => {
        setLoading(false)
        setFilterExist({ ...filterExist, ...newData });
    }, [newData])

    const onChangeShop = async (e: any) => {
        await handleOnChange(e, 'filter_shop')
    }

    const onChangeTier = async (e: any) => {
        await handleOnChange(e, 'filter_tier')
    }

    return <>

        <Flex justify={'space-between'} my={10}>
            {filterExist['show'] &&
                <>
                    {filterExist['show']['status'] &&
                        <Flex>
                            <Text size={'xs'} pt={3}>Show</Text>
                            <NativeSelect
                                data={['5', '10', '20', '50', '100']}
                                value={data.per_page.toString()}
                                onChange={(e) => handleOnChange(Number(e.target.value), 'perpage')}
                                mx={5}
                                w={70}
                                size='xs'
                            />
                            <Text size={'xs'} pt={3}>entries</Text>
                        </Flex>
                    }
                </>
            }
            {filterExist['shop'] &&
                <>
                    {filterExist['shop']['status'] &&
                        <Flex>
                            <SegmentedControl
                                radius="xl"
                                size="sm"
                                data={filterExist['shop']['data']}
                                value={shop}
                                onChange={onChangeShop}
                            />
                        </Flex>
                    }
                </>
            }
            {filterExist['tier'] &&
                <>
                    {filterExist['tier']['status'] &&
                        <Flex>
                            <SegmentedControl
                                radius="xl"
                                size="sm"
                                data={filterExist['tier']['data']}
                                value={tier}
                                onChange={onChangeTier}
                            />
                        </Flex>
                    }
                </>
            }
            {filterExist['search'] &&
                <>
                    {filterExist['search']['status'] &&
                        <Flex>
                            <Input
                                placeholder="Search"
                                size='md'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                style={{ marginLeft: '10px', borderRadius: 0, background: 'red' }}
                                w={200}
                                radius={0}
                                onKeyDown={(e) => enterSearch(e)}

                                rightSection={
                                    searchTerm.length > 0 && (
                                        <ActionIcon size={'xs'} onClick={() => clearSearch()} >
                                            <IconX></IconX>
                                        </ActionIcon>
                                    )
                                }
                            />
                            <ActionIcon
                                w={50}
                                h={'100%'}
                                color='green'
                                variant="filled"
                                onClick={(e) => enterSearch(e)}
                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            >
                                <IconSearch size="1.125rem" />
                            </ActionIcon>
                        </Flex>
                    }
                </>
            }
        </Flex>

        <Box pos="relative" style={overflows} >
            <LoadingOverlay
                loaderProps={{ color: 'green' }}
                visible={loading}
            // overlayBlur={2} 
            />
            <Table mt={20} verticalSpacing={'xs'} striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        {head.map((res: any, index: any) => {
                            return res.sort ?
                                <Table.Th key={index} style={{ cursor: 'pointer', textAlign: res.align ? 'center' : 'left', width: res.width != null ? res.width : 'auto' }} onClick={() => onChangeSort(res.name)}>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text fz={13} pr={5}>{res.label}</Text>
                                        {sort == res.name ?
                                            <>
                                                {orderBy ? <IconSortAscending size="1rem" color={sort == res.name ? 'green' : 'gray'} /> : <IconSortDescending size="1rem" color={sort == res.name ? 'green' : 'gray'} />}
                                            </> :
                                            <>
                                                <IconArrowsSort size="1rem" />
                                            </>}
                                    </Flex>
                                </Table.Th>
                                : <Table.Th key={index} style={{ cursor: 'pointer', textAlign: res.align ? 'center' : 'left', width: res.width != null ? res.width : 'auto' }}>
                                    {res.label}
                                </Table.Th>
                        })}
                    </Table.Tr>

                </Table.Thead>
                <Table.Tbody>
                    {data.data.length > 0 ?
                        <>
                            {row}
                        </>
                        :
                        <>
                            <Table.Tr>
                                <Table.Td colSpan={head.length} align="center">No records found</Table.Td>
                            </Table.Tr>
                        </>}
                </Table.Tbody>
            </Table>
        </Box>

        <Flex justify={'space-between'} my={20}>
            <Text fz={14}>Showing {data.from} to {data.to} of {data.total} entries</Text>
            <Pagination
                total={calPagination()}
                color='green'
                size={'md'}
                withEdges
                siblings={0}
                boundaries={0}
                defaultValue={Number(data.current_page)}
                onChange={(e: any) => handleOnChange(Number(e), 'page')}
            />
        </Flex>

    </>;
}

export default AppDatatable;
