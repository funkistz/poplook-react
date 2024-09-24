import { AppCard } from "@/Components";
import { useForm, usePage } from "@inertiajs/react";
import { Button, PasswordInput } from "@mantine/core";
import { useEffect } from "react";


function EmployeeFormPassword({ user }: any) {
    const { employee } = usePage<any>().props;
    const { data, setData, post, put, reset, errors, setError } = useForm({
        id_employee: user?.id_employee,
        password: '',
        confirmpass: '',
    });

    useEffect(() => {
        if (data.password != data.confirmpass) {
            setError('confirmpass', 'Password not matched!');
        } else {
            setError('confirmpass', '');
        }

    }, [data.password, data.confirmpass])

    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await post(route('profile.update_pass'));
        } catch (error) {
            console.log('error', error)
        } finally {
            reset()
        }
    }

    return <>
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
            <AppCard
                title='Change Password'
                options={{ h: '100%' }}
                rightComponent={<Button
                    size={'xs'}
                    type="submit"
                    disabled={((data.password == '' && data.confirmpass == '') || data.password != data.confirmpass)}
                >Submit</Button>}
            >
                <PasswordInput
                    placeholder="Password"
                    label="Password"
                    withAsterisk
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <PasswordInput
                    placeholder="Re-enter new password"
                    label="Re-enter new password"
                    withAsterisk
                    value={data.confirmpass}
                    onChange={(e) => setData('confirmpass', e.target.value)}
                    my={20}
                />
            </AppCard>
        </form>
    </>;
}

export default EmployeeFormPassword;
