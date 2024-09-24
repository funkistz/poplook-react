import AdminLayout from '@/Components/layout/AdminLayout';
import { Grid } from '@mantine/core';
import { FormPass, FormProfile, FormRole } from '../Employee/Components/Index';
import { usePage } from '@inertiajs/react';

export default function ProfilePage() {

    const { employee } = usePage<any>().props;
    
    return <>
        <Grid grow gutter="xs" >
            <Grid.Col span={8}>
                <FormProfile user={employee} profile={true} />
            </Grid.Col>
            <Grid.Col span={4}>
                <FormPass user={employee} />
            </Grid.Col>
        </Grid>
    </>
}

ProfilePage.layout = (page: any) => <AdminLayout children={page} title='My Profile' />;