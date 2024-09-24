import { AppCard, AppTable, ConfirmButton, DeleteButton, UpdateButton } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Text, Badge, Button, Drawer, Group, Image, ScrollArea, Anchor, ActionIcon, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustments, IconChevronDown, IconChevronUp, IconPlus } from '@tabler/icons-react';
import React, { useState } from 'react'
import FormOutlet from './Components/FormOutlet';

export default function OutletPage() {
  const { list } = usePage<any>().props;
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState(null);
  const formProps = useForm({
    id: null,
    name: '',
    image: '',
    imgHover: '',
    address: '',
    link: '',
    phone: '',
    status: 0,
    position: '',
    email: '',
  });

  const tableData = (data: any[]) => {
    const values: any = [];

    // remove if no issue 
    // data && data.map((value: any, i: any) => {
    //   values.push({
    //     'name': value.name,
    //     // 'image': <Image w={80} src={value.image} />,
    //     // 'hover': <Image w={80} src={value.imgHover} />,
    //     'address': <Anchor href={value.link} target="_blank" underline="never">
    //       <Text c={'dark'} style={{ whiteSpace: 'pre-wrap' }} fz={14} lh={1.5}>{value.address}</Text>
    //     </Anchor>,
    //     'phone': <Text fz={14}>{value.phone}</Text>,
    //     'status': <Switch onLabel="Active" offLabel="Inactive" checked={value.status} size='md' onClick={() => { onChangeActive(value, !value.status) }} />,
    //     'Action':
    //       <Group justify='right' gap='xs'>
    //         <Group gap={5}>
    //           <ActionIcon variant="filled" color="dark" disabled={list.current_page === list.last_page && i === data.length - 1} onClick={() => { onPositionChange(value, value.position + 1) }}>
    //             <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
    //           </ActionIcon>
    //           <ActionIcon variant="filled" color="dark" disabled={list.current_page === 1 && i === 0} onClick={() => { onPositionChange(value, value.position - 1) }}>
    //             <IconChevronUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
    //           </ActionIcon>
    //         </Group>

    //         <UpdateButton iconOnly={true} onClick={() => openEdit(value.id)} />
    //         <DeleteButton iconOnly={true} onDelete={() => router.delete('outlet/' + value.id)} />
    //       </Group>
    //   });
    // })
    data && data.map((value: any, i: any) => {
      values.push({
        'name': value.name,
        'address': <Anchor href={value.link} target="_blank" underline="never">
          <Text c={'dark'} style={{ whiteSpace: 'pre-wrap' }} fz={14} lh={1.5}>{value.address}</Text>
        </Anchor>,
        'phone': <Text fz={14}>{value.phone}</Text>,
        'status': <Switch onLabel="Active" offLabel="Inactive" checked={value.status} size='md' onClick={() => { onChangeActive(value, !value.status) }} />,
        'Action':
          <Group justify='right' gap='xs'>
            <Group gap={5}>
              <ActionIcon variant="filled" color="dark" disabled={i == data.length - 1} onClick={() => { onPositionChange(value, value.position + 1) }}>
                <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="filled" color="dark" disabled={i == 0} onClick={() => { onPositionChange(value, value.position - 1) }}>
                <IconChevronUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Group>
            <UpdateButton iconOnly={true} onClick={() => openEdit(value.id)} />
            <DeleteButton iconOnly={true} onDelete={() => router.delete('outlet/' + value.id)} />
          </Group>
      });
    })
    return values;
  }

  const onChangeActive = (data: any, status: any) => {
    router.put(route('outlet.change_active', data.id), {
      status: status
    }, { preserveScroll: true });
  }

  const onPositionChange = (data: any, position: any) => {
    router.put(route('outlet.change_position', data.id), {
      position: position
    }, { preserveScroll: true });
  }

  const openEdit = (e: any) => {
    const result = list.data.find((res: any) => res.id == e)
    formProps.setData({
      id: e,
      name: result.name,
      image: result.image,
      imgHover: result.imgHover,
      address: result.address,
      link: result.link,
      phone: result.phone,
      status: result.status,
      position: result.position,
      email: result.email,
    })
    setEdit(e)
    open();
  }
  const closeEdit = () => {
    close();
    setEdit(null)
    formProps.reset();
    formProps.clearErrors();
  }

  return <>
    <AppCard
      title={'List Outlets'}
      rightComponent={
        <Group justify="end">
          <Button
            size="xs"
            leftSection={<IconPlus />}
            onClick={open}
          >
            Create
          </Button>
        </Group>
      }>
      <AppTable
        data={tableData(list.data)}
        meta={list}
      />
    </AppCard>

    <Drawer opened={opened} onClose={closeEdit} position={'right'} title={edit != null ? 'Edit Outlet' : 'New Outlet'} scrollAreaComponent={ScrollArea.Autosize}>
      <FormOutlet {...formProps} close={closeEdit} />
    </Drawer>
  </>
}


OutletPage.layout = (page: any) => <AdminLayout children={page} title={'Outlet Management'} />;