import { AppCard } from "@/Components";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Grid, MultiSelect, PasswordInput, Select } from "@mantine/core";
import { useEffect } from "react";


function EmployeFormRole({ user }: any) {
    const { employee,role } = usePage<any>().props;
    const { data, setData, post, put, reset, errors, setError } = useForm({
        id_employee: user?.id_employee,
        id_role: (employee.id_role) ? employee.id_role.toString() : '0',
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await post(route('employee.update_role'));
        } catch (error) {
            console.log('error', error)
        } finally {
            reset()
        }
    }
    
    const roleData = role.map((elem: any, index: any) => {
        return { value: "" + elem.value + "", label: elem.label }
    });

    return <>
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
            <AppCard
                title='Set Role'
                options={{ h: '100%' }}
                rightComponent={<Button
                    size={'xs'}
                    type="submit"
                >Submit</Button>}
            >

                <Grid.Col span={12}>
                    <Select
                        label="Role"
                        placeholder="Choose Role"
                        data={roleData}
                        defaultValue={data.id_role}
                        onChange={(e) => setData('id_role', e)}
                    />
                </Grid.Col>
            </AppCard>
        </form>
    </>;
}

export default EmployeFormRole;
