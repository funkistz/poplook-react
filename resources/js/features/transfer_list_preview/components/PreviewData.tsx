import {
    Button, Flex, Text, Group, Card, Indicator, Tooltip, Badge, HoverCard
} from '@mantine/core';
import { IconClipboard, IconPencil, IconBell, IconBellOff } from '@tabler/icons-react';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import moment from 'moment';
import classes from '../css/PreviewData.module.css';

function PreviewData({ data, index, type, onChangePreview, onActivate, onDeactivate, onDelete, onDuplicate, activeId, getAPI }: any) {

    // Function
    const autoUpdate = () => {
        if (index == 1) {
            const intervalId = setInterval(() => {
                const currentTime = new Date();
                const targetTime = new Date(data.start_at);

                if (currentTime >= targetTime) {
                    router.get(getAPI);
                    clearInterval(intervalId);
                }
            }, 1000); // Check every 1 second

            return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }
    }

    // useEffect
    useEffect(() => {
        autoUpdate();
    }, [data])

    return (<>
        <Indicator mt={10} processing size={15} offset={5} color={Number(index) == 0 ? 'red' : 'yellow'} disabled={type == 'active' ? false : true}>
            <Card padding="lg" radius="sm" className={classes.box} style={{ border: activeId == data.id ? '1px solid #199d42' : '1px solid #e9ecef' }}>
                <Flex justify={'space-between'}>
                    <Flex direction={'column'}>
                        {
                            type == 'active' && <>
                                {
                                    index == 0 ?
                                        <Badge mr={10} mb={5} color='red' variant="dot" size='lg'>Live: {moment(data.start_at).format('D MMM YYYY, h:mmA')}</Badge>
                                        :
                                        <Tooltip label={"Live at " + moment(data.start_at).format('DD MMM YYYY hh:mm A')}>
                                            <Badge mr={10} mb={5} color='yellow' variant="dot" size='lg'>Upcoming: {moment(data.start_at).format('D MMM YYYY, h:mmA')}</Badge>
                                        </Tooltip>
                                }
                            </>
                        }
                        <Text fw={500} fz={14} ta='left' truncate>{data.name}</Text>
                    </Flex>
                    <Flex direction={'column'}>
                        <Flex direction={'row'}>
                            <Text fz={12} fw={500} pr={5}>update at:</Text>
                            <Text fz={12} c='dimmed'>{moment(data.updated_at).format('D/MM/YYYY')}</Text>
                        </Flex>

                    </Flex>
                </Flex>
                <Text fz={12} c="dimmed" mt={10} mb={10} ta='left' lineClamp={1}>{data.description}</Text>

                <Group justify="flex-right" gap="xs" mt={10}>
                    <Tooltip label="Edit & Preview">
                        <Button size='xs' leftSection={<IconBell size="1.125rem" />} color="blue" onClick={() => onChangePreview(data, index)} disabled={data['id'] == activeId}>
                            Edit
                        </Button>
                    </Tooltip>
                    {type == 'active' && <Tooltip label="Inactive">
                        <Button size='xs' leftSection={<IconBellOff size="1.125rem" />} color="green" onClick={() => onDeactivate(data)} disabled={(index == 0 && type == 'active') ? true : false}>
                            Inactive
                        </Button>
                    </Tooltip>}

                    {type == 'draft' && <Tooltip label="Activate">
                        <Button size='xs' leftSection={<IconBell size="1.125rem" />} color="green" onClick={() => onActivate(data)}>
                            Activate
                        </Button>
                    </Tooltip>}
                    <Tooltip label="Duplicate">
                        <Button size='xs' leftSection={<IconClipboard size="1.125rem" />} color="orange" onClick={() => onDuplicate(data)}>
                            Copy
                        </Button>
                    </Tooltip>
                    <Tooltip label="Delete">
                        <Button size='xs' leftSection={<IconPencil size="1.125rem" />} color="red" onClick={() => onDelete(data)} disabled={(index == 0 && type == 'active') ? true : false}>
                            Delete
                        </Button>
                    </Tooltip>
                </Group>
            </Card>
        </Indicator>

    </>);
}

export default PreviewData;