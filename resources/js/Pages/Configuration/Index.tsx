import AppLayout from '@/Components/AppLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, createStyles, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title
} from '@mantine/core';
import {
    IconUpload, IconFileZip, IconEye, IconTrash, IconDots, IconAt, IconListSearch, IconHome2, IconGauge, IconChevronRight, IconCircleOff, IconActivity, IconSettings
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { DateTimePicker, DateInput, TimeInput } from '@mantine/dates';
import moment from 'moment';
import ConfigurationNav from './Components/ConfigurationNav';
import ConfigurationPreview from './Components/ConfigurationPreview';



export default function ConfigurationSettingPage() {
    const defaultNo = 0;
    const { listgroup } = usePage<any>().props;
    const [data, setData] = useState<any>(listgroup);
    const [activeUrl, setActiveUrl] = useState<number>(defaultNo);


    const onChangeData = (index: any, val: any) => {
        setData((item: any) => {
            const temp = [...item];

            if (temp[activeUrl].configuration_setting[index].value_type == "multiple_select") {
                temp[activeUrl].configuration_setting[index].configuration.value = val.toString();
                return temp;
            }
            temp[activeUrl].configuration_setting[index].configuration.value = val;
            return temp;
        });
    }

    const updateAPI = () => {
        router.put('config/update', data[activeUrl].configuration_setting);
    }



    const onChangeSett = (i: any) => {
        setActiveUrl(i)
    }

    useEffect(() => {
        console.log('group', listgroup)
    }, [])

    // useEffect(() => {
    //     console.log('data', data)
    //     console.log('list', listgroup)
    // }, [data])



    return (
        <>

            <Flex bg='#fff' style={{ transition: 'width 0.2s', position: 'sticky', top: 55, zIndex: 1 }}>
                <Flex w={'75%'} px={10} direction={'column'} >
                    <ConfigurationPreview list={data} defaultNo={defaultNo} onChangeData={onChangeData} submit={updateAPI} activeUrl={activeUrl} />
                </Flex>
                <Flex w={'25%'} px={10}>
                    <ConfigurationNav list={data} onChangeSett={onChangeSett} activeUrl={activeUrl} />
                </Flex>
            </Flex>

        </>
    );

}

ConfigurationSettingPage.layout = (page: any) => <AppLayout children={page} title='Configuration Setting' />;