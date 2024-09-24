import { UnstyledButton, Group, Avatar, Text, rem, Box, Menu, Flex, Stack, Divider, Modal, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './UserProfilePopup.module.css';
import { IconUser, IconLogout } from '@tabler/icons-react';
import { router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react';
import { useDisclosure } from '@mantine/hooks';

export function UserProfilePopup({ user, iconOnly = false }: { user?: any, iconOnly?: boolean }) {

    const { auth }: any = usePage().props;
    const [opened, { open, close }] = useDisclosure(false);

    user = user ? user : auth.user;

    const logout = async(e:any) => {
        e.preventDefault();
        router.get('/admin/logout')
    }

    const currentPath = window.location.pathname.split("/").pop();

    const width = 250;

    return  <>   
        <Menu transitionProps={{ transition: 'pop-top-right' }} position="top-end" width={width} withArrow>
            <Menu.Target>
                <Box>
                    {!iconOnly && <UnstyledButton className={classes.user} >
                        <Group>
                            <Avatar size={45} radius="xl" color='gray.9' variant="filled">
                                {user ? user.email[0].toUpperCase() : ''}
                            </Avatar>

                        <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                    {user ? user.email : ''}
                                </Text>

                            <Text size="xs">
                                    {user ? user.email : ''}
                                </Text>
                            </div>
                            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </Group>
                        </UnstyledButton>
                    }
                    {!!iconOnly && <UnstyledButton>
                        <Group gap={5}>
                            <Avatar size={35} radius="xl" color='gray.9' variant="filled">
                                {user ? user.email[0].toUpperCase() : ''}
                            </Avatar>
                            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </Group>
                    </UnstyledButton>
                    }
                </Box>
            </Menu.Target>
            <Menu.Dropdown>
                <Box p={'xs'} w={width}>
                    <Text ta={'center'} fz={15} fw={600} lh={1}>{user.name}</Text>
                    <Text ta={'center'} fz={13}>{user.role_action?.name ? user.role_action.name : '-'}</Text>
                </Box>
                <Divider mx={'xs'} />
                <Menu.Item onClick={() => router.get('/profile')} mt={'xs'} disabled={currentPath == 'profile'}>
                    <Flex align={'center'}>
                        <IconUser size="1.2rem" stroke={2} style={{marginRight: 10, marginLeft: 5, marginBlock: 5}} />
                        <Text fz={14}>Profile</Text>
                    </Flex>
                </Menu.Item>
                <Menu.Item onClick={open} mb={'xs'}  color="red">
                    <Flex align={'center'}>
                        <IconLogout size="1.2rem" stroke={2} style={{marginRight: 10, marginLeft: 5, marginBlock: 5}} />
                        <Text fz={14}>Logout</Text>
                    </Flex>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>

        <Modal opened={opened} onClose={close} title={'Logout'} centered>
            <form onSubmit={logout} >
                <Text mb={'md'}>Are you sure you want to log out?</Text>
                <Group gap={'xs'} justify='flex-end'>
                    <Button variant="default" onClick={close}>Cancel</Button>
                    <Button color={'red'} type="submit">Logout</Button>
                </Group>
            </form>
        </Modal>

        
    </>
}