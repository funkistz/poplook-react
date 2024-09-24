import React from 'react';
import { Paper, Group, Text, Divider } from '@mantine/core';


export default function AppCard({ title, leftComponent, rightComponent, children, maw = 800, withoutHeader = false, options }: { title?: any, leftComponent?: any, rightComponent?: any, children: any, maw?: any, withoutHeader?:any, options?: any }) {
    return (
        <Paper radius={'lg'} p={'lg'} withBorder  {...options} >
            {!withoutHeader && <>
                <Group pb={'md'} pt={6} px={'sm'} justify="space-between">
                    {title && <Text fz={18} fw={'bolder'} tt={'capitalize'}>{title}</Text>}
                    {!title && leftComponent}
                    {rightComponent}
                </Group>
                <Divider color='gray.2' mb={0} pb={'md'} />
            </>}
            {children}
        </Paper>
    )
}
