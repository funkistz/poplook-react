import { AddButton, AppCard } from "@/Components";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Modal, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect } from "react";
import { FormCreate } from "./Index";


function EmployeeFormBtn({ user }: any) {
    const { employee } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);
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
            await post(route('employee.update_pass'));
        } catch (error) {
            console.log('error', error)
        } finally {
            reset()
        }
    }

    return <>
        <FormCreate opened={opened} open={open} close={close} />
        <AddButton
            // color="green"
            // leftSection={<IconPlus />} size={'xs'}
            label={'Add New'}
            onClick={open}
        >
        </AddButton>
    </>;
}

export default EmployeeFormBtn;
