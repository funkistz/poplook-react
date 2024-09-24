import AdminLayout from '@/Components/layout/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Button, Text, TextInput, Flex, Paper, ActionIcon, Select, Stack, Table } from '@mantine/core';
import { IconPlus, IconSearch, IconX, IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ImgDetails } from './Components/Index';
import { ListMedia, UploadComponent } from '@/features/custom_upload_file/Index';
import { useDidUpdate } from '@mantine/hooks';


export default function FileUploadPage() {
    const { media, flash } = usePage<any>().props;
    const [openMedia, setOpenMedia] = useState(null);
    const [newMedia, setNewMedia] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    const { data, setData, post, put, reset, errors, setError } = useForm({
        search: (media && media.search) ? media.search : '',
        perPage: (media && media.per_page) ? media.per_page : 20,
        page: (media && media.current_page) ? media.current_page : 1,
        sortBy: (media && media.sort_by) ? media.sort_by : 'created_at',
        orderBy: (media && media.order_by) ? media.order_by : 'desc',
    });

    const findDetails = () => {
        if (openMedia != null) {
            const result = media.data.find((step: { id: any; }) => step.id === openMedia);
            return result;
        }
        return false
    }

    const handleOnChange = async () => {
        queryParams.set('page', data.page);
        queryParams.set('per_page', data.perPage);

        data.sortBy ? queryParams.set('sort_by', data.sortBy) : false;
        data.orderBy ? queryParams.set('order_by', data.orderBy) : false;
        data.search ? queryParams.set('search', data.search) : queryParams.delete('search');

        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        router.get(newUrl);
    }

    useDidUpdate(() => {
        handleOnChange();
    }, [data.orderBy, data.sortBy, data.page, data.perPage])

    useDidUpdate(() => {
        if (data.search.length == 0) {
            handleOnChange();
        }
    }, [data.search])

    const onSearch = (e: any) => {
        e.preventDefault();
        try {
            setData('page', 1)
        } catch (error) {

        } finally {
            handleOnChange();
        }
    }

    useEffect(() => {
        if (flash.type == 'success') {
            setNewMedia(false)
        }
    }, [media])

    return (
        <>
            <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'} >
                <Flex justify={'space-between'} align={'center'}>
                    <Button
                        size={'xs'} disabled={newMedia}
                        leftSection={<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                        onClick={() => setNewMedia(true)}
                    >
                        New Media
                    </Button>
                    <Flex align={'center'}>
                        <form onSubmit={onSearch}>
                            <TextInput
                                placeholder={'Search name'}
                                size={'xs'}
                                mr={'xs'}
                                leftSection={<IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                                rightSection={(data.search.length > 0) && <ActionIcon variant="transparent" color="gray" onClick={(e) => { setData('search', '') }}>
                                    <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>}
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                w={200}
                            />
                        </form>

                        <Select
                            placeholder="Pick value"
                            data={[
                                { label: 'Uploaded', value: 'created_at' },
                                { label: 'Name', value: 'name' },
                            ]}
                            allowDeselect={false}
                            size={'xs'}
                            value={data.sortBy}
                            onChange={(e) => setData('sortBy', e)}
                            mr={'xs'}
                        />

                        <ActionIcon variant="outline" color={'gray'} onClick={() => data.orderBy == 'desc' ? setData('orderBy', 'asc') : setData('orderBy', 'desc')}>
                            {data.orderBy == 'desc' ?
                                <IconSortAscending style={{ width: '70%', height: '70%' }} stroke={1.5} /> :
                                <IconSortDescending style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                        </ActionIcon>
                    </Flex>
                </Flex>
            </Paper>

            {newMedia && <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>
                <Flex justify={'space-between'} mb={'xs'}>
                    <Text>New Media</Text>
                    <ActionIcon
                        variant="transparent" color="gray"
                        onClick={() => setNewMedia(false)}
                    >
                        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} ></IconX>
                    </ActionIcon>
                </Flex>
                <UploadComponent />
            </Paper>}

            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td w={'70%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'} mr={'xs'} >
                                <ListMedia media={media} openMedia={openMedia} click={setOpenMedia} handlePage={setData} />
                            </Paper>
                        </Table.Td>
                        <Table.Td w={'30%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <Stack style={{ position: 'sticky', top: 80 }} >
                                <Paper radius={'lg'} p={'lg'} withBorder w={'100%'}>
                                    <ImgDetails details={findDetails()} setMedia={setOpenMedia} />
                                </Paper>
                            </Stack>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    );
}

FileUploadPage.layout = (page: any) => <AdminLayout children={page} title='Media Library' />;

