import AppLayout from '@/Components/AppLayout';
import { SimpleGrid, Text } from '@mantine/core';
import { PreviewDesktopBanner, PreviewTitleDropdown } from '@/features/preview_banner';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PreviewBanner() {
    const { listBanner } = usePage<any>().props;

    const [data, setData] = useState<any>(null);
    const [shop, setShop] = useState<any>(1);

    useEffect(() => {
        setData(listBanner.active[0])
    }, [])

    return (
        <>
            {/* <PreviewTitleDropdown title={data != null ? data.name : null} shop={shop} setShop={setShop} /> */}
            <PreviewDesktopBanner json={data != null ? JSON.parse(data.data) : null} shop={shop} />
        </>
    );
}

PreviewBanner.layout = (page: any) => <AppLayout children={page} />;
