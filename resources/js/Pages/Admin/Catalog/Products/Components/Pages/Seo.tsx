import { AppCard } from '@/Components';
import { Alert, Box, Flex, Group, Paper, Space, Stack, Text, TextInput, rem } from '@mantine/core';
import { IconInfoCircle, IconListSearch } from '@tabler/icons-react';
import cx from 'clsx';

export default function Seo({ current, setCurrent }: any) {

    return <>
        <AppCard title='SEO'>
            <Stack mx={'xs'}>
                <TextInput
                    label={'Meta Title'}
                    description={'Product page title: Leave blank to use the product name'}
                />
                <TextInput
                    label={'Meta Description'}
                    description={'A single sentence for the HTML header is needed.'}
                />
                <TextInput
                    label={'Meta keywords:'}
                    description={'Keywords for HTML header, separated by commas'}
                />
                <TextInput
                    label={'Friendly UR'}
                    description={'Product page title: Leave blank to use the product name'}
                />
                <Text fz={10} c={'dimmed'}>The product link will look like this: http://poplook.com/lang/24659-sayang-blouse-skirt-pink-purple-flower.html</Text>
            </Stack>
        </AppCard>
    </>;
}
