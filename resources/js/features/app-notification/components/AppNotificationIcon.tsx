import { router } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Group, Avatar, Text, Menu, Badge } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

export default function AppNotificationIcon() {

    const { shop } = usePage<any>().props;

    const setCookie = async (shop: any) => { 
        try {
            router.post('admin/cookie', {shop : shop})
        } catch (error) {
            console.log('error', error)
        } finally {
            // console.log(data)
        }
    }

    const avatar = () => {
        if(shop == 1) {
            return <Avatar color="blue" radius="xl" style={{cursor: 'pointer'}}>
                <Text fz={14} fw={700}>MY</Text>
            </Avatar>
        } else if(shop == 2) {
            return  <Avatar color="yellow" radius="xl" style={{cursor: 'pointer'}}>
                <Text fz={14} fw={700}>SG</Text>
            </Avatar>
        } else if(shop == 3) {
            return  <Avatar color="green" radius="xl" style={{cursor: 'pointer'}}>
                <Text fz={14} fw={700}>INT</Text>
            </Avatar>
        }

        return  <Avatar color="gray" radius="xl" style={{cursor: 'pointer'}}>
            <Text fz={14} fw={700}>All</Text>
        </Avatar>
    }
    return (
        <Group gap={'xs'}>
            <ThemeIcon radius="xl" size={35} color='gray.9' variant="light">
                <IconBell stroke={1.5} size={20} />
            </ThemeIcon>
            <Menu transitionProps={{ transition: 'pop-top-right' }} position="top-end"width={220} withArrow>
                <Menu.Target>
                    {avatar()}
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<Badge color="gray" size='xs'>&nbsp;</Badge>} onClick={() => setCookie(0)} disabled={shop == 0}>
                       <Text fz={13} c={'dark'}> All Shops</Text>
                    </Menu.Item>
                    <Menu.Item leftSection={<Badge color="blue" size='xs'>&nbsp;</Badge>} onClick={() => setCookie(1)} disabled={shop == 1}>
                        <Text fz={13} c={'dark'}>Malaysia</Text>
                    </Menu.Item>
                    <Menu.Item leftSection={<Badge color="yellow" size='xs'>&nbsp;</Badge>} onClick={() => setCookie(2)} disabled={shop == 2}>
                        <Text fz={13} c={'dark'}>Singapore</Text>
                        </Menu.Item>
                    <Menu.Item leftSection={<Badge color="green" size='xs'>&nbsp;</Badge>}onClick={() => setCookie(3)} disabled={shop == 3}>
                        <Text fz={13} c={'dark'}>International</Text>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    )
}