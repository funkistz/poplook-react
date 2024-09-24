import { Group, Button, Modal, Grid, Text } from '@mantine/core';
import { useState } from 'react';

function DeleteDialog({ opened, setModal, onConfirm, data }: any) {

    const submit = () => {
        onConfirm(data);
    }

    return (<>
        <Modal opened={opened} onClose={() => setModal(false)} title="Are sure want to delete?" centered>
            <Group justify='flex-end'>
                <Button variant="default" onClick={() => setModal(false)}>Cancel</Button>
                <Button color="red" onClick={submit}>Delete</Button>
            </Group>
        </Modal>
    </>);
}

export default DeleteDialog;