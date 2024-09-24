import {router, useForm, usePage} from '@inertiajs/react';
import { Paper, TextInput, rem, Textarea, Alert, Group, Text, Flex, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { data } from './values/listData';
import { useEffect, useState } from 'react';
import {  PreviewMobile } from './Components/Index';
import { InternalBreadcrumbs } from '../Components/Index';
import { UploadFileButton } from '@/features/custom_upload_file/Index';
export default function CreateAppNotification() {
    const { id , design, campaign} = usePage<any>().props;

    const [device, setDevice] = useState({
        device: 'apple',
        view: 'lock'
    });

    const formData = useForm({
        id: id,
        title: design?.title ? design.title : '',
        desc: design?.body ? design.body : '',
        img: design?.image ? design.image : '',
    });

    const [deeplink, setDeeplink] = useState([
        { label: 'categoryId', value: '' },
        { label: 'categoryName', value: '' },
        { label: 'searchKeyword', value: '' },
    ]);

    const handleEditValue = (label: string, index: number, newValue: string) => {
        if (label == 'label') {
            setDeeplink((prev) =>
                prev.map((item, i) =>
                    i === index ? { ...item, label: newValue } : item
                )
            );
        }

        if (label == 'value') {
            setDeeplink((prev) =>
                prev.map((item, i) =>
                    i === index ? { ...item, value: newValue } : item
                )
            );
        }
    };

    const removeDeepLink = (i:any) => {

        if(campaign.is_lock) {

        }
        setDeeplink((prev) => prev.filter((item, i) => i !== i))
    }

    const setImgSelected = (url: any) => {
        formData.setData('img',url)
        close();
    }

    const storeData = () => {
        formData.post(route('app_notification.update'), {
            ...formData,
            preserveState: true,
            preserveScroll: true,
            onSuccess: (data: any) => {
                console.log(data)
                router.get('segment');
            }
        })
    }

    const lastUrl = data(id);

    console.log('campaign: ', campaign.is_lock)

    return (
        <>
            <Paper radius={'lg'} p={'lg'} withBorder mb={'xs'}>
                <InternalBreadcrumbs
                    data={data(id)}
                    rightsection={<Group gap={'xs'}>
                        <Button size={'xs'} variant="light" color="gray" component="a" onClick={() =>  window.history.back()}>Back</Button>
                        <Button size={'xs'} color={'green'} disabled={campaign.is_lock == 1 ? true : false} variant="outline">Send Test Push</Button>
                        <Button size={'xs'} color={'green'} disabled={campaign.is_lock == 1 ? true : false} variant="filled" onClick={() => storeData()}>Save and Next</Button>
                    </Group>} />
            </Paper>

            <Flex justify={'space-between'}>
                <Paper w={'65%'} mr={'xs'} radius={'lg'} p={'lg'} withBorder>
                    <Text fz={18} mb={'md'}>Message Content</Text>
                    <Text fz={14} c={'dimmed'} mb={30}>
                        Recommended Resolution for Image Rich Push is 1024x512px.<br></br>
                        Recommended Resolution for the GIF Notifications is 1280x720px. Max file size is 2 MB.
                    </Text>

                    <TextInput
                        label={'Image'}
                        placeholder="Choose Image"
                        onChange={(e) => formData.setData('img', e.target.value)}
                        mb={'xs'}
                        value={formData.data.img}
                        disabled={campaign.is_lock == 1 ? true : false}
                    />

                    {campaign.is_lock == 0 && <Flex justify={'end'}>
                        <UploadFileButton setImageSelected={setImgSelected} isApp={true}/>
                    </Flex>}

                    <TextInput
                        label="Title"
                        placeholder="Enter Title"
                        my={'lg'}
                        value={formData.data.title}
                        onChange={(e) => formData.setData('title', e.target.value)}
                        disabled={campaign.is_lock == 1 ? true : false}
                        error={formData.errors.title}
                    />
                    <Textarea
                        label="Message"
                        placeholder="Enter Message"
                        my={'lg'}
                        value={formData.data.desc}
                        onChange={(e) => formData.setData('desc', e.target.value)}
                        disabled={campaign.is_lock == 1 ? true : false}
                        error={formData.errors.desc}
                    />

                    <hr style={{ borderTop: '1px dashed gray', marginTop: 30, marginBottom: 30 }} />

                    <Text fz={18} mb={'md'}>Deep link</Text>
                    <Text fz={14} c={'dimmed'} mb={30}>
                        You can assign one or more Deep Links to your message for directing your users or collecting user data.
                    </Text>

                    {deeplink.map((res: any, index: any) => {
                        return campaign.is_lock == 1 ? 
                            <Alert key={index} variant="default" color="blue" my={'xs'}>
                                <Flex justify={'space-between'} >
                                    <TextInput
                                        label={'Enter Deep Link Key'}
                                        placeholder='Enter deep link'
                                        w={'50%'}
                                        px={'xs'}
                                        value={res.label}
                                        onChange={(e) => handleEditValue('label', index, e.target.value)}
                                        disabled={campaign.is_lock == 1 ? true : false}

                                    />
                                    <TextInput
                                        label={'Enter Deep Link Value'}
                                        placeholder='Enter deep link value'
                                        w={'50%'}
                                        px={'xs'}
                                        value={res.value}
                                        onChange={(e) => handleEditValue('value', index, e.target.value)}
                                        disabled={campaign.is_lock == 1 ? true : false}
                                    />
                                </Flex>
                            </Alert>
                        :
                        <Alert key={index} variant="default" color="blue" withCloseButton my={'xs'} onClose={() =>  { setDeeplink((prev) => prev.filter((item, i) => i !== i)) }}>
                            <Flex justify={'space-between'} >
                                <TextInput
                                    label={'Enter Deep Link Key'}
                                    placeholder='Enter deep link'
                                    w={'50%'}
                                    px={'xs'}
                                    value={res.label}
                                    onChange={(e) => handleEditValue('label', index, e.target.value)}
                                    disabled={campaign.is_lock == 1 ? true : false}

                                />
                                <TextInput
                                    label={'Enter Deep Link Value'}
                                    placeholder='Enter deep link value'
                                    w={'50%'}
                                    px={'xs'}
                                    value={res.value}
                                    onChange={(e) => handleEditValue('value', index, e.target.value)}
                                    disabled={campaign.is_lock == 1 ? true : false}
                                />
                            </Flex>
                        </Alert>
                    })}

                    <Button
                        variant='outline'
                        color='green'
                        leftSection={<IconPlus />}
                        onClick={() => setDeeplink((prev: any) => ([...prev, { label: '', value: '' }]))}
                        disabled={campaign.is_lock == 1 ? true : false}
                    >Add Deep Link</Button>

                </Paper>
                <Paper w={'35%'} radius={'lg'} p={'lg'} withBorder>
                    <PreviewMobile data={formData.data} device={device} setDevice={setDevice} />
                </Paper>
            </Flex>
        </>
    );

}

CreateAppNotification.layout = (page: any) => <AdminLayout children={page} title='Create your message' />;
