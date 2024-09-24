import { Menu, Group, Center, Burger, Container, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './GuestNavbar.module.css';
import AppLogo from '../AppLogo';
import { IconPhone, IconBrandWhatsapp } from '@tabler/icons-react';
import { router } from '@inertiajs/react';

const links: any = [
    { link: '/about-us', label: 'About Us' },
    { link: '/our-products', label: 'Our Products' },
    { link: '/care-and-access', label: 'Care & Access' },
    { link: '/ecw', label: 'ECW Mobile Service' },
];

const goToPage = (route: any) => {
    console.log('goToPage');
    router.get(route);
}

export function GuestNavbar() {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link: any) => {
        const menuItems = link.links?.map((item: any) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <a
                            // href={link.link}
                            className={classes.link}
                            onClick={(event) => { goToPage('link.link') }}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size="0.9rem" stroke={1.5} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
                onClick={(event) => { event.preventDefault(); goToPage(link.link) }}
            >
                {link.label}
            </a>
        );
    });

    return (
        <header className={classes.header} style={{ borderBottom: 0 }}>
            <Container size="xl">
                <div className={classes.inner}>
                    <AppLogo />
                    <Group gap={5} visibleFrom="sm">
                        {items}
                        <Button leftSection={<IconPhone size={18} />} radius={'xl'} color='primary.9' mr={10} onClick={() => goToPage(route('contact-us'))}>Contact Us</Button>
                        <Button leftSection={<IconBrandWhatsapp size={18} />} radius={'md'} color='green'>WhatsApp</Button>
                    </Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}