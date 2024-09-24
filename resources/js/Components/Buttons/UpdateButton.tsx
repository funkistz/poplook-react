import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { IconEdit, IconPencil } from '@tabler/icons-react';

export default function UpdateButton({ link, onClick, label, iconOnly }: { link?: any, onClick?: any, label?: String, iconOnly?: boolean }) {
    const { auth } = usePage<any>().props;
    const role_action = auth.user.role_action.action;

    function buttonAdd(clicked?: any) {
        if (iconOnly) {
            return <Tooltip label="Update">
                <ActionIcon variant="filled" color='blue' mx={2} onClick={clicked ? clicked : null}>
                    <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5}></IconPencil>
                </ActionIcon>
            </Tooltip>;
        }
        return <>
            <Button size='xs' leftSection={<IconEdit size={14} />} color='blue' onClick={clicked ? clicked : null}>{label ? label : 'Edit'}</Button>
        </>
    }

    if (role_action == 1) {
        if (link) {
            return (
                <Link href={link}>
                    {buttonAdd()}
                </Link>
            )
        } else {
            return (
                buttonAdd(onClick)
            )
        }
    }
}
