import React, { useEffect, useState } from 'react'
import {
    rem, SimpleGrid, Button, Accordion, TextInput, Checkbox, Stack, Divider, Group, Paper, Text, Textarea, Flex, Badge, ActionIcon, Box, Affix
} from '@mantine/core';
import { CategoryDropdown } from '@/features/data_dropdown';
import AppInput from '@/Components/Forms/AppInput';
import MenuResource from './MenuResource';
import { IconPlus, IconDeviceFloppy, IconClock, IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import { defaultMenuMobileParent, defaultMenuParent } from '../value';
import { BlockCreator } from '@/features/block_creator';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setPreviewSize, saveBlock, resetBlock, setShop } from '@/features/block_creator/redux/blockSlice';
import { DateInput, TimeInput } from '@mantine/dates';
import DeleteDialog from '@/Components/DefaultForms/DeleteDialog';

export default function menuList({ data, setMenuBlock, activeIndex, setActiveIndex, onSubmit, setMenuDetail, type }: any) {

    const menu = data.block ? data.block : [];
    const [delMenuOpen, setDelMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(saveBlock(null));
    }, [])

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { block, activeParent, activeChild, previewSize, shop } = useSelector((storeState: any) => storeState.block);

    const onChange = (e: any, id: any = null) => {

        let temp = JSON.parse(JSON.stringify(menu));
        if (e.target) {
            temp[activeIndex][e.target.id] = e.target.value;
        } else {
            temp[activeIndex][id] = e;
        }

        setMenuBlock(temp);

    }

    const addNewMenu = (device: any) => {

        let temp = JSON.parse(JSON.stringify(menu));
        const tempMenu = device == 'desktop' ? JSON.parse(JSON.stringify(defaultMenuParent)) : JSON.parse(JSON.stringify(defaultMenuMobileParent));
        tempMenu.name = 'Menu ' + (temp.length + 1);
        tempMenu.resource.myr.label = 'Menu ' + (temp.length + 1);
        tempMenu.resource.usd.label = 'Menu ' + (temp.length + 1);
        tempMenu.resource.sgd.label = 'Menu ' + (temp.length + 1);

        temp.push(tempMenu);

        setMenuBlock(temp);
        setActiveIndex(temp.length - 1);
        dispatch(saveBlock([]));
    }

    const onActiveChange = (index: any) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        if (activeIndex && activeIndex >= 0) {
            const tempBlock = menu[activeIndex].block ? JSON.parse(JSON.stringify(menu[activeIndex].block)) : [];
            dispatch(saveBlock(tempBlock));
        }

    }, [activeIndex])

    useEffect(() => {
        if (block) {
            const tempBlock = block ? JSON.parse(JSON.stringify(block)) : [];
            const tempMenu = menu ? JSON.parse(JSON.stringify(menu)) : [];

            tempMenu[activeIndex].block = tempBlock;

            setMenuBlock(tempMenu);
        }

    }, [block])


    const setResource = (index: any, resource: any) => {
        onChange(resource, 'resource');
    }

    const handleTimeChange = (event: any) => {
        const selectedTime = event.target.value;
        const [hours, minutes] = selectedTime.split(':');
        const updatedStartAt = data.start_at != null ? new Date(data.start_at) : new Date();

        // Set the time values
        updatedStartAt.setHours(parseInt(hours, 10));
        updatedStartAt.setMinutes(parseInt(minutes, 10));
        updatedStartAt.setSeconds(0);

        setMenuDetail('start_at', updatedStartAt)
    }

    const setPosition = (attr: any, index: any) => {
        if (attr === 'down') {
            if (index < menu.length - 1) {
                const updatedArray = [...menu];
                const indexCal = index + 1;
                [updatedArray[index], updatedArray[indexCal]] = [updatedArray[index + 1], updatedArray[index]];
                setMenuBlock(updatedArray)
                if (activeIndex) {
                    setActiveIndex(indexCal);
                }
            }
        } else {
            if (index > 0) {
                const updatedArray = [...menu];
                const indexCal = index - 1;
                [updatedArray[index], updatedArray[indexCal]] = [updatedArray[index - 1], updatedArray[index]];
                setMenuBlock(updatedArray)
                if (activeIndex) {
                    setActiveIndex(indexCal);
                }
            }
        }
    };

    const deleteMenu = () => {
        let newMenu = JSON.parse(JSON.stringify(menu));
        newMenu = newMenu.filter((item: any, index: number) => index != activeIndex);

        setMenuBlock(newMenu);
        setActiveIndex(-1);
        setDelMenuOpen(false);
    }

    return <>

        <DeleteDialog opened={delMenuOpen} setModal={setDelMenuOpen} onConfirm={deleteMenu} />
        <Text fz={18} fw={'bolder'}>Edit Menu {data.name}</Text>
        <Stack mt={20}>
            <Flex justify={'space-between'} align={'end'}>
                <Flex h={'100%'}>
                    <Stack w={300} gap={'xs'}>
                        <TextInput size={'xs'} label='Name' value={data.name} onChange={(e) => setMenuDetail('name', e.target.value)} />
                        <Textarea size={'xs'} label='Description' value={data.description} onChange={(e) => setMenuDetail('description', e.target.value)} />
                    </Stack>
                    <Stack w={300} gap={'xs'} mx={'xs'}>
                        {data.start_at && <>
                            <DateInput
                                value={new Date(data.start_at)}
                                onChange={(e) => setMenuDetail('start_at', e)}
                                size='xs'
                                label="Start at"
                                placeholder="Start at"
                                minDate={new Date()}
                            />
                            <TimeInput
                                value={new Date(data.start_at) ? new Date(data.start_at).toTimeString().substring(0, 5) : ''}
                                size='xs'
                                onChange={handleTimeChange}
                                leftSection={<IconClock size="1rem" stroke={1.5} />}
                            />
                        </>}
                    </Stack>
                </Flex>
                <Group gap="apart">
                    <Button color='blue' leftSection={<IconPlus />} onClick={() => addNewMenu(type)}>Add new menu</Button>
                </Group>
            </Flex>
            <Accordion radius="xs" variant="contained" value={activeIndex?.toString()} onChange={onActiveChange}>
                {menu && menu.map((parent: any, index: any) => {
                    return (
                        <Accordion.Item value={index.toString()} key={index}>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <Accordion.Control>
                                    <Group justify='space-between'>
                                        <Group gap={10}>
                                            <Badge size="md" radius="xl" variant="filled" color='orange'>{Number(index) + 1}</Badge>
                                            <Text>{parent.name}</Text>
                                        </Group>

                                    </Group>

                                </Accordion.Control>
                                <Group justify='space-between' w={100} mr={10}>
                                    <Group justify='end' gap="xs" >
                                        <ActionIcon w={40} color="dark" variant="outline" onClick={() => setPosition('up', index)} disabled={index == 0}>
                                            <IconArrowUp size="1.125rem" />
                                        </ActionIcon>
                                        <ActionIcon w={40} color="dark" variant="outline" onClick={() => setPosition('down', index)} disabled={index == menu.length - 1}>
                                            <IconArrowDown size="1.125rem" />
                                        </ActionIcon>
                                    </Group>
                                </Group>
                            </Box>
                            <Accordion.Panel style={{ backgroundColor: '#ffffff', }} >
                                <SimpleGrid
                                    cols={3}
                                    spacing="xs"
                                >
                                    <Stack p='md'>
                                        <TextInput
                                            placeholder="Name"
                                            description="Not a label"
                                            label="Name"
                                            // withAsterisk
                                            id='name'
                                            onChange={onChange}
                                            value={parent.name}
                                        />

                                        <Checkbox.Group
                                            value={parent.shops}
                                            onChange={(e) => onChange(e, 'shops')}
                                            label="Shops"
                                        // withAsterisk
                                        >
                                            <Group>
                                                <Checkbox value="myr" label="MYR" />
                                                <Checkbox value="sgd" label="SGD" />
                                                <Checkbox value="usd" label="USD" />
                                            </Group>
                                        </Checkbox.Group>

                                        <Divider my={'xs'} />

                                        <Checkbox
                                            label="Show All Button"
                                            id='show_all_button'
                                            value={parent.show_all_button}
                                            checked={parent.show_all_button}
                                            onChange={(event) => onChange(event.currentTarget.checked, 'show_all_button')}
                                        />

                                        <Checkbox
                                            label="Active"
                                            checked={parent.active}
                                            onChange={(event) => onChange(event.currentTarget.checked, 'active')}
                                        />

                                        <Button color="red" w={'100%'} onClick={() => setDelMenuOpen(true)}>
                                            Delete
                                        </Button>


                                    </Stack>
                                    <Stack p='md'>
                                        <MenuResource resource={parent.resource} index={index} setResource={setResource} />

                                        {/* <Group position="apart">
                                            <Text size={'md'}>Position</Text>
                                            <Group position="right" spacing="xs" >
                                                <ActionIcon w={50} color="dark" variant="outline" onClick={() => setPosition('up', index)} disabled={index == 0}>
                                                    <IconArrowUp size="1.125rem" />
                                                </ActionIcon>
                                                <ActionIcon w={50} color="dark" variant="outline" onClick={() => setPosition('down', index)} disabled={index == menu.length - 1}>
                                                    <IconArrowDown size="1.125rem" />
                                                </ActionIcon>
                                            </Group>
                                        </Group> */}
                                    </Stack>
                                </SimpleGrid>
                                <Divider />
                                <Paper w={'100%'} p={20} mb={40}>
                                    <Text fw={'bolder'}>Block Content</Text>
                                    <BlockCreator defaultPreviewSize={100} />
                                </Paper>
                            </Accordion.Panel>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Stack >
        <Affix position={{ bottom: rem(10), left: '50%' }}>
            <Paper shadow='xl' p={5} withBorder bg='orange.2' radius={'xl'}>
                <Button color='green' leftSection={<IconDeviceFloppy />} radius={'xl'} onClick={() => onSubmit(data)}>Save Changes</Button>
            </Paper>
        </Affix>
    </>

}
