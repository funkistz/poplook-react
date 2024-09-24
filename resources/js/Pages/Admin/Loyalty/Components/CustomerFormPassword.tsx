import AppDatatable from "@/Components/AppDatatable";
import { router } from "@inertiajs/react";
import { Table, ActionIcon, Text, Modal, Flex, Burger, Button, Highlight, Tooltip, NativeSelect, Input, Pagination, PasswordInput, TextInput } from "@mantine/core";
import { IconArrowsSort, IconKey, IconLock, IconLockOpen, IconPencil, IconSearch, IconSortAscending, IconSortDescending, IconUser, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";


function CustomerFormPassword({ pass, confPass, setPass, setConfPass }: any) {

    useEffect(() => {

    }, [])

    return <>
        <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            value={pass}
            onChange={(e) => setPass(e.target.value)}
        />

        <PasswordInput
            placeholder="Re-enter new password"
            label="Re-enter new password"
            withAsterisk
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            my={20}
        />

    </>;
}

export default CustomerFormPassword;
