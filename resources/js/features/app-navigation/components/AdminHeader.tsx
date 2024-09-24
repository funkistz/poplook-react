import { Group, Burger, rem, Text, Title, Stack, Box, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDashboard, IconFileText, IconHome, IconSearch } from '@tabler/icons-react';
import classes from './AdminHeader.module.css';
import AppBreadCrumb from '@/Components/navigation/AppBreadCrumb';
import AppLogo from '@/Components/AppLogo';
import { UserProfilePopup } from './UserProfilePopup';
import { AppNotificationIcon } from '@/features/app-notification';
import AppSearch from './AppSearch';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
];

export default function AdminHeader({ toggleMobile, toggleDesktop, mobileOpened, desktopOpened, title, breadcrumbs }: any) {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                {/* {(!mobileOpened) && <Box hiddenFrom="sm" bg={'primary.6'} p={'7px 10px 8px 5px'} style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }} mt={-10}>
                    <Burger onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                </Box>}
                {(!desktopOpened) && <Box visibleFrom="sm" bg={'primary.6'} p={'7px 10px 8px 5px'} style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }} mt={-10}>
                    <Burger onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                </Box>} */}
                <Stack gap={0}>
                    <Group h="100%" p={'md'} pb={'xs'}>
                        <Burger onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger onClick={toggleDesktop} visibleFrom="sm" size="sm" />

                        <AppLogo />
                    </Group>
                    <Box ml={17}>
                        <AppBreadCrumb items={breadcrumbs} />
                    </Box>
                </Stack>

                <Group style={{ flexGrow: 1 }} p={'md'}>

                </Group>

                <Group gap={'xs'}>
                    <AppSearch />

                    <Group mt={10} ml={10} visibleFrom="sm">
                        <AppNotificationIcon />
                        <UserProfilePopup iconOnly />
                    </Group>
                </Group>
            </div>
        </header>
    );
}