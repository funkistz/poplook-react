import AdminLayout from '@/Components/layout/AdminLayout';
import React, { useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react';
import { Flex, Paper, SimpleGrid, Grid } from '@mantine/core';
import { FormPass, FormProfile, FormRole } from './Components/Index';

export default function CustomerViewPage() {

    const { employee } = usePage<any>().props;

    return (
        <>
            <Grid grow gutter="xs" >
                <Grid.Col span={8}>
                    <FormProfile user={employee} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <FormPass user={employee} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <FormRole user={employee} />
                </Grid.Col>
            </Grid>
        </>
    )
}

CustomerViewPage.layout = (page: any) => <AdminLayout children={page} title='Employee Detail' back={true} />;
