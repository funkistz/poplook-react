import { TextInput, Text, Flex, FocusTrap, NumberInput, Checkbox, Button, Box, Divider, ColorInput, Group, Stack, SimpleGrid, Tooltip, MultiSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { saveBlock} from "../../redux/blockSlice";
import { IconAlertCircle } from "@tabler/icons-react";
import { usePage } from "@inertiajs/react";

function RowForm({ needCategory }: any) {

    const [opened, { open, close }] = useDisclosure(false);
    const { block, activeParent } = useSelector((storeState: any) => storeState.block);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { idCategoryList } = usePage<any>().props;

    const setAtttribute = (attr: any, val: any, prop: string | null = null) => {

        const temp = JSON.parse(JSON.stringify(block));

        if (prop != null) {
            temp[activeParent][attr][prop] = val;
        } else {
            temp[activeParent][attr] = val;
        }

        dispatch(saveBlock(temp));
    }

    return (<>

        {activeParent != null && <Box>
            <TextInput
                label="Name"
                placeholder="Name"
                mt={10}
                size='xs'
                value={block[activeParent].name}
                onChange={(e) => setAtttribute('name', e.target.value)}
            />

            <Checkbox.Group
                value={block[activeParent].shops}
                onChange={(e) => setAtttribute('shops', e)}
                label="Shops"
                withAsterisk
                size='xs'
                mt={10}
            >
                <Group>
                    <Checkbox value="myr" label="MYR" />
                    <Checkbox value="sgd" label="SGD" />
                    <Checkbox value="usd" label="USD" />
                </Group>
            </Checkbox.Group>

            <FocusTrap active={block[activeParent].height === 'auto' ? false : true}>
                <NumberInput
                    label="Height"
                    placeholder="Height"
                    mt={10}
                    size='xs'
                    value={typeof block[activeParent].height === 'number' ? Number(block[activeParent].height) : ''}
                    onChange={(e) => setAtttribute('height', Number(e))}
                    disabled={block[activeParent].height === 'auto' ? true : false}
                    hideControls
                    min={0}
                />
            </FocusTrap>
            <Checkbox
                label="Auto"
                radius="xs"
                size="xs"
                mt={10}
                checked={block[activeParent].height === 'auto' ? true : false}
                onChange={(e) => setAtttribute('height', e.currentTarget.checked ? 'auto' : '')}
            />

            <Stack mt={10} gap={5}>
                <Text fz={12} fw={600}>Padding</Text>
                <SimpleGrid cols={2} spacing={5}>
                    <NumberInput
                        // label="Top"
                        placeholder="Top"
                        size='xs'
                        onChange={(e) => setAtttribute('padding', Number(e), 'top')}
                        value={Number(JSON.stringify(block[activeParent].padding.top))}
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
                        onChange={(e) => setAtttribute('padding', Number(e), 'right')}
                        value={Number(JSON.stringify(block[activeParent].padding.right))}
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
                        onChange={(e) => setAtttribute('padding', Number(e), 'bottom')}
                        value={Number(JSON.stringify(block[activeParent].padding.bottom))}
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
                        onChange={(e) => setAtttribute('padding', Number(e), 'left')}
                        value={Number(JSON.stringify(block[activeParent].padding.left))}
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

            {needCategory && <MultiSelect
                label="Category"
                mt={10}
                size={'xs'}
                // placeholder="Category"
                data={idCategoryList}
                clearable
                searchable
                nothingFoundMessage="Nothing found..."
                value={block[activeParent]?.categoryId}
                onChange={(e) => setAtttribute('categoryId', e)}
            />}



            <Text fz={12} mt={10} pb={5} fw={600}>Flex</Text>
            <Divider></Divider>

            <Text fz={11} py={5} fw={400}>Direction</Text>
            <Box mb={10}>
                <Button
                    size='xs' color='dark'
                    onClick={() => setAtttribute('flex', 'row', 'direction')}
                    variant={block[activeParent].flex.direction == "row" ? 'filled' : 'outline'}
                    mr={5} mb={5}>
                    Horizontal
                </Button>
                <Button
                    size="xs" color="dark"
                    onClick={() => setAtttribute('flex', 'column', 'direction')}
                    variant={block[activeParent].flex.direction == "column" ? 'filled' : 'outline'}
                    mr={5} mb={5}>
                    Vertical
                </Button>
            </Box>

            <Text fz={12} pb={5} fw={400}>Wrap (for horizontal only)</Text>
            <Box mb={10}>
                <Button
                    size='xs' color='dark'
                    onClick={() => setAtttribute('flex', 'nowrap', 'wrap')}
                    variant={block[activeParent].flex.wrap == "nowrap" ? 'filled' : 'outline'}
                    mr={5} mb={5}>
                    nowrap
                </Button>
                <Button
                    color="dark" size="xs"
                    onClick={() => setAtttribute('flex', 'wrap', 'wrap')}
                    variant={block[activeParent].flex.wrap == "wrap" ? 'filled' : 'outline'}
                    mr={5} mb={5}>
                    wrap
                </Button>
                <Text fz={12}>*Nowrap will force all child in one row. </Text>
                <Text fz={12}>*Wrap will force child to next row if there is no space. </Text>
            </Box>

            <Text fz={12} pb={5} fw={400}>Justify-content</Text>
            <Box mb={10}>
                <Button
                    size='xs' color='dark'
                    onClick={() => setAtttribute('flex', 'flex-start', 'justifyContent')}
                    variant={block[activeParent].flex.justifyContent == "flex-start" ? 'filled' : 'outline'}
                    mr={5} mb={5} >
                    flex-start
                </Button>
                <Button
                    color="dark" size="xs"
                    onClick={() => setAtttribute('flex', 'flex-end', 'justifyContent')}
                    variant={block[activeParent].flex.justifyContent == "flex-end" ? 'filled' : 'outline'}
                    mr={5} mb={5} >
                    flex-end
                </Button>
                <Button
                    color="dark" size="xs"
                    onClick={() => setAtttribute('flex', 'center', 'justifyContent')}
                    variant={block[activeParent].flex.justifyContent == "center" ? 'filled' : 'outline'}
                    mr={5} mb={5} >
                    center
                </Button>
                <Button
                    color="dark" size="xs"
                    onClick={() => setAtttribute('flex', 'space-between', 'justifyContent')}
                    variant={block[activeParent].flex.justifyContent == "space-between" ? 'filled' : 'outline'}
                    mr={5} mb={5}>
                    space-between
                </Button>
                <Button
                    color="dark" size="xs"
                    onClick={() => setAtttribute('flex', 'space-around', 'justifyContent')}
                    variant={block[activeParent].flex.justifyContent == "space-around" ? 'filled' : 'outline'}
                    mr={5} mb={5} >
                    space-around
                </Button>
                <Button
                    color="dark" size="xs"
                    onClick={() => setAtttribute('flex', 'space-evenly', 'justifyContent')}
                    variant={block[activeParent].flex.justifyContent == "space-evenly" ? 'filled' : 'outline'}
                    mr={5} mb={5} >
                    space-evenly
                </Button>
            </Box>

            <ColorInput
                placeholder="Pick color"
                label="Background"
                size='xs'
                defaultValue={block[activeParent].backgroundColor}
                mb={10}
                onChange={(e) => setAtttribute('backgroundColor', e)}
                swatches={['#ffffff00']}
            />

            <Flex justify={'flex-end'}>
                <Button color='red' size='xs' w={'100%'} onClick={open}>Delete</Button>
            </Flex>
        </Box>
        }
    </>);
}

export default RowForm;