import { forwardRef } from "react";
import { Button, ColorInput, Flex, Group, Paper, Select, Switch, TextInput, Tooltip } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconAlertCircle, IconAlignCenter, IconAlignLeft, IconAlignRight, IconItalic, IconStrikethrough, IconUnderline } from "@tabler/icons-react";
import { IconStyle } from "../..";

function TextWithStyle({
    obj,
    onChangeData,
    onChangeType,
    title,
    subtitle,
    topMargin = true,
    content = true,
    resourceShop,
    disabled = false,
    withStyle = false,
}: any) {

    const mt = 10;

    const selectBold = forwardRef<HTMLDivElement>(
        ({ image, label, value, ...others }: any, ref) => (
            <div ref={ref} {...others}>
                <Group wrap="nowrap">
                    <div>
                        <Text size="sm" fw={value}>{label}</Text>
                    </div>
                </Group>
            </div>
        )
    );

    const selectTransform = forwardRef<HTMLDivElement>(
        ({ image, label, value, ...others }: any, ref) => (
            <div ref={ref} {...others}>
                <Group wrap="nowrap">
                    <div>
                        <Text size="sm" tt={value}>{label}</Text>
                    </div>
                </Group>
            </div>
        )
    );

    const onChange = (data: any, type: any, props: string | null = null) => {
        const newObj = JSON.parse(JSON.stringify(obj))

        for (const key of Object.keys(obj)) {
            if (key == type) {
                if (props != null) {
                    newObj[key][props] = data;
                } else {
                    newObj[key] = data;
                }
            }
        }

        if (onChangeType == 'top_menu') {
            return onChangeData('labelObj', newObj, resourceShop)
        } else if (onChangeType == 'copy') {
            return onChangeData('block', newObj, 'labelResourceObj')
        } else if (onChangeType == 'resource') {
            return onChangeData(newObj, resourceShop, 'labelObj')
        }

        return onChangeData('block', newObj, 'labelObj')

    }

    const uploadFile = (url: any, type: any) => {
        onChange(url, 'icon', 'href')
        close();
    }

    return <>
        {title && <Text mt={topMargin ? mt : 0} fw={500} fz={12}>{title}</Text>}
        {subtitle && <Text fw={300} c={'dimmed'} fz={10}>{subtitle}</Text>}
        {withStyle && <>
            <Paper withBorder p="xs" bg="#fff">
                <Flex direction={'column'}>
                    <Flex justify={'end'}>
                        <Switch
                            onLabel="Icon"
                            offLabel="No Icon"
                            size={'lg'}
                            checked={obj.icon.isShow ? true : false}
                            onChange={(e) => onChange(e.target.checked, 'icon', 'isShow')}
                            disabled={disabled}
                        />
                    </Flex>
                    <Flex direction={'row'} mt={mt}>
                        {content && <TextInput
                            placeholder="label"
                            size={'xs'}
                            value={obj.content ? obj.content.toString() : ''}
                            w={'80%'}
                            rightSection={
                                <Tooltip label="label content" position="top-end" withArrow>
                                    <div>
                                        <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                    </div>
                                </Tooltip>
                            }
                            onChange={(e) => onChange(e.target.value, 'content')}
                            disabled={disabled}
                        />}

                        <TextInput
                            type={'number'}
                            w={content ? '20%' : '100%'}
                            ml={content ? 5 : 0}
                            placeholder="Size"
                            size={'xs'}
                            value={obj.size.toString()}
                            onChange={(e) => onChange(Number(e.target.value), 'size')}
                            rightSection={
                                !content && <Tooltip label="font size" position="top-end" withArrow>
                                    <div>
                                        <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                    </div>
                                </Tooltip>
                            }
                            disabled={disabled}
                        />
                    </Flex>
                    <Flex direction={'row'} mt={mt}>
                        <Select
                            size="xs"
                            // itemComponent={selectBold}
                            data={[
                                { value: '100', label: 'Thin' },
                                { value: '200', label: 'Extra Light' },
                                { value: '300', label: 'Light' },
                                { value: '400', label: 'Normal' },
                                { value: '500', label: 'Medium' },
                                { value: '600', label: 'Semi bold' },
                                { value: '700', label: 'Bold' },
                                { value: '800', label: 'Extra Bold' },
                                { value: '900', label: 'Ultra Bold' },
                            ]}
                            onChange={(e) => onChange(Number(e), 'bold')}
                            value={obj.bold.toString()}
                            disabled={disabled}
                        />
                        <Select
                            size="xs"
                            ml={5}
                            // itemComponent={selectTransform}
                            data={[
                                { value: 'none', label: 'none' },
                                { value: 'capitalize', label: 'capitalize' },
                                { value: 'uppercase', label: 'uppercase' },
                                { value: 'lowercase', label: 'lowercase' },
                            ]}
                            onChange={(e) => onChange(e, 'transform')}
                            value={obj.transform.toString()}
                            disabled={disabled}
                        />
                    </Flex>
                    <Flex direction={'row'} mt={mt}>
                        <Button.Group>
                            <Tooltip label="left" withArrow>
                                <Button
                                    variant="default"
                                    size={'xs'}
                                    px={5}
                                    onClick={(e) => onChange('left', 'align')}
                                    disabled={disabled}
                                >
                                    <IconAlignLeft
                                        color={obj.align == 'left' ? "green" : "#000"}
                                        size={"1rem"}
                                    />
                                </Button>
                            </Tooltip>
                            <Tooltip label="center" withArrow>
                                <Button
                                    variant="default"
                                    size={'xs'}
                                    px={5}
                                    onClick={(e) => onChange('center', 'align')}
                                    disabled={disabled}
                                >
                                    <IconAlignCenter
                                        color={obj.align == 'center' ? "green" : "#000"}
                                        size={"1rem"}
                                    />
                                </Button>
                            </Tooltip>
                            <Tooltip label="right" withArrow>
                                <Button
                                    variant="default"
                                    size={'xs'}
                                    px={5}
                                    onClick={(e) => onChange('right', 'align')}
                                    disabled={disabled}
                                >
                                    <IconAlignRight
                                        color={obj.align == 'right' ? "green" : "#000"}
                                        size={"1rem"}
                                    />
                                </Button>
                            </Tooltip>
                            <Tooltip label="italic" withArrow>
                                <Button
                                    variant="default"
                                    size={'xs'}
                                    px={5}
                                    onClick={() => onChange(obj.fontStyle == 'normal' ? 'italic' : 'normal', 'fontStyle')}
                                    disabled={disabled}
                                >
                                    <IconItalic
                                        color={obj.fontStyle == 'italic' ? "green" : "#000"}
                                        size="1rem"
                                    />
                                </Button>
                            </Tooltip>
                            <Tooltip label="underline" withArrow>
                                <Button
                                    variant="default"
                                    size={'xs'}
                                    px={5}
                                    onClick={() => onChange(obj.textDecoration == 'underline' ? 'none' : 'underline', 'textDecoration')}
                                    disabled={disabled}
                                >
                                    <IconUnderline
                                        color={obj.textDecoration == 'underline' ? "green" : "#000"}
                                        size="1rem"
                                    />
                                </Button>
                            </Tooltip>
                            <Tooltip label="line through" withArrow>
                                <Button
                                    variant="default"
                                    size={'xs'}
                                    px={5}
                                    onClick={() => onChange(obj.textDecoration == 'line-through' ? 'none' : 'line-through', 'textDecoration')}
                                    disabled={disabled}
                                >
                                    <IconStrikethrough
                                        color={obj.textDecoration == 'line-through' ? "green" : "#000"}
                                        size="1rem"
                                    />
                                </Button>
                            </Tooltip>
                        </Button.Group>
                        <TextInput
                            ml={mt}
                            type={'number'}
                            placeholder="Spacing"
                            size={'xs'}
                            value={obj.letterSpacing.toString()}
                            rightSection={
                                <Tooltip label="letter spacing" position="top-end" withArrow>
                                    <div>
                                        <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                    </div>
                                </Tooltip>
                            }
                            onChange={(e) => onChange(Number(e.target.value), 'letterSpacing')}
                            disabled={disabled}
                        />
                    </Flex>
                    <Flex direction={'row'} my={mt}>
                        <ColorInput
                            placeholder="Color"
                            w={'100%'}
                            size='xs'
                            value={obj.color}
                            onChange={(e) => onChange(e, 'color')}
                            disabled={disabled}
                        />
                    </Flex>
                    {obj.icon.isShow && <IconStyle
                        obj={obj.icon}
                        update={onChange}
                        uploadFunc={uploadFile}
                        disabled={disabled}
                    />}

                </Flex>
            </Paper>
        </>}

        {!withStyle && <>
            {content && <Flex direction={'column'}>
                <TextInput
                    placeholder="label"
                    size={'xs'}
                    value={obj.content ? obj.content.toString() : ''}
                    rightSection={
                        <Tooltip label="label content" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    onChange={(e) => onChange(e.target.value, 'content')}
                    disabled={disabled}
                />
                <Flex justify={'end'} my={10}>
                    <Switch
                        onLabel="Icon"
                        offLabel="No Icon"
                        size={'lg'}
                        checked={obj.icon.isShow ? true : false}
                        onChange={(e) => onChange(e.target.checked, 'icon', 'isShow')}
                        disabled={disabled}
                    />
                </Flex>
                {obj.icon.isShow && <IconStyle
                    obj={obj.icon}
                    update={onChange}
                    uploadFunc={uploadFile}
                    disabled={disabled}
                />}
            </Flex>}
        </>}
    </>
}

export default TextWithStyle;