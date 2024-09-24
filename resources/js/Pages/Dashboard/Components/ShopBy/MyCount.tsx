import { Text, Group, Paper, RingProgress, Center } from "@mantine/core";
import { useEffect, useState } from "react";
import MiniCard from "../TemplateMiniCard";
import axios from "axios";

function MYCount({ color, label }: any) {

    const [total, setTotal] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);

    const getAPI = async () => {
        const API_BASE_URL = '/api/customer_count';

        try {
            const response = await axios.get(API_BASE_URL);
            setTotal(response.data.myr)
            setPercentage(response.data.myr_percentage)
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

export default MYCount;
