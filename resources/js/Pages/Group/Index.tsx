import AppDatatable from '@/Components/AppDatatable';
import AppLayout from '@/Components/AppLayout';
import AppModal from '@/Components/AppModal';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ActionIcon, Flex, Highlight, SimpleGrid, Text, TextInput, Tooltip } from '@mantine/core';
import { IconEdit, IconKey, IconPencil, IconUsers } from '@tabler/icons-react';
import { useEffect, useState } from 'react';




export default function GroupPage() {
    const { list, search } = usePage<any>().props;
    const [id, setId] = useState<any>(null);
    const [dialogUpdate, setDialogUpdate] = useState<boolean>(false);
    const [group, setGroup] = useState<any>('');

    useEffect(() => {
        // console.log('asdas', list);
    }, [])

    const customHighlight = (data: any) => {
        if (search != null) {
            return <Highlight highlightColor="green" highlight={search} children={data} />
        }

        return data;

    }

    // Components
    const header = [
        {
            "name": "id_group",
            "label": "No",
            "align": true,
            "width": 60,
            "sort": true
        },
        {
            "name": "name",
            "label": "Name",
            "align": false,
            "width": null,
            "sort": true
        },
        {
            "name": "Action",
            "label": "Action",
            "align": true,
            "width": "10%",
            "sort": false
        },
    ]
    const row = (res: any) => {
        return <>
            {res.map((res: any, index: any) => {
                return <tr key={index}>
                    <td align='center'>{list.from + (index)}</td>
                    <td>{customHighlight(res.name)}</td>
                    <td>
                        {actionColumn(res)}
                    </td>
                </tr>
            })}
        </>
    }
    const actionColumn = (e: any) => {
        return <>
            <Flex justify={'center'}>
                <Tooltip label="Change Name">
                    <ActionIcon variant="light" color='violet' mx={2} onClick={() => setDialogUpdateFunc(e)}>
                        <IconPencil size="1.125rem" />
                    </ActionIcon>
                </Tooltip>

            </Flex>
        </>
    }

    // Modal
    const setDialogUpdateFunc = (e: any) => {
        setDialogUpdate(!dialogUpdate)
        if (dialogUpdate) {
            return setId(null);
        }
        setId(e.id_group)
        setGroup(e.name);
    }

    // API
    const updateGroup = async () => {
        try {
            const params = {
                name: group,
                id_group: id
            }

            await router.put('group/' + id, params);

        } catch (error) {
            console.log('error', error)
        } finally {
            setId(null)
            setGroup('')
            setDialogUpdate(false)
        }
    }

    return (
        <>
            <AppModal
                data={
                    <TextInput
                        placeholder="Name"
                        label={"Name"}
                        withAsterisk
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                    // w={widthForm}
                    />}
                opened={dialogUpdate}
                close={setDialogUpdateFunc}
                title={'Update Group'}
                closeOutside={false}
                closeOnEscape={false}
                textSubmit={'Save'}
                center={true}
                size={'lg'}
                action={updateGroup}
                submitColor={'green'}
                disabledBtn={group.length > 0 ? false : true}
            ></AppModal>
            <AppDatatable
                data={list}
                head={header}
                row={row(list.data)}
            />
        </>
    );
}

GroupPage.layout = (page: any) => <AppLayout children={page} title='Group List' />;
