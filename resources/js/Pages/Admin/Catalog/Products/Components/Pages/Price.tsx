import { AppCard } from '@/Components';
import { ActionIcon, Alert, Box, Button, Flex, Group, Paper, Space, Stack, Text, TextInput, rem } from '@mantine/core';
import { IconInfoCircle, IconListSearch, IconPlus } from '@tabler/icons-react';
import cx from 'clsx';

export default function Price({ current, setCurrent }: any) {

    return <>
        <AppCard title='Product Price'>
            <Alert variant="light" color="blue" icon={<IconInfoCircle />}>
                You must enter either the pre-tax retail price, or the retail price with tax. The input field will be automatically calculated.
            </Alert>
            <Space h="xs" />
            <Stack mx={'xs'}>
                <TextInput
                    label={'Pre-tax wholesale price'}
                    leftSection={<Text fz={13}>RM</Text>}
                />
                <TextInput
                    label={'Pre-tax retail price'}
                    leftSection={<Text fz={13}>RM</Text>}
                />
                <TextInput
                    label={'Tax rule'}
                    placeholder='Rule 0.00%'
                    rightSection={<ActionIcon color={'green'} variant="filled" aria-label="Settings">
                        <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>}
                />
                <TextInput
                    label={'Retail price with tax'}
                    leftSection={<Text fz={13}>RM</Text>}
                />
                <Flex justify={'space-between'}>
                    <Text fz={16} fw={500}>Final retail price</Text>
                    <Text fz={16} fw={500}>RM 149.00</Text>
                </Flex>
            </Stack>
        </AppCard>
        <Space h="xs" />
        <AppCard title='Specific prices'>
            <Alert variant="light" color="blue" icon={<IconInfoCircle />}>
                You can set specific prices for clients belonging to different groups, different countries, etc...
            </Alert>
            <Space h="xs" />
        </AppCard>
        <Space h="xs" />
        <AppCard title='Priority management'>
            <Alert variant="light" color="blue" icon={<IconInfoCircle />}>
                Sometimes one customer can fit into multiple price rules. Priorities allow you to define which rule applies to the customer.
            </Alert>
        </AppCard>
    </>;
}
