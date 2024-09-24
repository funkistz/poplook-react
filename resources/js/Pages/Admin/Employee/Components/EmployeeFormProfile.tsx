import { AppCard } from "@/Components";
import { useForm, usePage } from "@inertiajs/react";
import { Badge, Button, Grid, Select, Text, TextInput } from "@mantine/core";
import { useEffect } from "react";


function EmployeeFormProfile({ user, profile = false }: any) {
    
    const { employee } = usePage<any>().props;
    const { data, setData, post, put, reset, errors, setError } = useForm({
        id_employee: user?.id_employee,
        password: '',
        confirmpass: '',
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        active: user?.active
    });

    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await put(route('profile.update', data.id_employee));
        } catch (error) {
            console.log('error', error)
        } finally {

        }
    }

    return <>
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
            <AppCard
                title={'Update Profile'}
                options={{ h: '100%' }}
                rightComponent={<Button
                    size={'xs'}
                    type="submit"
                    disabled={data.firstname == '' || data.lastname == ''}
                >Submit</Button>}
            >
                <Grid grow gutter="xs">
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Enter Firstname"
                            label="Firstname"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Enter Lastname"
                            label="Lastname"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            readOnly
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        {profile ? 
                            <TextInput
                                label="Role"
                                placeholder="Choose Role"
                                defaultValue={(employee.id_role) ? employee.role.name : '-'}
                                onChange={(e) => console.log((employee.id_role) ? employee.role.name : '-')}
                                readOnly
                            />
                            : 
                            <Select
                                label="Status"
                                data={[
                                    { value: '1', label: 'Active' },
                                    { value: '0', label: 'Inactive' },
                                ]}
                                value={data.active?.toString()}
                                onChange={(e) => setData('active', e)}
                                allowDeselect={false}
                            />}
                       
                    </Grid.Col>
                </Grid>
            </AppCard>
        </form>
    </>;
}

export default EmployeeFormProfile;
