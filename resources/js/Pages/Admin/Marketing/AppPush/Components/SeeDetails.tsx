import { Flex, Stack, Text, Image, Tabs, Space } from "@mantine/core";

import classes from './SeeDetails.module.css';
import moment from "moment";
import { PreviewMobile } from "./Index";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

function SeeDetails({ data }:any) {

    const [device, setDevice] = useState({
        device: 'apple',
        view: 'lock'
    });
    const template = data?.template?.template?.content ? JSON.parse(data?.template.template.content) : null;

    const sendDate = data?.send_date ? moment(data.send_date + ' ' + data.send_time) : moment(new Date());

    console.log('template: ', data)
    const formData = useForm({
        id: data?.id,
        title: template?.title ? template.title : '',
        desc: template?.body ? template.body : '',
        img: template?.image ? template.image : '',
    });
    
    return <Stack gap={'xs'} px={'md'} pb={'md'}>
         <Tabs color="green" defaultValue="Details">
            <Tabs.List>
                <Tabs.Tab value="Details">Details</Tabs.Tab>
                {template && <Tabs.Tab value="Design">Design</Tabs.Tab>}
            </Tabs.List>

            <Tabs.Panel value="Details">
                <Space h={'xs'} />
                <Stack gap={'xs'} my={'xl'}>
                    <Text fz={16} fw={600}>Campaign Information</Text>
                    <Flex justify={'space-between'}>
                        <Text fz={16} >Created On</Text>
                        <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                        <Text c={'dimmed'}>{data?.created_at ? moment(data.created_at).format('YYYY-MM-DD') + ' at ' + moment(data.created_at).format('hh:mm A') : '-'}</Text>
                    </Flex>
                    <Flex justify={'space-between'}>
                        <Text fz={16} >ID</Text>
                        <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                        <Text c={'dimmed'}>{data?.id ? data.id : '-'}</Text>
                    </Flex>
                    <Flex justify={'space-between'}>
                        <Text fz={16} >Send Date & Time</Text>
                        <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                        <Text c={'dimmed'}>{sendDate.format('YYYY-MM-DD') + ' at ' + sendDate.format('hh:mm A')}</Text>
                    </Flex>
                </Stack>

                {template ? <Stack gap={0} my={'xl'}>
                    <Text ta={'left'} fz={16} fw={600}>Details Design</Text>  
                    <Stack gap={'xs'} my={'xs'} >
                        <Flex justify={'space-between'}>
                            <Text fz={16} >Title</Text>
                            <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                            <Text c={'dimmed'}>{formData.data.title ? formData.data.title : '-'}</Text>
                        </Flex>
                        <Flex justify={'space-between'}>
                            <Text fz={16} >Description </Text>
                            <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                            <Text c={'dimmed'}>{formData.data.desc ? formData.data.desc : '-'}</Text>
                        </Flex>
                        <Flex justify={'space-between'}>
                            <Text fz={16} >With Image </Text>
                            <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                            <Text c={'dimmed'}>{formData.data.img ? 'Yes' : 'No'}</Text>
                        </Flex>
                    </Stack>
                </Stack> : 
                <Stack gap={0} my={'xl'}>
                    <Text ta={'left'} fz={16} fw={600}>Details Design</Text>  
                    <Text c={'dimmed'}>None</Text>
                </Stack>}

                <Stack gap={0} my={'xl'}>
                    <Text fz={16} fw={600}>Shop</Text>
                    <Text c={'dimmed'}>None</Text>
                </Stack>

                <Stack gap={0} my={'xl'}>
                    <Text fz={16} fw={600}>Segments</Text>
                    <Text c={'dimmed'}>None</Text>
                </Stack>

                {/* <Stack gap={0} my={'md'} >
                    <Text fz={16} fw={600}>Notes</Text>
                    <Text c={'dimmed'}>None</Text>
                </Stack>

                <Stack gap={0} my={'md'} mb={'xl'}>
                    <Text fz={16} fw={600}>Tag</Text>
                    <Text c={'dimmed'}>None</Text>
                </Stack> */}
            </Tabs.Panel>

            <Tabs.Panel value="Design">
                <Stack gap={0} mt={'xl'} align={'center'} >
                    <Stack w={'70%'} align={'center'}>
                        {template ? <PreviewMobile data={formData.data} device={device} setDevice={setDevice} withCard={false} /> :  <Text c={'dimmed'}>None</Text>}
                    </Stack>
                </Stack>
            </Tabs.Panel>
        </Tabs>
                
    </Stack>;
}

export default SeeDetails;
