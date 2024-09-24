import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react';

export default function PayInStorePayment({ opened, close, id }: any) {
    const { payment_method } = usePage<any>().props;
    const { data, post, setData, reset, errors, setError, clearErrors } = useForm({
        id_order: id,
        payment_method: null,
        approval_code: ''
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);

    // const list = [
    //     { label: 'Cash', value: '1' },
    //     { label: 'Credit/Debit', value: '2' },
    //     { label: 'Alipay', value: '3' },
    //     { label: 'MBB QR Pay', value: '4' },
    //     { label: 'Atome', value: '5' },
    //     { label: 'E-wallet Terminal', value: '6' },
    // ];

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)

            await post(route('pay_in_store.updateorderpayment'));

        } catch (error) {
            console.log('error', error)
        } finally {
            // setTimeout(() => {
            //     setLoading(false);
            //     close(false);
            //     reset()
            // }, 500); // 1000 milliseconds = 1 seconds
            setLoading(false);
            close(false);
            reset()

        }
    };

    const handleReset = () => {
        reset();
        clearErrors()
    };

    useEffect(() => {
        if (data.payment_method != null && data.approval_code.length != 0) {
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    },[data.payment_method, data.approval_code.length])

    return (
        <Modal opened={opened} onClose={() => close(false)} title={'Payment Details'} size={'md'} closeOnClickOutside={false} centered>
            <form onSubmit={onSubmit}>
                <Stack gap={'xs'}>
                    <Select
                        label={'Payment Method'}
                        data={payment_method}
                        value={data.payment_method}
                        onChange={(e: any) => { setData('payment_method', e), clearErrors('payment_method') }}
                        error={errors.payment_method}
                    />
                    <TextInput
                        label={'Approval Code'}
                        value={data.approval_code}
                        onChange={(e) => { setData('approval_code', e.target.value); clearErrors('approval_code') }}
                        error={errors.approval_code}
                    />
                    <Group gap={'xs'} justify={'end'}>
                        <Button onClick={handleReset} variant="subtle" color="gray">Reset</Button>
                        <Button loading={loading} disabled={disabled} type='submit' color={'green'}>Submit</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
