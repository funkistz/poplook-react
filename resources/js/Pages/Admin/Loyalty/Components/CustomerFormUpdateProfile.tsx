import AppDatatable from "@/Components/AppDatatable";
import { router } from "@inertiajs/react";
import { Table, ActionIcon, Text, Modal, Flex, Burger, Button, Highlight, Tooltip, NativeSelect, Input, Pagination, PasswordInput, TextInput, Radio, Group, Select } from "@mantine/core";
import { IconArrowsSort, IconKey, IconLock, IconLockOpen, IconPencil, IconSearch, IconSortAscending, IconSortDescending, IconUser, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";


function CustomerFormUpdateProfile({ firstname, lastname, storeCustomer, setFirstname, setLastname, setStoreCustomer }: any) {

    useEffect(() => {

    }, [])

    const data = [
        { value: '0', label: 'Normal Customer' },
        { value: '1', label: 'KIV Install Purchase' },
        { value: '2', label: 'Staff Purchase' },
    ]

    return <>
        <Flex justify={'space-between'} mb={10}>
            <TextInput
                placeholder="Firstname"
                label="Firstname"
                withAsterisk
                value={firstname}
                w={'50%'}
                mr={5}
                onChange={(e) => setFirstname(e.target.value)}
            />
            <TextInput
                placeholder="Lastname"
                label="Lastname"
                withAsterisk
                value={lastname}
                w={'50%'}
                ml={5}
                onChange={(e) => setLastname(e.target.value)}
            />
        </Flex>
        <Radio.Group
            name={"Store Customer"}
            label="Store Customer"
            value={storeCustomer}
            onChange={(e) => setStoreCustomer(Number(e))}
            withAsterisk
            mb={10}
        >
            <Group mb={10}>
                {data.map((res: any, i: any) => {
                    return <Radio key={i} value={Number(res.value)} label={res.label} />
                })}
            </Group>
        </Radio.Group>
    </>;
}

export default CustomerFormUpdateProfile;
