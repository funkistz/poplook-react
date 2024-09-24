import { Flex, Stack, Text, Image, Paper, ActionIcon, Button, SegmentedControl, Select, BackgroundImage, Indicator } from "@mantine/core";
import { AppCard } from "@/Components";
import { IconBrandApple, IconBrandWindows, IconChevronDown, IconChevronRight, IconChevronUp, IconLayoutCollage, IconLoader, IconWindow, IconX } from "@tabler/icons-react";
import { useOs, useToggle } from "@mantine/hooks";
import { chrome, firefox, safari } from "./Index";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

function PreviewWebPush({form, withCard = true}:{form:any, withCard?:any}) {
    const os = useOs();
    const [value, toggle] = useToggle<0 | 1>([1, 0]);
    const [preview, setPreview] = useState<any>(null)
    const { domain } = usePage<any>().props;

    const data = [
        { 
            group: 'Apple', 
            items: [
                { label: 'Chrome', value: '1-Chrome'},
                { label: 'Firefox', value: '1-Firefox'},
            ],
        },{
            group: 'Windows', 
            items: [
                { label: 'Chrome', value: '2-Chrome'},
                { label: 'Firefox', value: '2-Firefox'},
            ],
        }
    ]

    useEffect(() => {
        choosePreview(os)
    }, [os])

    const choosePreview = (os:any) => {
        if(os == 'macos') {
            setPreview(data[0].items[0].value)
        } else {
            setPreview(data[1].items[1].value)
        }
    }

    const IconPreview = () => {
        if(preview == '1-Chrome' || preview == '1-Firefox' || preview == '1-Safari') {
            return <IconBrandApple stroke={1.5} style={{ color: 'black' }} />
        } else if(preview == '2-Chrome' || preview == '2-Firefox') {
            return <IconBrandWindows stroke={1.5}  style={{ color: 'black' }}/>
        }
        return <IconLoader stroke={1.5} style={{ color: 'black' }} />
    }

    const logoPreviewWindow = () => {
        const [hover, setHover] = useState<boolean>(false);

        const IconOrImg = () => {
            const data = form.data;
           
            // Check Icon Only or not
            if(data.isImg == true) {
               
                // check link url img
                if(data.imgUrl.length > 0) {
                    return data.imgUrl
                }

                 return '/PL_ICON.png'

            } else {
                // Check Custom icon or not
                if(data.icon == true) {
                    
                    // check link url custom icon
                    if(data.customIcon.length > 0) {
                        return data.customIcon;
                    } 

                    return '/PL_ICON.png'
                }

                return '/PL_ICON.png';
            }
        }

        const buttonsData = () => {

            const data = form.data;

            // Check actionBtn active or not
            if(data.actionBtn == true) {
                 // checking action btn no

                 if(data.actionBtnTotal == 1) {
                    return [
                        { label:'Options', value: 'Options' },
                        { label: data?.stBtnLabel ? data.stBtnLabel: 'Button 1', value: data.stBtnLabel },
                        { label: 'Settings', value: 'Settings'},
                    ]
                 } else if(data.actionBtnTotal == 2) {
                    return [
                        { label:'Options', value: 'Options' },
                        { label: data?.stBtnLabel ? data.stBtnLabel: 'Button 1', value: data?.stBtnLabel ? data.stBtnLabel: 'Button 1' },
                        { label: data?.ndBtnLabel ? data.ndBtnLabel: 'Button 2', value: data?.ndBtnLabel ? data.ndBtnLabel: 'Button 2'},
                        { label: 'Settings', value: 'Settings'},
                    ]
                 } else {
                    return []
                 }
            }

            return [
                { label: 'Settings', value: 'Settings'},
                { label: 'xx', value: 'xx'}
            ]
        }


        // 1 apple 2 window
        if(preview == '1-Chrome') {
            return <>
                <Flex justify={'space-between'} w={'100%'} p={'xs'}  onMouseOver={(e) => setHover(true)} onMouseOut={(e) => setHover(false)} h={80}>
                    <Stack w={'15%'} justify={'center'} align={'center'}>
                        <Image w={40} src={chrome} />
                    </Stack>
                    <Stack w={'65%'} gap={'xs'}>
                        <Stack gap={0} ml={'xs'}>
                            <Text fz={13} fw={500} lineClamp={0} maw={230}>{form.data.title.length > 0 ? form.data.title : 'Title'}</Text>
                            <Text fz={10}>{domain}</Text>
                            <Text fz={13} lineClamp={0} maw={230}>{form.data.desc.length > 0 ? form.data.desc : 'Desc'}</Text>
                        </Stack>
                    </Stack>
                    <Stack w={'20%'} align={'end'} justify={'center'} gap={0}>
                        {hover ? 
                            <>
                                <ActionIcon variant="transparent" color="gray" >
                                    {!value 
                                        ? <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        : <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                                </ActionIcon>
                                <Select
                                    data={buttonsData()}
                                    value={!form.data.actionBtn ? 'Settings': 'Options'}
                                    size={'xs'}
                                    w={100}
                                    rightSection={<IconChevronDown style={{ width: '50%', height: '50%' }} stroke={1.5} />}
                                />
                            </>
                            :
                            <>
                                <BackgroundImage src={IconOrImg()}w={40}h={30} />
                            </>
                        }
                    </Stack>
                </Flex>
            </>
            
        } else if(preview == '1-Firefox') {
            return <>
                <Flex justify={'space-between'} w={'100%'} p={'xs'}  onMouseOver={(e) => setHover(true)} onMouseOut={(e) => setHover(false)} h={80}>
                    <Stack w={'15%'} justify={'center'} align={'center'}>
                        <Image w={40} src={firefox} />
                    </Stack>
                    <Stack w={'65%'} gap={'xs'}>
                        <Stack gap={0} ml={'xs'}>
                            <Text fz={13} fw={500} lineClamp={0} maw={230}>{form.data.title.length > 0 ? form.data.title : 'Title'}</Text>
                            <Text fz={10}>{domain}</Text>
                            <Text fz={13} lineClamp={0} maw={230}>{form.data.desc.length > 0 ? form.data.desc : 'Desc'}</Text>
                        </Stack>
                    </Stack>
                    <Stack w={'20%'} align={'end'} justify={'center'} gap={0}>
                        {hover ? 
                            <>
                                <ActionIcon variant="transparent" color="gray">
                                    {!value 
                                        ? <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        : <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                                </ActionIcon>
                                <Select
                                    data={buttonsData()}
                                    value={!form.data.actionBtn ? 'Settings': 'Options'}
                                    size={'xs'}
                                    w={100}
                                    rightSection={<IconChevronDown style={{ width: '50%', height: '50%' }} stroke={1.5} />}
                                />
                            </>
                            :
                            <>
                                <BackgroundImage src={IconOrImg()}w={40}h={30} />
                            </>
                        }
                    </Stack>
                </Flex>
            </>
        } else if(preview == '2-Chrome') {
            return <Flex align={'center'}>
                <Image h={20} src={chrome} />
                <Text fz={10} ml={'xs'}>Google Chrome</Text>
            </Flex>
        } else if(preview == '2-Firefox') {
            return <Flex align={'center'}>
                <Image h={20} src={firefox} />
                <Text fz={10} ml={'xs'}>Mozilla Firefox</Text>
            </Flex>
        }
    }

    const PreviewNotiWindow = () => {
        return  <Paper withBorder radius={'md'} w={'100%'}>
            <Flex justify={'space-between'} p={'xs'}>
                {logoPreviewWindow()}
                <ActionIcon variant="transparent" color="gray" onClick={() => toggle()}>
                    {value 
                        ? <IconChevronUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        : <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                </ActionIcon>
            </Flex>
            {value == 1 && <Flex justify={'center'} w={'100%'}>
                {form.data.imgUrl.length > 0 
                    ? <Image src={form.data.imgUrl}  /> 
                    : form.data.isImg == 1 ? <Stack gap={0} w={'100%'} justify={'center'} align={'center'}>
                        <IconLayoutCollage style={{width: '80%', height: '80%'}} stroke={1} />
                    </Stack> : <></>}
            </Flex>}
            
            <Flex m={'md'}>
                <Image fit={'contain'} h={65} w={65} src={form.data.icon == 0 ? '/PL_ICON.png' : form.data.customIcon} fallbackSrc="/PL_ICON.png" />
                <Stack gap={0} ml={'xs'}>
                    <Text fz={14} lineClamp={3} maw={230}>{form.data.title.length > 0 ? form.data.title : 'Title'}</Text>
                    <Text fz={13} lineClamp={5} maw={230}>{form.data.desc.length > 0 ? form.data.desc : 'Desc'}</Text>
                    <Text fz={10}>via poplook.com</Text>
                </Stack>
            </Flex>
            {value == 1 && <>
                {form.data.actionBtn
                    ? <>
                        {form.data.actionBtnTotal == 1 && <>
                            <Button m={'xs'} p={'xs'} variant="light" color="gray" w={'95%'}>{form.data.stBtnLabel.length > 0 ? form.data.stBtnLabel: 'First'}</Button> 
                        </>}

                        {form.data.actionBtnTotal == 2 && <Flex>
                            <Button m={'xs'} p={'xs'} variant="light" color="gray" fullWidth>{form.data.stBtnLabel.length > 0 ? form.data.stBtnLabel: 'First'}</Button> 
                            <Button m={'xs'} p={'xs'} variant="light" color="gray" fullWidth>{form.data.ndBtnLabel.length > 0 ? form.data.ndBtnLabel: 'Second'}</Button> 
                        </Flex>}
                    </> 
                    :<Button m={'xs'} p={'xs'} variant="light" color="gray" w={'95%'}>Close</Button> }
            </>}
        </Paper>
    }

    const PreviewNotiMac = () => {
        return <Paper withBorder radius={'md'} w={'100%'}>
             {logoPreviewWindow()}
        </Paper>
    }

    const ResultPreview = () => {
        return <Stack gap={0} w={'100%'}>
            <Select
                data={data} w={'100%'} mb={'xs'}
                value={preview}onChange={(e) => setPreview(e)}
                leftSection={<IconPreview />}
                allowDeselect={false}
            />
            {(preview == '2-Chrome' || preview == '2-Firefox') ? <PreviewNotiWindow /> : <PreviewNotiMac />}
        </Stack>
    }


    return withCard ? <Stack style={{ position: 'sticky', top: 80}}>
            <AppCard title={'Preview'} >
                <ResultPreview />
            </AppCard>
        </Stack>
        :
        <ResultPreview />
}

export default PreviewWebPush;
