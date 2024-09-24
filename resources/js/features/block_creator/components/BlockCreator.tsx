import React, { useEffect, useState } from "react";
import { Flex, Stack, ActionIcon, Button, Group, Modal, Drawer, HoverCard, Divider, Slider, Badge, Text } from "@mantine/core";
import { 
    BlockPreviewPopup, ColumnForm, CreateNewRow, PreviewBlock, PreviewCarousel, PreviewCountdown, PreviewGrid, 
    PreviewNavigation, PreviewProductList, PreviewText, PreviewVimeo, RowForm , CreateNewChild, BlockCreatorCss
} from "../index";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { saveBlock, setActiveParent, setActiveChild, deleteRow, deleteColumn, setPreviewSize } from "../redux/blockSlice";
import DeleteDialog from "@/Components/DefaultForms/DeleteDialog";
import { AddButton, DeleteButton, UpdateButton } from "@/Components";


function BlockCreator({ defaultPreviewSize, needCategory = false, oneParentOnly = false }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { block, activeParent, activeChild, shop, previewSize } = useSelector((storeState: any) => storeState.block);

    const [addRowOpen, setAddRowOpen] = useState(false);
    const [addChildOpen, setAddChildOpen] = useState(false);

    const [deleteRowOpen, setDeleteRowOpen] = useState(false);
    const [deleteParentIndex, setDeleteParentIndex] = useState(-1);

    const [deleteColumnOpen, setDeleteColumnOpen] = useState(false);
    const [deleteColumnIndex, setDeleteColumnIndex] = useState(-1);


    useEffect(() => {

        if (defaultPreviewSize) {
            dispatch(setPreviewSize(defaultPreviewSize));
        }
    }, [])


    const addRow = (data: any) => {
        if (data.type == 'template') {
            const tempParent = data.data[0];
            dispatch(saveBlock([...block, tempParent]));
            setAddRowOpen(false);
            return
        }

        // from file value block creator
        if (data && typeof data === 'object' && data.constructor === Object) {
            dispatch(saveBlock([...block, data]));
            setAddRowOpen(false);
            return
        }


    }

    const closeDrawer = () => {
        dispatch(setActiveParent(null));
        dispatch(setActiveChild(null));
    }

    const deleteParent = (indexToDelete: any) => {
        setDeleteParentIndex(indexToDelete);
        setDeleteRowOpen(true);
    }

    const confirmDeleteParent = () => {
        dispatch(deleteRow(deleteParentIndex));
        setDeleteParentIndex(-1);
        setDeleteRowOpen(false);
    }

    const onDeleteColumn = (parentIndex: any, childIndex: any) => {
        setDeleteParentIndex(parentIndex);
        setDeleteColumnIndex(childIndex);
        setDeleteColumnOpen(true);
    }

    const confirmDeleteColumn = () => {
        dispatch(deleteColumn({
            parentIndex: deleteParentIndex,
            childIndex: deleteColumnIndex,
        }));
        setDeleteParentIndex(-1);
        setDeleteColumnIndex(-1);
        setDeleteColumnOpen(false);
    }

    const setParentPosition = (attr: any, index: any) => {

        if (attr === 'down') {
            if (index < block.length - 1) {
                const updatedArray = [...block];
                [updatedArray[index], updatedArray[index + 1]] = [updatedArray[index + 1], updatedArray[index]];
                dispatch(saveBlock(updatedArray));
            }
        } else {
            if (index > 0) {
                const updatedArray = [...block];
                [updatedArray[index], updatedArray[index - 1]] = [updatedArray[index - 1], updatedArray[index]];
                dispatch(saveBlock(updatedArray));
            }
        }
    };

    const setChildPosition = (attr: any, index: any, parentIndex: any) => {
        if (attr === 'down') {
            if (index < block[parentIndex].children.length - 1) {
                const parentArray = [...block];
                const updatedArray = [...block[parentIndex].children];
                [updatedArray[index], updatedArray[index + 1]] = [updatedArray[index + 1], updatedArray[index]];
                const updatedBlock = { ...block[parentIndex], children: updatedArray };

                parentArray[parentIndex] = updatedBlock;
                dispatch(saveBlock(parentArray));
            }
        } else if (attr === 'up') {
            if (index > 0) {
                const parentArray = [...block];
                const updatedArray = [...block[parentIndex].children];
                [updatedArray[index], updatedArray[index - 1]] = [updatedArray[index - 1], updatedArray[index]];
                const updatedBlock = { ...block[parentIndex], children: updatedArray };

                parentArray[parentIndex] = updatedBlock;
                dispatch(saveBlock(parentArray));
            }
        }
    };

    const addEditChildModal = (index: any, childIndex: any = null) => {
        dispatch(setActiveParent(index));
        dispatch(setActiveChild(childIndex));
        setAddChildOpen(true);
    };

    const closeChildModal = () => {
        dispatch(setActiveParent(null));
        dispatch(setActiveChild(null));
        setAddChildOpen(false)
    }

    const editParent = (index: any) => {
        dispatch(setActiveParent(index));
        dispatch(setActiveChild(null));
    }

    const editChild = (parentIndex: any, index: any) => {
        dispatch(setActiveParent(parentIndex));
        dispatch(setActiveChild(index));
    }


    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return col.value + '%';
        } else if (col.type == 'px') {
            return col.value + 'px';
        } else if (col.type == 'auto') {
            return 'auto';
        } else {
            return 'auto';
        }

    }

    const shopsIndicator = (data: any, floating = true) => {
        // if shops didn't exist
        if (!data) {
            return;
        }

        if (data.length > 0) {
            if (floating) {
                return <Flex bg={'#f8f9fa'} p={2} style={{ position: 'absolute', top: 5, left: 5, borderRadius: 20 }}>
                    {
                        data.map((item: any, index: any) => {
                            return <Badge key={index} color={item === 'usd' ? 'green' : item === 'sgd' ? 'yellow' : 'blue'} size={'xs'} variant="filled" mx={2} >&nbsp;</Badge>
                        })
                    }
                </Flex>
            }
            return <Flex mt={5} style={{ borderRadius: 10 }}>
                {
                    data.map((item: any, index: any) => {
                        return <Badge key={index} color={item === 'usd' ? 'green' : item === 'sgd' ? 'yellow' : 'blue'} size={'xs'} variant="filled" mx={2} >&nbsp;</Badge>
                    })
                }
            </Flex>
        } else {
            return <Flex bg={'#f8f9fa'} p={2} style={{ position: 'absolute', top: 5, left: 5, borderRadius: 20 }}>
                <Text fz={13} px={5}>No Shops</Text>
            </Flex>
        }
    }

    return (<>
        <Modal opened={addRowOpen} onClose={() => setAddRowOpen(false)} title="Add new row" size='xl'>
            <CreateNewRow addRow={addRow} />
        </Modal>
        <Modal opened={addChildOpen} onClose={closeChildModal} title="Add new child" size='xl'>
            <CreateNewChild closeModal={closeChildModal} />
        </Modal>
        <DeleteDialog opened={deleteRowOpen} setModal={setDeleteRowOpen} onConfirm={confirmDeleteParent} />
        <DeleteDialog opened={deleteColumnOpen} setModal={setDeleteColumnOpen} onConfirm={confirmDeleteColumn} />

        <Drawer
            opened={((activeParent != null) || (activeChild != null)) && !addChildOpen}
            onClose={() => { closeDrawer() }}
            title={'Update ' + ((activeParent != null) && (activeChild == null) ? 'Parent' : 'Child')}
            position="right"
            size='22%'
            withOverlay={false}
            lockScroll={false}
            styles={{
                body: { backgroundColor: (activeParent != null) && (activeChild == null) ? '#fff' : '#fff' },
                header: { backgroundColor: (activeParent != null) && (activeChild == null) ? '#fff' : '#fff' },
                title: { fontWeight: 600 }
            }}
        >
            {(activeParent != null) && (activeChild == null) && <RowForm needCategory={needCategory} />}
            {(activeParent != null) && (activeChild != null) && <ColumnForm />}
        </Drawer>

        <Divider mt={20} mb={20} />

        <Stack gap={5}>
            <Text>Preview size:</Text>
            <Group justify="space-between" ml={5} mb={25}>
                <Slider
                    value={previewSize}
                    onChange={(val) => dispatch(setPreviewSize(val))}
                    w={400}
                    min={25}
                    label={(e) => `${e}%`}
                    thumbSize={20}
                    marks={[
                        { value: 20, label: '20%' },
                        { value: 50, label: '50%' },
                        { value: 80, label: '80%' },
                        { value: 100, label: '100%' },
                    ]}
                />
            </Group>
        </Stack>

        {!block || block.length <= 0 && <Flex justify={'left'}>
            <Stack style={{ overflow: 'scroll', backgroundColor: '#eee' }} w={previewSize + '%'} m={0} p={20} gap={2}>
                Block Empty
            </Stack>
        </Flex>}
        {block && block.length > 0 &&
            <Stack>
                <Group w={previewSize + '%'} justify='flex-end'>
                    <BlockPreviewPopup block={block} />
                </Group>
                <Flex justify={'left'}>
                    <Stack style={{}} className={BlockCreatorCss.container} w={previewSize + '%'} m={0} p={0} gap={2}>
                        {block.map((resParent: any, index: any) => {
                            return (
                                <React.Fragment key={index}>
                                    <Flex align="start">
                                        <Flex
                                            direction={resParent.flex.direction}
                                            wrap={resParent.flex.wrap}
                                            justify={resParent.flex.justifyContent}
                                            key={index}
                                            bg={resParent.backgroundColor}
                                            w={'100%'}
                                            pt={resParent.padding.top}
                                            pb={resParent.padding.bottom}
                                            pr={resParent.padding.right}
                                            pl={resParent.padding.left}
                                            h={resParent.height}
                                        >
                                            {resParent.children != null &&
                                                <>
                                                    {resParent.children.map((res: any, childIndex: any) => {
                                                        return (
                                                            <HoverCard width={280} shadow="md" key={childIndex} position="top" withArrow radius='md' offset={-30} arrowSize={10}>
                                                                <HoverCard.Target>
                                                                    <Flex
                                                                        align='flex-start'
                                                                        className={BlockCreatorCss.hoverCard}
                                                                        bg={res.backgroundColor}
                                                                        w={getChildWidth(res.col)}
                                                                        style={res.col.type == 'flexGrow' ? { flexGrow: res.col.value } : {}}
                                                                        pt={res.padding.top}
                                                                        pb={res.padding.bottom}
                                                                        pr={res.padding.right}
                                                                        pl={res.padding.left}
                                                                        h={res.height}
                                                                        onClick={() => editChild(index, childIndex)}
                                                                    >
                                                                        {res.block.type == 'block' && <PreviewBlock shop={shop} res={res.block.resource} defaultTitle={'Child ' + (Number(childIndex) + 1)} parentHeight={res.height} shopIndicator={shopsIndicator(res.shops)} />}

                                                                        {res.block.type == 'grid' && <PreviewGrid shop={shop} res={res.block} parentHeight={res.height} shopIndicator={shopsIndicator(res.shops)} />}

                                                                        {res.block.type == "carousel" && <PreviewCarousel shop={shop} res={res.block} shopIndicator={shopsIndicator(res.shops, false)} shopIndicatorFloat={true} />}

                                                                        {res.block.type == "slider" && <PreviewCarousel shop={shop} res={res.block} shopIndicator={shopsIndicator(res.shops, false)} shopIndicatorFloat={true} />}

                                                                        {res.block.type == 'product_list' && <PreviewProductList res={res.block} shop={shop} shopIndicator={shopsIndicator(res.shops)}></PreviewProductList>}

                                                                        {res.block.type == 'navigation_list' && <PreviewNavigation res={res.block} shop={shop} shopIndicator={shopsIndicator(res.shops, false)} />}

                                                                        {res.block.type == 'vimeo' && <PreviewVimeo res={res.block} shop={shop} />}

                                                                        {res.block.type == 'text' && <PreviewText res={res.block.resource} shop={shop} shopIndicator={shopsIndicator(res.shops, false)} shopIndicatorFloat={true} />}

                                                                        {res.block.type == 'countdown' && <PreviewCountdown res={res.block} shop={shop} shopIndicator={shopsIndicator(res.shops)} />}

                                                                    </Flex>
                                                                </HoverCard.Target>
                                                                <HoverCard.Dropdown>
                                                                    <Stack gap="xs">
                                                                        <Group justify='space-between'>
                                                                            <Text tt={'capitalize'}>{res.block?.type.replace(/_/g, ' ').trim()}</Text>
                                                                            <Group justify="flex-end" gap="xs" >
                                                                                <ActionIcon w={50} color="dark" variant="outline" onClick={() => setChildPosition('up', childIndex, index)} disabled={childIndex == 0}>
                                                                                    <IconArrowUp size="1.125rem" />
                                                                                </ActionIcon>
                                                                                <ActionIcon w={50} color="dark" variant="outline" onClick={() => setChildPosition('down', childIndex, index)} disabled={childIndex == resParent.children.length - 1}>
                                                                                    <IconArrowDown size="1.125rem" />
                                                                                </ActionIcon>
                                                                            </Group>
                                                                        </Group>

                                                                        <Button onClick={() => editChild(index, childIndex)}>Edit</Button>
                                                                        <Button onClick={() => addEditChildModal(index, childIndex)} color="green">Change Content Type</Button>

                                                                        <Divider mt={10} />
                                                                        <Button onClick={() => onDeleteColumn(index, childIndex)} color="red">Delete</Button>
                                                                    </Stack>

                                                                </HoverCard.Dropdown>
                                                            </HoverCard>
                                                        )
                                                    })}
                                                </>
                                            }
                                        </Flex>
                                        <Divider my="sm" variant="dashed" />
                                        <Stack p='sm' justify="flex-start" h='100%' ml={2} bg='gray.0' style={{ border: 'solid 1px #ccc' }} gap="xs">
                                            <Group gap="xs" >
                                                {
                                                    resParent.shops && <>
                                                        {
                                                            resParent.shops.length > 0 && <>
                                                                {
                                                                    resParent.shops.map((item: any, index: any) => {
                                                                        return <Badge key={index} color={item === 'usd' ? 'green' : item === 'sgd' ? 'yellow' : 'blue'} size={'xs'} variant="filled" m={0} >&nbsp;</Badge>
                                                                    })
                                                                }
                                                            </>
                                                        }
                                                        {
                                                            resParent.shops.length == 0 && <>
                                                                <Text fz={13}>No shops</Text>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </Group>
                                            <Group justify='space-between' gap="xs" grow>
                                                <ActionIcon color="dark" variant="outline" onClick={() => setParentPosition('up', index)} disabled={index == 0}>
                                                    <IconArrowUp size="1.125rem" />
                                                </ActionIcon>
                                                <ActionIcon color="dark" variant="outline" onClick={() => setParentPosition('down', index)} disabled={index == block.length - 1}>
                                                    <IconArrowDown size="1.125rem" />
                                                </ActionIcon>
                                            </Group>
                                            <UpdateButton size="xs" onClick={() => editParent(index)}>Edit</UpdateButton>
                                            <AddButton size="xs" color="green" onClick={() => addEditChildModal(index)}>Add Child</AddButton>
                                            <Divider mt={2} />
                                            <DeleteButton size="xs" color="red" onClick={() => deleteParent(index)}>Delete</DeleteButton>
                                        </Stack>
                                    </Flex>
                                    <Divider my={0} variant="dashed" color="black" />
                                </React.Fragment>
                            )
                        })}
                    </Stack >
                </Flex >
            </Stack>
        }

        {oneParentOnly ?
            block.length < 1 && <Flex justify={'center'} w={previewSize + '%'}>
                <Button size="lg" variant="default" color="green" m='lg' onClick={() => setAddRowOpen(true)}>Add New Row</Button>
            </Flex>
            :
            <Flex justify={'center'} w={previewSize + '%'}>
                <Button size="lg" variant="default" color="green" m='lg' onClick={() => setAddRowOpen(true)}>Add New Row</Button>
            </Flex>
        }

    </>);
}

export default BlockCreator;