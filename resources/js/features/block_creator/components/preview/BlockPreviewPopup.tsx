import { Modal, Button, Flex, Group, Select, Text, ScrollArea, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setShop } from '../../redux/blockSlice';
import { BlockPreview } from '../../index';

export default function BlockPreviewPopup({ block }: any) {

    const { shop } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Preview" size={'xl'}>
                <Group justify="right" mb={20}>
                    <Text>Shop:</Text>
                    <Select
                        size='xs'
                        mr={10}
                        data={[
                            { value: '1', label: 'MYR' },
                            { value: '2', label: 'SGD' },
                            { value: '3', label: 'USD' },
                        ]}
                        onChange={(val) => dispatch(setShop(Number(val)))}
                        defaultValue={shop.toString()}
                    />
                </Group>
                <ScrollArea>
                    <BlockPreview shop={shop} block={block} />
                </ScrollArea>
            </Modal>

            <Flex direction={'row'}>
                <Flex align={'center'}>
                    <Badge color={'blue'} size={'xs'} variant="filled" >&nbsp;</Badge>
                    <Text fz={13} mx={5}>MYR</Text>
                </Flex>
                <Flex align={'center'}>
                    <Badge color={'yellow'} size={'xs'} variant="filled" >&nbsp;</Badge>
                    <Text fz={13} mx={5}>SGD</Text>
                </Flex>
                <Flex align={'center'}>
                    <Badge color={'green'} size={'xs'} variant="filled" >&nbsp;</Badge>
                    <Text fz={13} mx={5}>USD</Text>
                </Flex>
            </Flex>
            <Button size="sm" color="orange" leftSection={<IconEye />} onClick={open}>Preview</Button>
        </>
    )
}
