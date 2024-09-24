import { getShopName } from "@/features/helper/Index";
import { Text, Box, Flex } from "@mantine/core";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { ImgBlock, VideoBlock } from "../../index";



function PreviewCountdown({ res, shop, live = false, shopIndicator }: any) {

    const classes: any = {
        timer: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            top: 0,
        },
        text: {
            background: '#f1f3f5',
            borderRadius: 5,
        }
    };

    const defaultPlaceHolder = (shops: any) => {
        return <Box w='100%' h={400} mx="auto" style={{ background: 'linear-gradient(42deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)', position: 'relative' }}>
            {shops}
            {timer()}
        </Box>;
    }

    const position = (data: any) => {
        if (data == 1) {
            return {
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }
        } else if (data == 2) {
            return {
                justifyContent: 'center',
                alignItems: 'flex-start',
            }
        } else if (data == 3) {
            return {
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
            }
        } else if (data == 4) {
            return {
                justifyContent: 'flex-start',
                alignItems: 'center',
            }
        } else if (data == 5) {
            return {
                justifyContent: 'center',
                alignItems: 'center',
            }
        } else if (data == 6) {
            return {
                justifyContent: 'flex-end',
                alignItems: 'center',
            }
        } else if (data == 7) {
            return {
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
            }
        } else if (data == 8) {
            return {
                justifyContent: 'center',
                alignItems: 'flex-end',
            }
        } else if (data == 9) {
            return {
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }
        } else {
            return {
                display: 'none'
            }
        }
    }

    const timer = () => {
        return <Flex
            style={{ ...classes.timer, ...position(res.position) }}
        >
            <Flex
                direction={'row'}
                align={'center'}
                pt={res.paddingTop + '%'}
                pr={res.paddingRight + '%'}
                pb={res.paddingBottom + '%'}
                pl={res.paddingLeft + '%'}
            >
                {
                    res.end_at != null ?
                        (new Date(res.end_at) >= new Date()) ?
                            <FlipClockCountdown
                                to={new Date(res.end_at).getTime()}
                                labelStyle={{
                                    fontSize: res.labelSize,
                                    color: res.labelColor,
                                }}
                                renderMap={[true, true, true, true]}
                                digitBlockStyle={{
                                    color: res.fontColor,
                                    width: 20,
                                    height: 20,
                                    fontSize: res.fontSize,
                                    background: res.panelColor,
                                }}
                                separatorStyle={{ size: 0 }}
                                showLabels={res.labelShow ? true : false}
                                showSeparators={false}
                            />
                            :
                            <Flex bg={'#fff'} px={10} style={{ borderRadius: 5 }}>
                                <Text size={'xs'}>Countdown end at</Text>
                            </Flex>
                        :
                        <Flex px={10} style={{ borderRadius: 5 }}>
                            Countdown date undefined
                        </Flex>
                }
            </Flex>
        </Flex>
    }

    return (<>
        {
            (res.resource[getShopName(shop)].href && res.resource[getShopName(shop)].href != '') && <>
                <div style={{ position: 'relative', width: '100%', padding: 0, margin: 0 }}>
                    {
                        res.resource[getShopName(shop)].type == 'image' && <>
                            <ImgBlock res={res.resource} shop={shop} live={live} />
                            {shopIndicator}
                            {timer()}
                        </>
                    }

                    {
                        res.resource[getShopName(shop)].type == 'video' && <>
                            <VideoBlock res={res.resource} shop={shop} live={live} />
                            {shopIndicator}
                            {timer()}
                        </>
                    }
                </div>
            </>
        }
        {(!res.resource[getShopName(shop)].href || res.resource[getShopName(shop)].href == '') && defaultPlaceHolder(shopIndicator)}
    </>);
}

export default PreviewCountdown;