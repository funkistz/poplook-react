import { getLogo } from "@/Pages/Admin/Settings/Logo/Redux/logoSlice";
import { usePage } from "@inertiajs/react";
import { Anchor, Image, Skeleton } from "@mantine/core";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AppLogo({ width = 100 }: any) {
    const { settings }: any = usePage().props;
    const { logo } = useSelector((storeState: any) => storeState.logo);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        dispatch(getLogo());
    }, [])

    return <>
        <Anchor href={settings?.api_domain} target="_blank">
            <Image src={logo} w={width} mx="auto" />
        </Anchor>
       
        {/* {logo != null ? <Image src={logo} w={width} mx="auto" /> : <Skeleton height={30} mx="auto" radius="xs" w={width} />} */}
    </>;
}

export default AppLogo;