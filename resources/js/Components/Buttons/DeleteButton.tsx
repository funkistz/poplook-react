import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Button, Modal, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function DeleteButton(options: any) {
    const { auth } = usePage<any>().props;
    const role_action = auth.user.role_action.action;

    const [opened, setOpened] = useState(false)

    function ButtonType(param: any) {
        if (param.type) {
            return <Tooltip label="Delete">
                <ActionIcon variant='filled' color='red' onClick={() => setOpened(true)}><IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} ></IconTrash></ActionIcon>
            </Tooltip>;
        } else {
            return <Button size='xs' leftSection={<IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />} color='red' onClick={() => setOpened(true)}  {...options}>{options.label ? options.label : 'Delete'}</Button>;
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Are sure want to delete?" centered>
                <Group justify='flex-end'>
                    <Button variant="default" onClick={() => setOpened(false)}>Cancel</Button>
                    <Button color="red" onClick={() => { options.onDelete(); setOpened(false); }} >Delete</Button>
                </Group>
            </Modal>
            {role_action == 1 &&
                <ButtonType type={options.iconOnly} />
            }
            {/* <Button size='xs' leftSection={<IconTrash size={14} />} color='red' onClick={() => setOpened(true)}  {...options}>{options.label ? options.label : 'Delete'}</Button> */}
            {/* <Button size='xs' leftSection={<IconTrash size={14} />} color='red' onClick={() => setOpened(true)} disabled={options.disabled} {...options}>{options.label ? options.label : 'Delete'}</Button> */}
        </>
    )
}
