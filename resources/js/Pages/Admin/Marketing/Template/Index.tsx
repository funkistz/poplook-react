import AdminLayout from '@/Components/layout/AdminLayout';
import { Text, Paper, Tabs, Group, Flex, Modal, Stack, ScrollArea, Anchor } from '@mantine/core';
import { useDisclosure, useSessionStorage } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { PanelList } from './Components/Index';
import { appPush, email, webPush, whatsapp } from './Values/dummy';
import { useForm, usePage } from '@inertiajs/react';
import { AppCard, AppTable, UpdateButton } from '@/Components';
import moment from 'moment';
import PreviewWebPush from '../WebPush/Components/PreviewWebPush';
import { PreviewMobile } from '../AppPush/Components/Index';
import { EmailPreview } from '../Email/Components/Index';

export default function TemplatePage() {


    const { data } = usePage<any>().props;
    const [opened, { open, close }] = useDisclosure(false);
    const [details, setDetails] = useState<any>([]);
    const [content, setContent] = useState<any>([]);
    const [device, setDevice] = useState({
        device: 'apple',
        view: 'lock'
    });

   


    // Data
    const emailData = (res:any) => {
        const design = JSON.parse(res.content);

        // console.log('res email:', res)

        const result = {
            data: {
                id: res?.id,
                created_at: res?.created_at ? res.created_at : '-',
                updated_at: res?.updated_at ? res.updated_at : '-',
                template_name: res?.template_name ? res.template_name : '-',
                template_type: res?.template_type ? res.template_type : '-',
            }
        }

        // console.log('result email: ', result)

        return result;
    }
    const appPushData = (res:any) => {
        const design = JSON.parse(res.content);

        // console.log('res app push:', res)

        const result = {
            data: {
                id: res?.id,
                title: design?.title ? design.title : '',
                desc: design?.body ? design.body : '',
                img: design?.image ? design.image : '',  
                created_at: res?.created_at ? res.created_at : '-',
                updated_at: res?.updated_at ? res.updated_at : '-',
                template_name: res?.template_name ? res.template_name : '-',
                template_type: res?.template_type ? res.template_type : '-',
            }
        }

        // console.log('result app push: ', result)

        return result;
    }
    const webPushData = (res:any) => {

        const design = JSON.parse(res.content);
        // console.log('res webpush:', res)
      
        const result = {
            data: {
                id: design?.id,
                isImg: design?.isImg ? design.isImg : 0,
                imgUrl: design?.imgUrl ? design.imgUrl : '',
                icon: design?.defaultIcon ? design.defaultIcon : 0,
                customIcon: design?.iconUrl ? design.iconUrl :'/PL_ICON.png',
                title: design?.title ? design.title : '',
                desc: design?.body ? design.body : '',
                link:  design?.type ? design.type  : 'category', 
                linkUrl: design?.linkUrl ? design.linkUrl : '',
                linkFull : design?.link ? design.link : '',
                actionBtn: design?.actionBtn ? design.actionBtn : false,
                actionBtnTotal:  design?.actionBtnTotal ? design?.actionBtnTotal : 1,
    
                stBtnType: design?.buttons ? design?.buttons[0].type : 'category',
                stBtnLink:  design?.buttons ? design?.buttons[0].oriLink : '',
                stBtnLabel:  design?.buttons? design?.buttons[0].title : '',
                stBtnLinkFull:  design?.buttons? design.buttons[0].action : '',
    
                ndBtnType: design?.buttons ? design?.buttons[1]?.type ?  design?.buttons[1].type : 'category' : 'category',
                ndBtnLink: design?.buttons ? design?.buttons[1]?.oriLink ?  design?.buttons[1].oriLink : '' : '',
                ndBtnLabel: design?.buttons ? design?.buttons[1]?.title ?  design?.buttons[1].title : '' : '',
                ndBtnLinkFull:  design?.buttons? design?.buttons[1]?.action : '',

                template_name: res?.template_name ? res.template_name : '-',
                template_type: res?.template_type ? res.template_type : '-',
                created_at: res?.created_at ? res.created_at : '-',
                updated_at: res?.updated_at ? res.updated_at : '-',
            }
        }

        // console.log('result webpush: ', result)

        return result
    }

    // Table
    const closeDetails = () => {
        setDetails([])
        setContent([])
        close()
    }
    const tableData = (data: any[]) => {

        const values: any = [];
        data && data.map((value: any, index: any) => {
            const sendDate = value.start_date ? moment(value.start_date + ' ' +value.start_time) : moment(new Date());
            values.push({
                'name': <Text fz={14}> {value.template_name}</Text>,
                'type': <Text tt={'capitalize'} fz={14}> {value.template_type}</Text>,
                'created on': moment(value.created_at).format('YYYY-MM-DD') + ' at ' + moment(value.created_at).format('hh:mm A'),
                'update on': moment(value.updated_at).format('YYYY-MM-DD') + ' at ' + moment(value.updated_at).format('hh:mm A'),
                'action':
                    <Group justify='right' gap='xs'>
                        <UpdateButton onClick={() => viewDetails(value.id)} label={'View'} />
                    </Group>
            });
        })
        return values;
    }
    const viewDetails = (id:any) => {
        open()
        data.data.map((res:any, i: any) => {
            if(id == res.id) {
                setDetails(res)
                if(res.template_type == 'email') {
                    return setContent(emailData(res))
                } else if(res.template_type == 'apppush') {
                    return setContent(appPushData(res))
                } else if(res.template_type == 'webpush') {     
                    return setContent(webPushData(res))
                }
                
                return 
            }
        })

        return []
    }

    // Preview Push
    const EmailPreviewResult = () => {
        const divider = ['40%', '60%'];
        return <Flex w={'100%'}>
            <Stack gap={0} w={divider[0]} px={'xs'} style={{borderRightStyle: 'dotted', borderRightWidth: '1.5px', borderRightColor: '#ccc'}}>
                <Stack gap={0} my={'xs'}>
                    <Text fz={16} fw={600}>Template</Text>
                    <ListDetails label={'Name'} value={content?.data.template_name} />
                    <ListDetails label={'Type'} value={content?.data.template_type} />
                    <ListDetails label={'Created On'} value={content?.data.created_at ? moment(content.data.created_at).format('YYYY-MM-DD') + ' at ' + moment(content.data.created_at).format('hh:mm A') : '-'} />
                    <ListDetails label={'Updated On'} value={content?.data.created_at ? moment(content.data.created_at).format('YYYY-MM-DD') + ' at ' + moment(content.data.created_at).format('hh:mm A') : '-'} />
                </Stack>
            </Stack>
            <Stack gap={0} w={divider[1]}>
                <Text pl={'lg'} pt={'xs'} fz={16} fw={600}>Design</Text>
                <ScrollArea h={650} p={'xs'}>
                    <div dangerouslySetInnerHTML={htmlConvert(details)} style={{ width: '100%', height: '100%', overflowX: 'scroll', border: '1px solid #ccc' }}></div>
                </ScrollArea>
            </Stack>
        </Flex>
    }
    const AppPushPreviewResult = () => {
        const divider = ['40%', '60%'];
        return <Flex w={'100%'}>
            <Stack gap={0} w={divider[0]} px={'xs'} style={{borderRightStyle: 'dotted',borderRightWidth: '1.5px',borderRightColor: '#eee'}}>
                <Stack gap={0} my={'xs'}>
                    <Text fz={16} fw={600}>Template</Text>

                    <ListDetails label={'Name'} value={content?.data.template_name} />
                    <ListDetails label={'Type'} value={content?.data.template_type} />
                    <ListDetails label={'Created On'} value={content?.data.created_at ? moment(content.data.created_at).format('YYYY-MM-DD') + ' at ' + moment(content.data.created_at).format('hh:mm A') : '-'} />
                    <ListDetails label={'Updated On'} value={content?.data.created_at ? moment(content.data.created_at).format('YYYY-MM-DD') + ' at ' + moment(content.data.created_at).format('hh:mm A') : '-'} />
                </Stack>

                <Stack gap={0} my={'xs'}>
                    <Text fz={16} fw={600}>Details</Text>

                    <ListDetails label={'Title'} value={content?.data.title} />
                    <ListDetails label={'Description'} value={content?.data.desc} />
                    <ListDetails label={'Image'} value={content?.data.img ? content?.data.img : 'None'} />
                </Stack>
            </Stack>
            <Stack gap={0} w={divider[1]}>
                <Text pl={'lg'} pt={'xs'} fz={16} fw={600}>Design</Text>
                {details.template_type == 'apppush' && <ScrollArea h={650}>
                    <PreviewMobile data={content.data} device={device} setDevice={setDevice} withCard={false} />
                </ScrollArea>}
            </Stack>
        </Flex>
    }
    const WebPushPreviewResult = () => {
        const divider = ['40%', '60%'];
        return <Flex w={'100%'}>
            <Stack gap={0} w={divider[0]} px={'xs'} style={{borderRightStyle: 'dotted',borderRightWidth: '1.5px',borderRightColor: '#eee'}}>
                <Stack gap={0} my={'xs'}>
                    <Text fz={16} fw={600}>Template</Text>
                    <ListDetails label={'Name'} value={content?.data.template_name} />
                    <ListDetails label={'Type'} value={content?.data.template_type} />
                    <ListDetails label={'Created On'} value={content?.data.created_at ? moment(content.data.created_at).format('YYYY-MM-DD') + ' at ' + moment(content.data.created_at).format('hh:mm A') : '-'} />
                    <ListDetails label={'Updated On'} value={content?.data.created_at ? moment(content.data.created_at).format('YYYY-MM-DD') + ' at ' + moment(content.data.created_at).format('hh:mm A') : '-'} />
                </Stack>

                <Stack gap={0} my={'xs'}>
                    <Text fz={16} fw={600}>Details</Text>

                    <ListDetails label={'Title'} value={content.data.title ? content.data.title : '-'} />
                    <ListDetails label={'Description'} value={content.data.desc ? content.data.desc : '-'} />
                    <ListDetails label={'With Image'} value={content.data.imgUrl ? 'Yes' : 'No'} />
                    <ListDetails label={'Custom Icon'} value={content.data.icon ? 'Yes' : 'No'} />
                    <ListDetails label={'Link'} value={content.data.linkUrl ? Url(content.data.link, content.data.linkFull, content.data.linkUrl) : '-'} />
                    <ListDetails label={'First Button'} value={content.data.stBtnLink ? Url(content.data.stBtnType, content.data.stBtnLinkFull, content.data.stBtnLink) : '-'} />
                    <ListDetails label={'Second Button'} value={content.data.ndBtnLink ? Url(content.data.ndBtnType, content.data.ndBtnLinkFull, content.data.ndBtnLink) : '-'} />
                </Stack>
            </Stack>
            <Stack gap={0} w={divider[1]}>
                <Text pl={'lg'} pt={'xs'} fz={16} fw={600}>Design</Text>
                <Stack w={'100%'} align={'center'} justify={'center'}>
                    <Flex w={'60%'} justify={'center'}h={650} mt={'lg'}>
                        <PreviewWebPush form={content} withCard={false}/>
                    </Flex>
                </Stack>
            </Stack>
        </Flex>
    }

    const ListDetails = (label:any) => {
        return <Flex justify={'space-between'}>
            <Text fz={15} >{label.label}</Text>
            <Text mx={'md'} style={{borderBottomStyle: 'dotted',borderBottomWidth: '1.5px',borderRightColor: '#858e9f',flexGrow: 1, }} >&nbsp;</Text>
            <Text c={'dimmed'}>{label.value}</Text>
        </Flex>
    }

    const Url = (type:any, linkOri:any, link:any) => {
        if(type == 'category') {
            return <Anchor c={'dimmed'} href={linkOri} target="_blank">/{link}</Anchor>
        } else if(type == 'product') {
            return <Anchor c={'dimmed'} href={linkOri} target="_blank">/{link}</Anchor>
        } else if(type == 'page') {
            return <Anchor c={'dimmed'} href={linkOri} target="_blank">/page/{link}</Anchor>
        } else if(type == 'external') {
            return <Anchor c={'dimmed'} href={linkOri} target="_blank">linkOri{link}</Anchor>
        } else {
            return 'Not Found';
        }
    }

    const htmlConvert = (res:any) => {
        const theObj = { __html: res.html };
        return  theObj
    }
    
    return <>
      
        <AppCard title='Template'>
            <AppTable
                data={tableData(data.data)}
                meta={data}
                canSort={[{ label: 'created on', value: 'created_at' }]}
                searchPlaceholder='Search by name'
                filterBy={[
                    { value: '', label: 'All' },
                    { value: 'email', label: 'Email' },
                    { value: 'apppush', label: 'App Push' },
                    { value: 'webpush', label: 'Web Push' },
                    { value: 'whatsapp', label: 'Whatsapps' },
                ]}
            />
        </AppCard>

        <Modal opened={opened} onClose={closeDetails} centered size={'80%'} >

            {details.template_type == 'email' && <EmailPreviewResult />}

            {details.template_type == 'apppush' && <AppPushPreviewResult />}

            {details.template_type == 'webpush' && <WebPushPreviewResult />}

            {details.template_type == 'whatsapps' && <Text fs="italic">*not finish tey</Text>}


        </Modal>
    </>
}


TemplatePage.layout = (page: any) => <AdminLayout children={page} title='Template' />;