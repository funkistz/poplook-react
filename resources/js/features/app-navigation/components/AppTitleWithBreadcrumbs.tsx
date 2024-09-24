import React from 'react'
import { AppShell, Burger, Divider, Group, Avatar, Title, Text, Box, Flex, Stack, ScrollArea, Anchor, Breadcrumbs, ActionIcon } from '@mantine/core';
import AppLogo from '@/Components/AppLogo';
import { LinksGroup } from './LinksGroup';
import { adminLinks } from '../values/AdminLinks';
import { usePage } from '@inertiajs/react';
import AppBreadcrumbs from './AppBreadcrumbs';
import { IconChevronLeft } from '@tabler/icons-react';

export default function AppTitleWithBreadcrumbs({ title, back }: any) {
    return (
        <>
            <Flex align={'center'}>
                {/* {(back) && <IconChevronLeft onClick={() => window.history.back()}></IconChevronLeft>} */}
                {back && <ActionIcon variant="transparent" color="gray" radius="xl" onClick={() => window.history.back()}>
                    <IconChevronLeft  />
                </ActionIcon>}
                <Title order={2} fw={'normal'}>{title}</Title>
            </Flex>
            <AppBreadcrumbs />
        </>
    )
}
