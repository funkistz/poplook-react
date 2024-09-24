import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function AddButton({ label = 'Add New', link, onClick }: { label?: string, link?: any, onClick?: any }) {
    const { auth } = usePage<any>().props;
    const role_action = auth.user.role_action.action;
    function buttonAdd(clicked?: any) {
        return <>
            <Button size='xs' leftSection={<IconPlus size={14} />} color='green' onClick={clicked ? clicked : null}>{label}</Button>
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
