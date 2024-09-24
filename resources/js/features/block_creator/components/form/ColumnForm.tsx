import {TextInput, Grid, NumberInput, FocusTrap, Checkbox, Text, ColorInput, Select, Flex, Button, Group, Paper, Switch,  Stack, Radio, SimpleGrid, Tooltip} from '@mantine/core';
import { useState } from 'react'
import { IconPercentage, IconAlertCircle } from '@tabler/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { saveBlock, deleteColumn } from "../../redux/blockSlice";
import DeleteDialog from '@/Components/DefaultForms/DeleteDialog';
import { usePage } from '@inertiajs/react';
import { DateTimePicker } from '@mantine/dates';
import moment from 'moment';
import TextWithStyle from '../result/TextWithStyle';
import extractNumberBeforeHyphen from '@/features/helper/components/extractNumberBeforeHyphen';
import { BannerResources } from '../../index';

export default function ColumnForm({ }: any) {

    const { categoryList } = usePage<any>().props;
    const { block, activeParent, activeChild } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [deleteColumnOpen, setDeleteColumnOpen] = useState(false);

    const childData = block[activeParent].children[activeChild];

    // Function
    const setData = (attr: any, val: any, prop: string | null = null, propChild: string | null = null) => {

        const newData = JSON.parse(JSON.stringify(block));

        if (prop != null) {
            if (propChild != null) {
                newData[activeParent].children[activeChild][attr][prop][propChild] = val;
            } else {
                newData[activeParent].children[activeChild][attr][prop] = val;
            }

        } else {
            newData[activeParent].children[activeChild][attr] = val;
        }

        dispatch(saveBlock(newData));
    }
    const deleteActiveColumn = () => {

        dispatch(deleteColumn({ parentIndex: activeParent, childIndex: activeChild }));
        return;
    }
    const resourceLabelDuplicate = (attr: any, val: any, prop: string | null) => {
        const newData = JSON.parse(JSON.stringify(block));
        const newResource = newData[activeParent].children[activeChild].block.resource;

        if (prop != null) {
            newData[activeParent].children[activeChild][attr][prop] = val;
        } else {
            newData[activeParent].children[activeChild][attr] = val;
        }

        const objToPass = newData[activeParent].children[activeChild].block.labelResourceObj;

        newResource.map((res: any, index: any) => {
            res.myr.labelObj = { ...objToPass, content: res.myr.labelObj?.content };
            res.sgd.labelObj = { ...objToPass, content: res.myr.labelObj?.content };
            res.usd.labelObj = { ...objToPass, content: res.myr.labelObj?.content };
            return res;
        })

        dispatch(saveBlock(newData));
    }

    const editProperties = ['grid', 'carousel', 'slider', 'product_list', 'vimeo', 'navigation_list', 'countdown'];
    const noResources = ['product_list'];

    const getTitle = () => {
        // remove _ and first letter capitalize
        const capitalizedString = childData.block.type.replace(/_/g, ' ').trim().replace(/^\w/, (c: any) => c.toUpperCase());

        return 'Edit ' + capitalizedString + ' Properties';
    }


    // Components
    const carouselSetting = () => {
        return <Flex direction={'column'}>
            <Flex>
                <Switch
                    checked={childData.block.loop}
                    onChange={(e) => setData('block', e.target.checked, 'loop')}
                    label="Loop"
                />
            </Flex>
            <Flex mt={10}>
                <Switch
                    checked={childData.block.withControls}
                    onChange={(e) => setData('block', e.target.checked, 'withControls')}
                    label="With control"
                />
            </Flex>
            <Flex mt={10}>
                <Switch
                    checked={childData.block.withIndicators}
                    onChange={(e) => setData('block', e.target.checked, 'withIndicators')}
                    label="With indicators"
                />
            </Flex>

            <TextInput
                type='number'
                size='xs'
                label={'Autoplay'}
                mt={10}
                placeholder="Number"
                value={childData.block.autoPlay ? childData.block.autoPlay : ''}
                onChange={(e) => setData('block', e.target.value.length > 0 ? Number(e.target.value) : null, 'autoPlay')}
                rightSection={
                    <Text mr={10} size={'xs'}>sec</Text>
                }
            />

            <TextWithStyle
                obj={childData.block.labelObj}
                onChangeData={setData}
                title={"Label"}
                subtitle={"Will appear at top of the carousel"}
                withStyle
            />

            <TextWithStyle
                obj={childData.block.labelResourceObj}
                onChangeData={resourceLabelDuplicate}
                onChangeType={'copy'}
                title={"Label Item"}
                subtitle={"Will appear at bottom of the each item carousel"}
                content={false}
                withStyle
            />
        </Flex>
    }

    const sliderSetting = () => {
        return <Flex direction={'column'}>
            <Flex>
                <NumberInput
                    label="Size"
                    placeholder="percent"
                    size='xs'
                    description={'10%-100%'}
                    value={Number(childData.block.slideSize)}
                    onChange={(e) => setData('block', Number(e), 'slideSize')}
                    hideControls
                    // type='number'
                    min={10}
                    max={100}
                    w={'100%'}
                    rightSection={
                        <IconPercentage size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                    }
                />
            </Flex>
            <Flex mt={10}>
                <NumberInput
                    label="Gap"
                    placeholder="px"
                    size='xs'
                    value={Number(childData.block.slideGap)}
                    onChange={(e) => setData('block', Number(e), 'slideGap')}
                    hideControls
                    // type='number'
                    min={0}
                    max={50}
                    w={'100%'}
                    rightSection={
                        <Text size={'xs'} pr={10}>px</Text>
                    }
                />
            </Flex>

            <TextWithStyle
                obj={childData.block.labelObj}
                onChangeData={setData}
                title={"Title"}
                subtitle={"Will appear at top of the slider"}
                withStyle
            />

            <TextWithStyle
                obj={childData.block.labelResourceObj}
                onChangeData={resourceLabelDuplicate}
                onChangeType={'copy'}
                title={"Title Item"}
                subtitle={"Will appear at bottom of the each item slider"}
                content={false}
                withStyle
            />
        </Flex>
    }

    const productListSetting = () => {
        return <Flex direction={'column'}>
            <Select
                size='xs'
                label={'Category'}
                mb={10}
                placeholder="Category"
                searchable
                nothingFoundMessage="No options"
                value={childData.block.category?.name}
                data={categoryList}
                onChange={(e: any) => {
                    setData('block', { id: extractNumberBeforeHyphen(e), name: e }, 'category')
                }}
            />

            <Text fz={12} fw={500}>Filter</Text>
            <Flex direction={'row'} mb={10}>
                <NumberInput
                    size='xs'
                    w={'20%'}
                    value={childData.block.numPage}
                    onChange={(e) => setData('block', e, 'numPage')}
                    hideControls
                    disabled={childData.block?.category ? false : true}
                    rightSection={
                        <Tooltip label="Number Page" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                />
                <NumberInput
                    size='xs'
                    mx={5}
                    w={'20%'}
                    value={childData.block.numList}
                    onChange={(e) => setData('block', e, 'numList')}
                    hideControls
                    disabled={childData.block?.category ? false : true}
                    rightSection={
                        <Tooltip label="Number List" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                />
                <Select
                    size='xs'
                    placeholder="Sort By"
                    searchable
                    nothingFoundMessage="No options"
                    value={childData.block?.sortOption?.toString() || '0'}
                    withCheckIcon={false}
                    disabled={childData.block?.category ? false : true}
                    data={[
                        { value: '0', label: 'Popularity' },
                        { value: '7', label: 'Newest' },
                        { value: '6', label: 'Default' },
                        { value: '1', label: 'Price Lowest to Highest' },
                        { value: '2', label: 'Price Highest to Lowest' },
                    ]}
                    onChange={(e) => setData('block', e, 'sortOption')}
                    rightSection={
                        <Tooltip label="Sort By" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                />
            </Flex>

            <NumberInput
                label="Size"
                description={'10%-100%'}
                placeholder="percent"
                size='xs'
                value={Number(childData.block.slideSize)}
                onChange={(e) => setData('block', Number(e), 'slideSize')}
                hideControls
                disabled={childData.block?.category ? false : true}
                min={5}
                w={'100%'}
                mb={10}
                rightSection={
                    <IconPercentage size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                }
            />
            <NumberInput
                label="Gap"
                placeholder="px"
                size='xs'
                value={Number(childData.block.slideGap)}
                onChange={(e) => setData('block', Number(e), 'slideGap')}
                hideControls
                disabled={childData.block?.category ? false : true}
                min={0}
                w={'100%'}
                rightSection={
                    <Text size={'xs'} pr={10}>px</Text>
                }
            />

            <TextWithStyle
                obj={childData.block.labelObj}
                onChangeData={setData}
                title={"Title"}
                subtitle={"Will appear at top of the product list"}
                disabled={childData.block?.category ? false : true}
                withStyle
            />

            <TextWithStyle
                obj={childData.block.labelResourceObj}
                onChangeData={resourceLabelDuplicate}
                onChangeType={'copy'}
                title={"Title Item"}
                subtitle={"Will appear at bottom of the each item product list"}
                content={false}
                disabled={childData.block?.category ? false : true}
                withStyle
            />

        </Flex>
    }

    const gridSetting = () => {
        return <Flex direction={'column'}>
            <Flex py={5}>
                <NumberInput
                    label="Column No"
                    placeholder="1-12"
                    size='xs'
                    value={Number(childData.block.columnNo)}
                    onChange={(e) => setData('block', Number(e), 'columnNo')}
                    min={1}
                    max={12}
                    w={150}
                />
            </Flex>
            <Flex mt={5} py={5}>
                <NumberInput
                    label="Grid Spacing"
                    placeholder="gap between item"
                    size='xs'
                    value={Number(childData.block.gridSpacing)}
                    onChange={(e) => { setData('block', Number(e), 'gridSpacing') }}
                    min={0}
                    max={50}
                    w={150}
                />
            </Flex>
        </Flex>
    }

    const vimeoSetting = () => {
        return <Flex direction={'column'}>
            <Flex py={5}>
                <Switch
                    checked={childData.block.loop}
                    onChange={(e) => setData('block', e.target.checked, 'loop')}
                    label="Loop"
                />
            </Flex>
            <Flex py={5}>
                <Switch
                    checked={childData.block.autoplay}
                    onChange={(e) => setData('block', e.target.checked, 'autoplay')}
                    label="Autoplay"
                />
            </Flex>
            <Flex py={5}>
                <Switch
                    checked={childData.block.muted}
                    onChange={(e) => setData('block', e.target.checked, 'muted')}
                    label="Muted"
                />
            </Flex>
            <Flex py={5}>
                <Switch
                    checked={childData.block.controls}
                    onChange={(e) => setData('block', e.target.checked, 'controls')}
                    label="Controls"
                />
            </Flex>
        </Flex>
    }

    const navigationSetting = () => {
        return <Flex direction={'column'}>
            <TextWithStyle
                obj={childData.block.labelObj}
                onChangeData={setData}
                title={"Navigation"}
                // subtitle={"Will appear at top of the each item navigation"}
                topMargin={false}
                withStyle
            />
            <TextWithStyle
                obj={childData.block.labelResourceObj}
                onChangeData={resourceLabelDuplicate}
                onChangeType={'copy'}
                title={"Link"}
                // subtitle={"Will appear at bottom of the each item carousel"}
                content={false}
                withStyle
            />
        </Flex>
    }

    const countdownSetting = () => {
        return <Flex direction={'column'}>
            <DateTimePicker
                label="Countdown End"
                placeholder="Countdown End"
                size={'xs'}
                // mt={10}
                minDate={new Date()}
                withSeconds
                onChange={(e) => setData('block', moment(e).format('YYYY-MM-DD HH:mm:ss'), 'end_at')}
                value={childData.block.end_at != null ? moment(childData.block.end_at).toDate() : undefined}
            />
            <Text fw={500} fz={12} mt={10}>Position</Text>
            <Flex bg={'#eee'} p={10} direction={'column'} style={{ borderRadius: 5 }}>
                <Flex justify={'space-between'} w={'100%'}>
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 1, 'position')}
                        checked={childData.block.position == 1}
                        disabled={childData.block.end_at ? false : true}
                    />
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 2, 'position')}
                        checked={childData.block.position == 2}
                        disabled={childData.block.end_at ? false : true}
                    />
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 3, 'position')}
                        checked={childData.block.position == 3}
                        disabled={childData.block.end_at ? false : true}
                    />
                </Flex>
                <Flex justify={'space-between'} w={'100%'} my={10}>
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 4, 'position')}
                        checked={childData.block.position == 4}
                        disabled={childData.block.end_at ? false : true}
                    />
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 5, 'position')}
                        checked={childData.block.position == 5}
                        disabled={childData.block.end_at ? false : true}
                    />
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 6, 'position')}
                        checked={childData.block.position == 6}
                        disabled={childData.block.end_at ? false : true}
                    />
                </Flex>
                <Flex justify={'space-between'} w={'100%'}>
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 7, 'position')}
                        checked={childData.block.position == 7}
                        disabled={childData.block.end_at ? false : true}
                    />
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 8, 'position')}
                        checked={childData.block.position == 8}
                        disabled={childData.block.end_at ? false : true}
                    />
                    <Radio
                        size={'xs'}
                        value={childData.block.position}
                        onChange={() => setData('block', 9, 'position')}
                        checked={childData.block.position == 9}
                        disabled={childData.block.end_at ? false : true}
                    />
                </Flex>

            </Flex>
            <Stack mt={10} gap={0}>
                <Text fz={12} fw={600} mb={5}>Padding</Text>
                <SimpleGrid cols={2} spacing={5} >
                    <NumberInput
                        // label="Top"
                        placeholder="Top"
                        size='xs'
                        onChange={(e) => setData('block', Number(e), 'paddingTop')}
                        value={Number(JSON.stringify(childData.block.paddingTop))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Top" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                        rightSection={
                            <Text size={'xs'}>%</Text>
                        }
                        disabled={childData.block.end_at ? false : true}
                    />
                    <NumberInput
                        // label="Right"
                        placeholder="Right"
                        size='xs'
                        onChange={(e) => setData('block', Number(e), 'paddingRight')}
                        value={Number(JSON.stringify(childData.block.paddingRight))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Right" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                        rightSection={
                            <Text size={'xs'}>%</Text>
                        }
                        disabled={childData.block.end_at ? false : true}

                    />
                    <NumberInput
                        // label="Bottom"
                        placeholder="Bottom"
                        size='xs'
                        onChange={(e) => setData('block', Number(e), 'paddingBottom')}
                        value={Number(JSON.stringify(childData.block.paddingBottom))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Bottom" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                        rightSection={
                            <Text size={'xs'}>%</Text>
                        }
                        disabled={childData.block.end_at ? false : true}
                    />
                    <NumberInput
                        // label="Left"
                        placeholder="Left"
                        size='xs'
                        onChange={(e) => setData('block', Number(e), 'paddingLeft')}
                        value={Number(JSON.stringify(childData.block.paddingLeft))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Left" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                        rightSection={
                            <Text size={'xs'}>%</Text>
                        }
                        disabled={childData.block.end_at ? false : true}
                    />
                </SimpleGrid>

            </Stack>

            <Text fw={500} fz={12} mt={10}>Panel</Text>
            <Flex direction={'row'}>
                <TextInput
                    type='number'
                    placeholder="size"
                    w={'20%'}
                    size='xs'
                    min={0}
                    value={childData.block.fontSize}
                    onChange={(e) => setData('block', e.target.value, 'fontSize')}
                    rightSection={
                        <Tooltip label="size" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    disabled={childData.block.end_at ? false : true}
                />
                <ColorInput
                    placeholder="Panel Color"
                    // label="Color"
                    w={'80%'}
                    ml={5}
                    size='xs'
                    value={childData.block.fontColor}
                    onChange={(e) => setData('block', e, 'fontColor')}
                    rightSection={
                        <Tooltip label="size" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    disabled={childData.block.end_at ? false : true}
                />
            </Flex>
            <ColorInput
                mt={5}
                size='xs'
                value={childData.block.panelColor}
                onChange={(e) => setData('block', e, 'panelColor')}
                rightSection={
                    <Tooltip label="background" position="top-end" withArrow>
                        <div>
                            <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                        </div>
                    </Tooltip>
                }
                disabled={childData.block.end_at ? false : true}
            />

            <Flex direction={'row'} mt={10}>
                <Text fz={12} pb={5} fw={600}>Label</Text>
                <Checkbox
                    size={'xs'}
                    ml={10}
                    checked={childData.block.labelShow}
                    onChange={(e) => setData('block', Number(e.target.checked), 'labelShow')}
                    disabled={childData.block.end_at ? false : true}
                />
            </Flex>
            {childData.block.labelShow && <Flex direction={'row'}>
                <TextInput
                    type='number'
                    // label="Size"
                    placeholder="Size"
                    w={'20%'}
                    size='xs'
                    value={childData.block.labelSize}
                    onChange={(e) => setData('block', Number(e.target.value), 'labelSize')}
                    rightSection={
                        <Tooltip label="Size" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    disabled={childData.block.end_at ? false : true}
                />
                <ColorInput
                    placeholder="Color"
                    // label="Color"
                    w={'80%'}
                    ml={5}
                    size='xs'
                    value={childData.block.labelColor}
                    onChange={(e) => setData('block', e, 'labelColor')}
                    rightSection={
                        <Tooltip label="Color" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    disabled={childData.block.end_at ? false : true}
                />
            </Flex>}
        </Flex >
    }

    return (
        <>
            <DeleteDialog opened={deleteColumnOpen} setModal={setDeleteColumnOpen} onConfirm={deleteActiveColumn} />

            <TextInput
                label="Name"
                placeholder="Name"
                size='xs'
                value={childData.name}
                onChange={(e) => setData('name', e.target.value)}
            />

            <Checkbox.Group
                value={childData.shops}
                onChange={(e) => setData('shops', e)}
                label="Shops"
                size='xs'
                mt={10}
            >
                <Group>
                    <Checkbox value="myr" label="MYR" />
                    <Checkbox value="sgd" label="SGD" />
                    <Checkbox value="usd" label="USD" />
                </Group>
            </Checkbox.Group>

            {childData.col && <Grid mt={10}>
                <Grid.Col span={7} pr={0}>
                    <NumberInput
                        label="Width"
                        placeholder="Width"
                        size='xs'
                        value={Number(childData.col.value)}
                        onChange={(e) => setData('col', Number(e), 'value')}
                        hideControls
                        max={childData.col.type == 'px' ? undefined : 100}
                        min={0}
                    />
                </Grid.Col>
                <Grid.Col span={5}>
                    <Select
                        size='xs'
                        label="&nbsp;"
                        placeholder="Pick one"
                        data={[
                            { value: 'px', label: 'px' },
                            { value: '%', label: '%' },
                            { value: 'flexGrow', label: 'Grow' },
                            { value: 'auto', label: 'auto' },
                        ]}
                        onChange={(e) => setData('col', e, 'type')}
                        value={childData.col.type}
                    />
                </Grid.Col>
            </Grid>}

            <FocusTrap active={childData.height === 'auto' ? false : true}>
                <NumberInput label="Height" placeholder="Height" mt={10}
                    size='xs'
                    value={typeof childData.height === 'number' ? Number(childData.height) : ''}
                    onChange={(e) => setData('height', Number(e))}
                    disabled={childData.height === 'auto' ? true : false}
                    hideControls
                    min={0}
                />
            </FocusTrap>
            <Checkbox
                label="Auto"
                radius="xs"
                size="xs"
                my={10}
                checked={childData.height === 'auto' ? true : false}
                onChange={(e) => setData('height', e.currentTarget.checked ? 'auto' : '')}
            />

            <Stack mt={10} gap={5}>
                <Text fz={12} fw={600}>Padding</Text>
                {/* <Divider></Divider> */}

                <SimpleGrid cols={2} spacing={5}>
                    <NumberInput
                        // label="Top"
                        placeholder="Top"
                        size='xs'
                        onChange={(e) => setData('padding', Number(e), 'top')}
                        value={Number(JSON.stringify(childData.padding?.top))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Top" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                    />
                    <NumberInput
                        // label="Right"
                        placeholder="Right"
                        size='xs'
                        onChange={(e) => setData('padding', Number(e), 'right')}
                        value={Number(JSON.stringify(childData.padding?.right))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Right" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                    />
                    <NumberInput
                        // label="Bottom"
                        placeholder="Bottom"
                        size='xs'
                        onChange={(e) => setData('padding', Number(e), 'bottom')}
                        value={Number(JSON.stringify(childData.padding?.bottom))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Bottom" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                    />
                    <NumberInput
                        // label="Left"
                        placeholder="Left"
                        size='xs'
                        onChange={(e) => setData('padding', Number(e), 'left')}
                        value={Number(JSON.stringify(childData.padding?.left))}
                        min={0}
                        hideControls
                        leftSection={
                            <Tooltip label="Left" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        }
                    />
                </SimpleGrid>

            </Stack>

            <ColorInput
                placeholder="Pick color"
                label="Background"
                size='xs'
                defaultValue={childData.backgroundColor}
                my={10}
                onChange={(e) => setData('backgroundColor', e)}
                swatches={['#ffffff00']}
            />

            {
                editProperties.includes(childData.block.type) && <>
                    <Text pb={5} fw={600} mt={20} fz={16}>{getTitle()}</Text>

                    <Paper p="md" mb={15} withBorder>
                        {childData.block.type == 'carousel' && carouselSetting()}
                        {childData.block.type == 'slider' && sliderSetting()}
                        {childData.block.type == 'product_list' && productListSetting()}
                        {childData.block.type == 'grid' && gridSetting()}
                        {childData.block.type == 'vimeo' && vimeoSetting()}
                        {childData.block.type == 'navigation_list' && navigationSetting()}
                        {childData.block.type == 'countdown' && countdownSetting()}
                    </Paper>
                </>
            }

            {!noResources.includes(childData.block.type) && <>
                <BannerResources childBlock={childData.block} />
                <Button color='red' w={'100%'} onClick={() => setDeleteColumnOpen(true)}>Delete</Button>
            </>}
        </>
    )
}
