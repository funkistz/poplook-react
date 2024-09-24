import { Flex, Stack, Text, Image, Anchor } from "@mantine/core";

import classes from './SeeDetails.module.css';
import PreviewWebPush from "./PreviewWebPush";
import { useForm } from "@inertiajs/react";
import moment from "moment";

function SeeDetails({ data }:any) {

    const template = data?.template?.template?.content ? JSON.parse(data?.template.template.content) : null;
    
    const formData =  useForm({
        id: template?.id,
        isImg: template?.isImg ? template.isImg : 0,
        imgUrl: template?.imgUrl ? template.imgUrl : '',
        icon: template?.defaultIcon ? template.defaultIcon : 0,
        customIcon: template?.iconUrl ? template.iconUrl :'/PL_ICON.png',
        title: template?.title ? template.title : '',
        desc: template?.body ? template.body : '',
        link:  template?.type ? template.type  : 'category', 
        linkUrl: template?.linkUrl ? template.linkUrl : '',
        linkFull : template?.link ? template.link : '',
        actionBtn: template?.actionBtn ? template.actionBtn : false,
        actionBtnTotal:  template?.actionBtnTotal ? template?.actionBtnTotal : 1, 

        // Button1 
        stBtnType: template?.buttons ? template?.buttons[0].type : 'category',
        stBtnLink:  template?.buttons ? template?.buttons[0].oriLink : '',
        stBtnLabel:  template?.buttons? template?.buttons[0].title : '',
        stBtnLinkFull:  template?.buttons? template.buttons[0].action : '',

        // Button2
        ndBtnType: template?.buttons ? template?.buttons[1]?.type ?  template?.buttons[1].type : 'category' : 'category',
        ndBtnLink: template?.buttons ? template?.buttons[1]?.oriLink ?  template?.buttons[1].oriLink : '' : '',
        ndBtnLabel: template?.buttons ? template?.buttons[1]?.title ?  template?.buttons[1].title : '' : '',
        ndBtnLinkFull:  template?.buttons? template?.buttons[1]?.action : '',
    });

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

    const sendDate = data?.send_date ? moment(data.send_date + ' ' + data.send_time) : moment(new Date());

    return <Stack gap={'xs'} px={'md'} pb={'md'}>
        <Stack gap={'xs'} mb={'md'}>
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

        <Text ta={'left'} fz={16} fw={600}>Design</Text>  
        <Stack gap={0} my={'xs'} align={'center'} >
            <Stack w={'70%'} align={'center'}>
                {template ? <PreviewWebPush form={formData} withCard={false} /> :  <Text c={'dimmed'}>None</Text>}
            </Stack>
        </Stack>

        {template && <>
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
                    <Text c={'dimmed'}>{formData.data.imgUrl ? 'Yes' : 'No'}</Text>
                </Flex>
                <Flex justify={'space-between'}>
                    <Text fz={16} >Custom Icon </Text>
                    <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                    <Text c={'dimmed'}>{formData.data.icon ? 'Yes' : 'No'}</Text>
                </Flex>
                <Flex justify={'space-between'}>
                    <Text fz={16} >Link</Text>
                    <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                    <Text c={'dimmed'}>{formData.data.linkUrl ? Url(formData.data.link, formData.data.linkFull, formData.data.linkUrl) : '-'}</Text>
                </Flex>
                <Flex justify={'space-between'}>
                    <Text fz={16} >First Button</Text>
                    <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                    <Text c={'dimmed'}>{formData.data.stBtnLink ? Url(formData.data.stBtnType, formData.data.stBtnLinkFull, formData.data.stBtnLink) : '-'}</Text>
                </Flex>
                <Flex justify={'space-between'}>
                    <Text fz={16} >Second Button</Text>
                    <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                    <Text c={'dimmed'}>{formData.data.ndBtnLink ? Url(formData.data.ndBtnType, formData.data.ndBtnLinkFull, formData.data.ndBtnLink) : '-'}</Text>
                </Flex>
            </Stack>
        </>}

        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Shop</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>

        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Segments</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>

        <Stack gap={0} my={'md'} >
            <Text fz={16} fw={600}>Notes</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>

        <Stack gap={0} my={'md'} mb={'xl'}>
            <Text fz={16} fw={600}>Tag</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>
        
    </Stack>;
}

export default SeeDetails;
