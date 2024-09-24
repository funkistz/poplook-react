import AppDatatable from "@/Components/AppDatatable";
import { router } from "@inertiajs/react";
import { Table, ActionIcon, Text, Modal, Flex, Burger, Button, Highlight, Tooltip, NativeSelect, Input, Pagination, PasswordInput, TextInput, Radio, Group, Select, Paper, RingProgress, Center, SimpleGrid, createStyles } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight, IconArrowsSort, IconKey, IconLock, IconLockOpen, IconPencil, IconSearch, IconSortAscending, IconSortDescending, IconUser, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import MiniCard from "../TemplateMiniCard";
import axios from "axios";

function SGDCount({ color, label }: any) {

    const [total, setTotal] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);

    const getAPI = async () => {
        const API_BASE_URL = '/api/customer_count';

        try {
            const response = await axios.get(API_BASE_URL);
            setTotal(response.data.sgd)
            setPercentage(response.data.sgd_percentage)
            return response.data;
        } catch (error) {
            console.error('Error fetching customer counts:', error);
            return {};
        }
    }


    useEffect(() => {
        getAPI();
    }, [])

    return <>
        <MiniCard color={color} label={label} progress={percentage} total={total} />
    </>
}


export default SGDCount;
