import { Flex, Select, TextInput, Tooltip } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { UploadFileButton } from "@/features/custom_upload_file/Index";

function IconStyle({ obj, update,disabled = false, uploadFunc }: any) {
    
    const mt = 10;

    return <>
        <Flex direction={'column'}>
            <Flex direction={'row'}>
                <TextInput
                    type={'number'}
                    w={'50%'}
                    min={0}
                    placeholder="Size"
                    size={'xs'}
                    value={obj.size.toString()}
                    onChange={(e) => update(Number(e.target.value), 'icon', 'size')}
                    rightSection={
                        <Tooltip label="Size" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    disabled={disabled}
                />
                <TextInput
                    type={'number'}
                    w={'50%'}
                    min={0}
                    placeholder="Gap"
                    size={'xs'}
                    ml={5}
                    value={obj.gap.toString()}
                    onChange={(e) => update(Number(e.target.value), 'icon', 'gap')}
                    rightSection={
                        <Tooltip label="Gap" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    disabled={disabled}
                />
                <Select
                    placeholder="Position"
                    data={[
                        { value: 'left', label: 'Left' },
                        { value: 'right', label: 'Right' },
                    ]}
                    size={'xs'}
                    ml={5}
                    onChange={(e) => update(e, 'icon', 'position')}
                    value={obj.position}
                    rightSection={
                        <Tooltip label="Position icon" position="top-end" withArrow>
                            <div>
                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                            </div>
                        </Tooltip>
                    }
                    disabled={disabled}
                />
            </Flex>
            <TextInput
                placeholder="Url"
                mt={mt}
                size='xs'
                value={obj.href}
                onChange={
                    (e) => update(e.target.value, 'icon', 'href')
                }
                disabled={disabled}
            />
            <Flex justify={'end'} mt={mt}>
                <UploadFileButton setImageSelected={uploadFunc} />
            </Flex>
        </Flex>
    </>
}

export default IconStyle;