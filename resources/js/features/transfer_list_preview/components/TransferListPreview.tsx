import AppModal from '@/Components/AppModal';
import { Button, Flex, Stack, Text, Group, ScrollArea, Card, Modal } from '@mantine/core';
import { IconArrowsHorizontal, IconClock, IconPlus, } from '@tabler/icons-react';
import { useState } from 'react';
import { DateInput, TimeInput } from '@mantine/dates';
import { Form, PreviewData } from '../Index';
import { router } from '@inertiajs/react';
import moment from 'moment';
import DeleteDialog from '@/Components/DefaultForms/DeleteDialog';
import { AddButton } from '@/Components';

function TransferListPreview({ listActive, listDraft, onSetActive, data, setData, url, apiDuplicate, apiActivate, apiDeactivate, saveMenuData = false, needBlock = true }: any) {

    // Define
    // const { classes, theme } = useStyles();
    const cardHeight = 400;
    const height = 360;

    // Modal
    const [modalData, setModalData] = useState<any>({});
    const [alertDelete, setAlertDelete] = useState<boolean>(false);
    const [alertDuplicate, setAlertDuplicate] = useState<boolean>(false);
    const [alertAdd, setAlertAdd] = useState<boolean>(false);
    const [alertActive, setAlertActive] = useState<boolean>(false);
    const [alertDeactivate, setAlertDeactivate] = useState<boolean>(false);
    const [startAt, setStartAt] = useState<any>(new Date());


    const onDeleteAlert = (data: any) => {
        setAlertDelete(true);
        setModalData(data);
    }
    const onDeleteConfirm = () => {
        const result = url + '/' + modalData.id;
        router.delete(result.toString());
        setAlertDelete(false);
    }

    const onDuplicateAlert = (data: any) => {
        setAlertDuplicate(true);
        setModalData(data);
    }

    const onActivateAlert = (data: any) => {
        setAlertActive(true);
        setModalData(data);
    }
    const onActivateConfirm = () => {
        const params = {
            id: modalData.id,
            start_at: moment(startAt).format('YYYY-MM-DD HH:mm:ss'),
        }
        router.put(apiActivate, params);
        setAlertActive(false);
        setData({
            id: modalData.id,
            name: modalData.name,
            description: modalData.description,
            start_at: moment(startAt).format('YYYY-MM-DD HH:mm:ss'),
            data: modalData.data ? modalData.data : '',
            width: modalData.width ? modalData.width : '',
            position: modalData.position ? modalData.position : ''
        })

        const result = { ...modalData, start_at: moment(startAt).format('YYYY-MM-DD HH:mm:ss') }
        try {
            onSetActive(result, null)
        } catch (error) {
            console.log(error)
        } finally {
            setStartAt(new Date());
        }
    }

    const onDeactivateAlert = (data: any) => {
        setAlertDeactivate(true);
        setModalData(data);
    }
    const onDeactivateConfirm = () => {
        const params = {
            id: modalData.id,
        }
        router.put(apiDeactivate, params);
        setAlertDeactivate(false);
        setData({
            id: modalData.id,
            name: modalData.name,
            description: modalData.description,
            start_at: null,
            data: modalData.data ? modalData.data : '',
            width: modalData.width ? modalData.width : '',
            position: modalData.position ? modalData.position : ''
        })
        const result = { ...modalData, start_at: null }
        try {
            onSetActive(result, null)
        } catch (error) {
            console.log(error)
        } finally {
            setStartAt(new Date());
        }
    }

    const handleDateChange = (event: any) => {
        const selecteDate = event;
        const [hours, minutes] = startAt.toTimeString().substring(0, 5).split(':');
        const updatedStartAt = selecteDate ? new Date(selecteDate) : new Date();
        updatedStartAt.setHours(parseInt(hours, 10));
        updatedStartAt.setMinutes(parseInt(minutes, 10));
        setStartAt(updatedStartAt);
    };

    const handleTimeChange = (event: any) => {
        const selectedTime = event.target.value;
        const [hours, minutes] = selectedTime.split(':');
        const updatedStartAt = startAt ? new Date(startAt) : new Date();
        updatedStartAt.setHours(parseInt(hours, 10));
        updatedStartAt.setMinutes(parseInt(minutes, 10));
        updatedStartAt.setSeconds(0);
        setStartAt(updatedStartAt);
    };

    const afterSubmit = () => {
        setAlertAdd(false);
        setAlertDuplicate(false);
    }

    return <>
        <DeleteDialog opened={alertDelete} setModal={setAlertDelete} onConfirm={onDeleteConfirm} />

        {/* Add Modal */}
        <Modal
            opened={alertAdd}
            onClose={() => setAlertAdd(false)}
            title='New Template Menu'
            size={'xl'}
            closeOnClickOutside={false}>
            <Form copy={needBlock} needBlock={needBlock} submitPath={url} afterSubmit={afterSubmit} saveMenuData={saveMenuData} template={true} cancelBtn={true} cancelAction={setAlertAdd} />
        </Modal>

        {/* Duplicate Modal */}
        <Modal
            opened={alertDuplicate}
            onClose={() => setAlertDuplicate(false)}
            title={modalData ? 'Duplicate ' + modalData.name : ' new template'}
            size={'xl'}
            closeOnClickOutside={false}>
            <Form formData={modalData} submitPath={apiDuplicate} copy={false} afterSubmit={afterSubmit} cancelBtn={true} cancelAction={setAlertDuplicate} />
        </Modal>

        {/* Active Modal */}
        <AppModal
            data={
                <>
                    <DateInput
                        placeholder="Date input"
                        value={startAt}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        size='xs'
                        popoverProps={{ zIndex: 10000 }}
                        px={20}
                    />
                    <TimeInput
                        value={startAt ? startAt.toTimeString().substring(0, 5) : ''}
                        size='xs'
                        mt={10}
                        mb={20}
                        px={20}
                        disabled={!startAt ? true : false}
                        onChange={handleTimeChange}
                        leftSection={<IconClock size="1rem" stroke={1.5} />}
                    />
                </>
            }
            size={'xs'}
            opened={alertActive}
            close={() => setAlertActive(false)}
            title={'Activate Banner'}
            center={true}
            textSubmit={'Active'}
            action={onActivateConfirm}
        ></AppModal>

        {/* Inactive to Draft Modal */}
        <AppModal
            data={'Are you sure you want to move to draft?'}
            size={'md'}
            opened={alertDeactivate}
            close={() => setAlertDeactivate(false)}
            title={'Move Banner to draft'}
            center={true}
            textSubmit={'Move'}
            action={onDeactivateConfirm}
        ></AppModal>

        <Flex>
            <Flex w={'100%'} mt={10}>
                <Flex w={'48%'} direction={'column'}>
                    <Card p={'md'} radius={'lg'} withBorder shadow='xs' h={cardHeight}>
                        <Text fz={16}>Active</Text>
                        <Stack
                            w={'100%'}
                            p={5}
                            h={height}
                        >
                            {listActive.length > 0 && <ScrollArea h={height} py={10} offsetScrollbars>
                                {listActive.map((res: any, index: any) => {
                                    return <PreviewData
                                        key={index}
                                        index={index}
                                        data={res}
                                        type={'active'}
                                        activeId={data.id}
                                        getAPI={url}
                                        onChangePreview={onSetActive}
                                        onDeactivate={onDeactivateAlert}
                                        onDuplicate={onDuplicateAlert}
                                        onDelete={onDeleteAlert}
                                    ></PreviewData>
                                })}
                            </ScrollArea>}

                            {listActive.length == 0 && <Text px={10} pt={10} fz={14}>No Data</Text>}

                        </Stack>
                    </Card>
                </Flex>

                <Flex w={'4%'} justify={'center'}>
                    <Flex align={'center'}>
                        <Text ta='center'>
                            <IconArrowsHorizontal></IconArrowsHorizontal>
                        </Text>
                    </Flex>
                </Flex>

                <Flex w={'48%'} direction={'column'}>
                    <Card p={'md'} radius={'lg'} withBorder shadow='xs' h={cardHeight}>
                        <Group justify='space-between'>
                            <Text fz={16}>Draft</Text>
                            <AddButton size='xs' color='green' onClick={() => setAlertAdd(true)}>Create New</AddButton>
                        </Group>
                        <Stack
                            w={'100%'}
                            p={5}
                            h={height}
                        >

                            {listDraft.length > 0 && <ScrollArea h={height} py={10} offsetScrollbars>
                                {listDraft.map((res: any, index: any) => {
                                    return <PreviewData
                                        key={index}
                                        data={res}
                                        type={'draft'}
                                        activeId={data.id}
                                        getAPI={url}
                                        onChangePreview={onSetActive}
                                        onActivate={onActivateAlert}
                                        onDuplicate={onDuplicateAlert}
                                        onDelete={onDeleteAlert}
                                    ></PreviewData>
                                })}
                            </ScrollArea>}

                            {listDraft.length == 0 && <Text px={10} fz={14}>No Data</Text>}

                        </Stack>
                    </Card>
                </Flex>
            </Flex>
        </Flex >
    </>
}

export default TransferListPreview;
