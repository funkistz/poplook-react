import { Stack, Image, Text, Table, Anchor, Flex, ActionIcon, Tooltip, Button } from "@mantine/core";
import moment from "moment";
import NoImageUpload from "../../Logo/Components/NoImage";
import { DeleteButton } from "@/Components";
import { useClipboard } from '@mantine/hooks';
import { IconChecks, IconCopy } from "@tabler/icons-react";
import { usePage } from "@inertiajs/react";

function ImgDetails({ details, setMedia }: any) {

    const { domain } = usePage<any>().props;
    console.log('domain:', domain + details.url)
    const clipboard = useClipboard({ timeout: 500 });

    const DeleteAction = () => {
        setMedia(null)
    }

    return <>
        {details ?
            <>
                <Stack>
                    {details.type == 'image' && <Image
                        src={details.url}
                        w={'100%'}
                        style={{ borderRadius: 5 }}
                    />}

                    {details.type == 'video' && <video
                        src={details.url}
                        style={{ borderRadius: 5, width: '100%' }}
                    ></video>}
                    <Stack gap={0}>
                        <Flex align={'center'}>
                            <Anchor fz={14} fw={500}  c={'dark'} style={{ lineHeight: 0 }} href={details.url} target="_blank">{details.name}</Anchor>
                            <Tooltip label="Copy Url">
                                <ActionIcon variant="subtle" color="gray" ml={'xs'} size={'md'} onClick={() => {clipboard.copy(domain + details.url)}}>
                                    {clipboard.copied ?  
                                        <IconChecks style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        : <IconCopy style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                                </ActionIcon>
                            </Tooltip>
                            
                        </Flex>
                        <Text fz={13} c={'dimmed'} style={{ lineHeight: 0.5 }}>{details.size}</Text>
                    </Stack>
                    

                    <Text fz={14} fw={500} >Information</Text>
                    <Table>
                        <Table.Tbody>
                            <Table.Tr >
                                <Table.Td><Text fz={14} c={'dimmed'}>Uploaded By</Text></Table.Td>
                                <Table.Td><Text fz={13} fw={500} ta={'end'}>-</Text></Table.Td>
                            </Table.Tr>
                            <Table.Tr >
                                <Table.Td><Text fz={14} c={'dimmed'}>Uploaded At</Text></Table.Td>
                                <Table.Td><Text fz={13} fw={500} ta={'end'}>{moment(details.updated_at).format('DD MMM YYYY HH:MM A')}</Text></Table.Td>
                            </Table.Tr>
                            <Table.Tr >
                                <Table.Td><Text fz={14} c={'dimmed'}>Type</Text></Table.Td>
                                <Table.Td><Text fz={13} fw={500} ta={'end'} >{details.type.toUpperCase()}</Text></Table.Td>
                            </Table.Tr>
                            <Table.Tr >
                                <Table.Td><Text fz={14} c={'dimmed'}>ID</Text></Table.Td>
                                <Table.Td><Text fz={13} fw={500} ta={'end'}>{details.id}</Text></Table.Td>
                            </Table.Tr>
                            <Table.Tr >
                                <Table.Td><Text fz={14} c={'dimmed'}>Thumb generated</Text></Table.Td>
                                <Table.Td><Text fz={13} fw={500} ta={'end'}>{details.thumbnail_url.length == 0 ? 'No' : 'Yes'}</Text></Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <DeleteButton onDelete={DeleteAction} />
                </Stack >
            </>
            :
            <>
                <Text fz={14}>Select Image</Text>
                <Text fz={13} c={'dimmed'} mb={'lg'}>Select a file to view its information</Text>
                <NoImageUpload desc={'No Image Selected'} />
            </>}

    </>
}

export default ImgDetails;