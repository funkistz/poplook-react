import { Paper, SimpleGrid, Table } from '@mantine/core'
import React, { useState } from 'react'
import PanelDetails from './PanelDetails'
import { PreviewEmail } from '../../Email/Components/Index'
import { PreviewWebPush } from '../../WebPush/Components/Index'
import { PreviewDesign } from '../../Whatsapp/Components/Index'
import { PreviewMobile } from '../../AppPush/Components/Index'
import { useForm } from '@inertiajs/react'

export default function PanelList({data, type}:any) {


    const webPushForm = useForm({
        isImg: 0,
        imgUrl: '',
        icon: 0,
        customIcon: '/PL_ICON.png',
        title: '',
        desc: '',
        link: 0, // 0 = Category, 1 = Product, 2 = Page, 3 = External
        linkUrl: '',
        actionBtn: false,
        actionBtnTotal: 1, // max 2 button

        // 1st btn
        stBtnType: 0,
        stBtnLink: '',
        stBtnLabel: '',

        // 2nd btn
        ndBtnType: 0,
        ndBtnLink: '',
        ndBtnLabel: '',
    })

    const appPushForm = useForm({
        title: '',
        desc: '',
        img: '',

        // device: 'apple',
        // view: 'lock'
    })

    const [device, setDevice] = useState({
        device: 'apple',
        view: 'lock'
    });

    const whatsappForm = useForm({
        type : 0,  // 0 = Promotional 1 = Conversational
        // 0 = Text Message;    
        // 1 = Text Message with Media Header;
        // 2 = Text Message with Buttons;
        // 3 = Text Message Media Header and Buttons;
        // null = No Template
        template: null, 
        text: '',
        img: '',
        shortUrl: false,

        // btn
        linkType: 0,
        linkUrl: '',
        linkLabel: '',
    })

    return <>
        <Table>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td w={'70%'} style={{ padding: 0, verticalAlign: 'top' }}>
                        <Paper radius={'lg'} p={'lg'} withBorder mr={'xs'}>
                            <SimpleGrid cols={4}>
                                {data.map((res:any, i: any) => {
                                    return <PanelDetails data={res} key={i} />
                                })}
                            </SimpleGrid>
                        </Paper>
                    </Table.Td>
                    <Table.Td w={'30%'} style={{ padding: 0, verticalAlign: 'top' }}>
                        {/* {type == 'email' && <PreviewEmail width={'100%'} />}
                        {type == 'web push' && <PreviewWebPush data={webPushForm.data}/>}
                        {type == 'app push' &&  <Paper w={'100%%'} radius={'lg'} p={'lg'} withBorder>
                            <PreviewMobile data={appPushForm.data} device={device} setDevice={setDevice} />
                        </Paper>}
                        {type == 'whatsapp' && <PreviewDesign data={whatsappForm.data} />} */}
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    </>
}
