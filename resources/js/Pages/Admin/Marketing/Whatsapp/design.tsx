import { useForm, usePage } from '@inertiajs/react';
import { Text, Checkbox, Select, Button, Divider, Table } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { EmailTitle } from '@/features/marketing';
import { DesignLayout, PreviewDesign } from './Components/Index';
import { WhatsAppsBC } from './values/listData';


export default function Design() {
    const { list, search } = usePage<any>().props;

    const rightBtn = () => {
        return <>
            <Button variant="filled" size='xs'>Save and Continuous</Button>
        </>
    }

    const { data, setData, post, processing, reset } = useForm({
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

    return (
        <>
            <EmailTitle title={'What to Show?'} description={'Design the content of your campaign.'} data={WhatsAppsBC} rightButton={rightBtn()} />
            
            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td w={'70%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <DesignLayout data={data} setData={setData} />
                        </Table.Td>
                        <Table.Td w={'30%'} style={{ padding: 0, verticalAlign: 'top' }}>
                            <PreviewDesign data={data} />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    );

}

Design.layout = (page: any) => <AdminLayout children={page} title='WhatsApps' back={true} />;