import { router, useForm, usePage } from '@inertiajs/react';
import { Button, Group, Table } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { EmailTitle } from '@/features/marketing';
import { WebPush } from './values/listData';
import { MessageLayout, PreviewWebPush } from './Components/Index';

export default function Design() {
    const { id , domain, design, campaign } = usePage<any>().props;

    // console.log('design..', design)

    const formData = useForm({
        id: id,
        isImg: design?.isImg ? design.isImg : 0,
        imgUrl: design?.imgUrl ? design.imgUrl : '',
        icon: design?.defaultIcon ? design.defaultIcon : 0,
        customIcon: design?.iconUrl ? design.iconUrl :'/PL_ICON.png',
        title: design?.title ? design.title : '',
        desc: design?.body ? design.body : '',
        link:  design?.type ? design.type  : 'category', // 0 = Category, 1 = Product, 2 = Page, 3 = External
        linkUrl: design?.linkUrl ? design.linkUrl : '',
        actionBtn: design?.actionBtn ? design.actionBtn : false,
        actionBtnTotal:  design?.actionBtnTotal ? design?.actionBtnTotal : 1, // max 2 button

        stBtnType: design?.buttons ? design?.buttons[0].type : 'category',
        stBtnLink:  design?.buttons ? design?.buttons[0].oriLink : '',
        stBtnLabel:  design?.buttons? design?.buttons[0].title : '',

       

        ndBtnType: design?.buttons ? design?.buttons[1]?.type ?  design?.buttons[1].type : 'category' : 'category',
        ndBtnLink: design?.buttons ? design?.buttons[1]?.oriLink ?  design?.buttons[1].oriLink : '' : '',
        ndBtnLabel: design?.buttons ? design?.buttons[1]?.title ?  design?.buttons[1].title : '' : '',


    })
    

    const rightBtn = () => {
        return <Group gap={'xs'}>
            <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
            <Button variant="filled" size='xs' color='green' disabled={campaign.is_lock ? true : false} onClick={() => submit()}>Save and Next</Button>
        </Group>
    }

    const submit = () => {
        const url = 'web_push.designUpdate'; // Temporary
        // const updatedFormData = urlSelected({ ...formData });

        // url
        formData.put(route(url), {
            ...formData,
            preserveState: true,
            preserveScroll: true,
            onSuccess: (data: any) => {
                console.log(data)
                router.get('launch');
            }
        })
    }

    const urlSelected = (form:any) => {
        if(form.data.linkUrl) {
            if(form.data.link == 'category') {
                const url = domain + 'en/'+ form.data.linkUrl
                if(!form.data.linkUrl.includes(domain)) {
                    form.data.linkUrl = url;
                }
            } else if(form.data.link == 'product') {
                const url = domain + 'en/web-notification/'+ form.data.linkUrl+ '-web-notification'
                if(!form.data.linkUrl.includes(domain)) {
                    form.data.linkUrl = url;
                }
            } else if(form.data.link == 'page') {
                const url = domain + 'page/'+ form.data.linkUrl
                if(!form.data.linkUrl.includes(domain)) {
                    form.data.linkUrl = url;
                }
            }
        }



        // More Button
        if(form.data.actionBtn) {
            // stBtnType
            if(!form.data.stBtnLink){
                if(form.data.stBtnType == 'category') {
                    const url = domain + 'en/'+ form.data.stBtnLink
                    if(!form.data.stBtnLink.includes(domain)) {
                        form.data.stBtnLink = url;
                    }
                } else if(form.data.stBtnType == 'product') {
                    const url = domain + 'en/web-notification/'+ form.data.stBtnLink+ '-web-notification'
                    if(!form.data.stBtnLink.includes(domain)) {
                        form.data.stBtnLink = url;
                    }
                } else if(form.data.stBtnType == 'page') {
                    const url = domain + 'page/'+ form.data.stBtnLink
                    if(!form.data.stBtnLink.includes(domain)) {
                        form.data.stBtnLink = url;
                    }
                }
            }

            // ndBtnType
            if(!form.data.ndBtnLink) {
                if(form.data.ndBtnType == 'category') {
                    const url = domain + 'en/'+ form.data.ndBtnLink
                    if(!form.data.ndBtnLink.includes(domain)) {
                        form.data.ndBtnLink = url;
                    }
                } else if(form.data.ndBtnType == 'product') {
                    const url = domain + 'en/web-notification/'+ form.data.ndBtnLink+ '-web-notification'
                    if(!form.data.ndBtnLink.includes(domain)) {
                        form.data.ndBtnLink = url;
                    }
                } else if(form.data.ndBtnType == 'page') {
                    const url = domain + 'page/'+ form.data.ndBtnLink
                    if(!form.data.ndBtnLink.includes(domain)) {
                        form.data.ndBtnLink = url;
                    }
                }
            }

        }





        return form
    }

    return (
        <>
            <EmailTitle 
                title={'What to Show?'} 
                description={'Design the text and visual content of your campaign to show.'} 
                data={WebPush} 
                rightButton={rightBtn()}
                campaign={campaign?.campaign_name}
            />

            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td w={'70%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <MessageLayout form={formData}/>
                        </Table.Td>
                        <Table.Td w={'30%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <PreviewWebPush form={formData}/>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

        </>
    );

}

Design.layout = (page: any) => <AdminLayout children={page} title='Web Push' back={true} />;
