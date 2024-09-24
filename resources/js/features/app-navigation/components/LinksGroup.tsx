import { useEffect, useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './LinksGroup.module.css';
import { usePage, Link, router } from '@inertiajs/react';
import * as Icons from '@tabler/icons-react';

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    link: string,
    links?: { label: string; link: string }[];
    active?: boolean;
    userPermission?: number;
    permission?: number;
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links, active, userPermission, permission }: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const currentPath = window.location.pathname.split("/").pop();
    const pathname = window.location.pathname.split("/")[1];

    const checkOpen = (links: any) => {
        let isOpen = false;
        links.map((link: any) => {
            // const active = link.link ? (currentPath == link.link.split("/").pop()) : false;
            const active = link.link ? (pathname == link.link.split("/").pop()) : false;
            if (active) {
                isOpen = true;
            }
        })
        return isOpen;
    }
    const isOpen = !hasLinks ? false : checkOpen(links);
    const [opened, setOpened] = useState(initiallyOpened || isOpen);

    useEffect(() => {
        setOpened(!hasLinks ? false : checkOpen(links))
    }, [pathname])

    const visit = (url: any, type: any = 'internal') => {
        if (url) {
            if (type == 'internal') {
                router.get(url)
            } else {
                window.open(url, type)
            }
        }
    }

    const items = (hasLinks ? links : []).map((link) => {
        // const active = link.link ? (currentPath == link.link.split("/").pop()) : false;
        const active = link.link ? (pathname == link.link.split("/").pop()) : false;

        return (
            <Group className={classes.linkWrapper} key={link.label}>
                <a
                    href={link.link}
                    className={`${classes.link} ${active ? classes.active : null}`}
                    onClick={(event) => visit(link.link)}
                >
                    {link.label}
                </a>
            </Group >
        )
    });

    /* Your icon name from database data can now be passed as prop */
    const DynamicIcon = ({ name }) => {
        // console.log(name);
        const IconComponent = Icons[name];

        if (!IconComponent) { // Return a default one
            return <></>;
        }

        return <IconComponent style={{ width: rem(20), height: rem(20), }} stroke={1.7} />;
    };

    function DisplayUrl(param: any) {
        // return param.role.map((role: any, elem: any) => {
        // if (role == param.userRole) {
        return <a href={hasLinks ? '#' : link} onClick={() => {
            if (hasLinks) {
                setOpened((o) => !o)
            } else {
                visit(link);
            }
        }} className={`${classes.control} ${active ? classes.active : null}`}>
            <Group justify="space-between" gap={0}>
                <Box style={{ display: 'flex', alignItems: 'center' }} ml={4}>
                    {/* <ThemeIcon variant="light" color='dark.6' radius="xl" size={30}> */}
                    {/* <Icon style={{ width: rem(20), height: rem(20), }} stroke={1.7} /> */}
                    <DynamicIcon name={Icon} />
                    {/* </ThemeIcon> */}
                    <Box ml={8}>{label}</Box>
                </Box>
                {hasLinks && (
                    <IconChevronRight
                        className={classes.chevron}
                        stroke={1.5}
                        style={{
                            width: rem(16),
                            height: rem(16),
                            transform: opened ? 'rotate(90deg)' : 'none',
                        }}
                    />
                )}
            </Group>
        </a>
        //     }
        // })
    }

    return (
        <>
            <DisplayUrl userRole={userPermission} role={permission} />
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}