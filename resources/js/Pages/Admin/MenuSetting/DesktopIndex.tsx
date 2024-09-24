import { useRef } from 'react'
import AdminLayout from '@/Components/layout/AdminLayout';
import { useState, useEffect } from 'react';
import { Divider, Card } from '@mantine/core';
import { DesktopMenuPreview, MenuList } from '@/features/desktop_menu';
import { useDispatch } from 'react-redux';
import { TransferList } from '@/features/transfer_list_preview/Index';
import { usePage, useForm } from '@inertiajs/react';
import { resetBlock } from '@/features/block_creator/redux/blockSlice';
import moment from 'moment';

export default function DesktopMenuSettingPage() {

    const { topMenus } = usePage<any>().props;
    const previewRef = useRef<any>('<div></div>');
    const url = 'desktop_menu';
    const dispatch = useDispatch();


    const { data, setData, put, processing, errors } = useForm({
        id: null,
        name: '',
        description: '',
        start_at: null,
        data: '',
    })

    const [listActive, setListActive] = useState<any>([]);
    const [listDraft, setListDraft] = useState<any>([]);
    const [menu, setMenu] = useState<any>(null);
    const [activeParentIndex, setActiveParentIndex] = useState<any>(null);


    const setMenuBlock = (newBlock: any) => {

        const temp: any = menu ? { ...menu } : {};
        temp.block = newBlock;

        setData({
            ...data,
            data: newBlock,
        });

        setMenu(temp);
    }

    const setMenuDetail = (field: any, value: any) => {

        const temp: any = menu ? { ...menu } : {};
        temp[field] = value;

        if (field == 'start_at') {
            setData({
                ...data,
                [field]: value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null,
            });

            setMenu(temp);

            return
        }

        setData({
            ...data,
            [field]: value,
        });

        setMenu(temp);
    }

    const onSetActive = (data: any, index: any) => {

        const tempData = JSON.parse(JSON.stringify(data));;
        tempData.block = tempData.data ? JSON.parse(tempData.data) : []
        delete tempData.data;

        if (tempData.block.length > 0) {
            setActiveParentIndex('0');
        }

        setData({
            id: tempData.id,
            name: tempData.name,
            description: tempData.description,
            start_at: tempData.start_at,
            data: tempData.data,
        });

        setMenu(tempData);
        setActiveParentIndex(-1);
    }

    const onSubmit = (data: any) => {
        const fullUrl = url + '.update';
        put(route(fullUrl.toString(), data.id), { preserveScroll: true });
    }

    useEffect(() => {
        setListActive(topMenus.active);
        setListDraft(topMenus.draft);
    }, [topMenus]);

    useEffect(() => {
        dispatch(resetBlock());
        setListActive(topMenus.active);
        setListDraft(topMenus.draft);

        // active first index
        const index = 0;

        if (topMenus.active[0] != undefined) {
            onSetActive(JSON.parse(JSON.stringify(topMenus.active[index])), index)
        }
    }, [])

    return (
        <>
            <TransferList
                listActive={listActive}
                listDraft={listDraft}
                onSetActive={onSetActive}
                url={url}
                setData={setData}
                data={data}
                needBlock={false}
                apiDuplicate={url + '/duplicate'}
                apiActivate={url + '/activate'}
                apiDeactivate={url + '/deactivate'}
            />

            {menu && <>
                <Card p='xl' radius='lg' withBorder shadow='xs' mt={'lg'}>
                    <MenuList activeIndex={activeParentIndex} setActiveIndex={setActiveParentIndex} data={menu} setMenuBlock={setMenuBlock} setMenuDetail={setMenuDetail} onSubmit={onSubmit} type={'desktop'} />

                    <Divider mt={10} mb={20} />

                    <div ref={previewRef}><DesktopMenuPreview data={menu.block} activeIndex={activeParentIndex} setActiveIndex={setActiveParentIndex} /></div>
                </Card>
            </>}
        </>
    )
}

DesktopMenuSettingPage.layout = (page: any) => <AdminLayout children={page} title='Desktop Menu Setting' />;
