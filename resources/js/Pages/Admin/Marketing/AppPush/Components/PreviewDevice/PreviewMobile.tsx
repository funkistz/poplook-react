import { Flex, Image, rem, Text, SegmentedControl, Stack } from "@mantine/core";
import { IconBrandApple, IconBrandAndroid } from "@tabler/icons-react";
import { AndroidLock, AppleLock, iphoneExpend, androidExpend } from "../Index";


function PreviewMobile({ data, device, setDevice, withCard = true, withOption = true }: any) {

    return withCard ? 
        <Flex w={'100%'} justify={'center'} direction={'column'}>
            <Text c={'dimmed'} fw={600} mb={'lg'}>Preview</Text>
            
            {withOption && <Flex w={'100%'} justify={'center'}>
                <SegmentedControl
                    data={[
                        {
                            label: (<IconBrandApple style={{ width: rem(20), height: rem(20) }} />),
                            value: 'apple'
                        },
                        {
                            label: (<IconBrandAndroid style={{ width: rem(20), height: rem(20) }} />),
                            value: 'android'
                        }
                    ]}
                    mr={'xs'}
                    value={device.device}
                    onChange={(e) => setDevice((prev: any) => ({
                        ...prev,
                        device: e
                    }))}
                />
            </Flex>}
            
            

            {(device.device == 'apple' && device.view == 'lock') && <>
                <AppleLock data={data} />
            </>}

            {(device.device == 'android' && device.view == 'lock') && <>
                <AndroidLock data={data} />
            </>}
        </Flex>
        :
        <Stack gap={0}>
            {withOption &&  <Flex w={'100%'} justify={'center'}>
                <SegmentedControl
                    data={[
                        {
                            label: (<IconBrandApple style={{ width: rem(20), height: rem(20) }} />),
                            value: 'apple'
                        },
                        {
                            label: (<IconBrandAndroid style={{ width: rem(20), height: rem(20) }} />),
                            value: 'android'
                        }
                    ]}
                    mr={'xs'}
                    value={device.device}
                    onChange={(e) => setDevice((prev: any) => ({
                        ...prev,
                        device: e
                    }))}
                />
            </Flex>}
        
            {(device.device == 'apple' && device.view == 'lock') && <>
                <AppleLock data={data} />
            </>}

            {(device.device == 'android' && device.view == 'lock') && <>
                <AndroidLock data={data} />
            </>}
        </Stack>
}

export default PreviewMobile;
