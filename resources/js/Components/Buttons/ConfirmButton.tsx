import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button, Modal, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function ConfirmButton(options: any) {
    const [opened, setOpened] = useState(false);
    const { auth } = usePage<any>().props;
    const role_action = auth.user.role_action.action;

    if(role_action == 1){
        return (
            <>
                <Modal opened={opened} onClose={() => { setOpened(false) }} title={options.title ? options.title : "Confirm Proceed?"} centered>
                    <Group justify='flex-end'>
                        <Button variant="default" onClick={() => setOpened(false)}>Cancel</Button>
                        <Button color="green" onClick={() => { options.onConfirm(); setOpened(false); }} >Confirm</Button>
                    </Group>
                </Modal>
                <Button size='xs' color='green' onClick={() => { options.onOpen(); setOpened(true) }} disabled={options.disabled} {...options}>{options.label ? options.label : 'Confirm'}</Button>
            </>
        )
    }
}
