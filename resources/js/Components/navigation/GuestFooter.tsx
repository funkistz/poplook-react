import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './GuestFooter.module.css';
import AppLogo from '../AppLogo';

const data = [
    {
        title: 'About',
        links: [
            { label: 'Features', link: '#' },
            { label: 'Pricing', link: '#' },
            { label: 'Support', link: '#' },
            { label: 'Forums', link: '#' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'Contribute', link: '#' },
            { label: 'Media assets', link: '#' },
            { label: 'Changelog', link: '#' },
            { label: 'Releases', link: '#' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Join Discord', link: '#' },
            { label: 'Follow on Twitter', link: '#' },
            { label: 'Email newsletter', link: '#' },
            { label: 'GitHub discussions', link: '#' },
        ],
    },
];

export function GuestFooter() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner} size={'xl'}>
                <div className={classes.logo}>
                    <AppLogo />
                    <Text size="xs" c="dimmed" className={classes.description}>
                        "The Place of Your Dream Cars"
                        ⭐Selling imported recond car⭐
                        💯 BUMIPUTERA MUSLIM
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter} size={'xl'}>
                <Text c="dimmed" size="sm">
                    © 2023 sinarauto.com. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="xl" color="gray" variant="subtle">
                        <IconBrandTwitter style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="xl" color="gray" variant="subtle">
                        <IconBrandYoutube style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="xl" color="gray" variant="subtle">
                        <IconBrandInstagram style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}