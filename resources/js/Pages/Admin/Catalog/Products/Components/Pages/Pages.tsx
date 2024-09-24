import { Box, Group, Paper, Text, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import cx from 'clsx';
import { Price, Seo, Shipping } from '../Index';
import Information from './Information';

export default function Pages({ current }: any) {

    const displayPage = () => {
        if (current == '#info') {
            return <Information />
        } else if (current == '#price') {
            return <Price />
        } else if (current == '#seo') {
            return <Seo />
        } else if (current == '#shipping') {
            return <Shipping />
        }
    }

    return (
        displayPage()
    );
}
