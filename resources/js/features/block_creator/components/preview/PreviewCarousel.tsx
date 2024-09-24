import { getShopName } from "@/features/helper/Index";
import { Carousel } from "@mantine/carousel";
import {  Box, Center, Text, Flex } from "@mantine/core";
import { useEffect, useRef } from "react";
import Autoplay from 'embla-carousel-autoplay'
import { ImgBlock, PreviewTextIconStyle, VideoBlock } from "../../index";

function PreviewCarousel({ res, shop, parentHeight, defaultTitle, live = false, shopIndicator, shopIndicatorFloat = false }: any) {


    const autoplay = useRef(Autoplay({ delay: res.autoPlay ? res.autoPlay * 1000 : 0, playOnInit: res.autoPlay ? true : false }));
    useEffect(() => {
        autoplay.current = Autoplay({ delay: res.autoPlay ? res.autoPlay * 1000 : 0, playOnInit: res.autoPlay ? true : false });
    }, [res.autoPlay]);

    const defaultPlaceHolder = (title: any, obj: any) => {
        return <>
            <Box w='100%' h={isNaN(parentHeight) ? 400 : parentHeight} mx="auto" style={{ background: 'linear-gradient(42deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)', position: 'relative' }}>
                <Center h='100%'>{defaultTitle ? defaultTitle : title}</Center>
            </Box>
            {
                !!obj &&
                <Text
                    my={10}
                    size={obj.size}
                    ta={obj.align}
                    c={obj.color}
                    fs={obj.fontStyle}
                    fw={obj.bold}
                    tt={obj.transform}
                    td={obj.textDecoration}
                    style={{ letterSpacing: obj.letterSpacing, lineHeight: 'normal' }}
                >
                    {obj.content}
                </Text>
            }
        </>;
    }

    return (<>
        <Box w='100%' style={{ position: 'relative' }}>
            {shopIndicatorFloat && shopIndicator}
            {
                !!res.labelObj && !!res.labelObj.content &&
                <Flex justify={res.labelObj.align}>
                    <PreviewTextIconStyle
                        obj={res.labelObj}
                    />
                </Flex>
            }
            <Carousel
                // align={res.align ? res.align : 'start'} // Preview Bug not slide 100%
                align={'start'}
                slideSize={res.slideSize ? res.slideSize + '%' : '100%'}
                slideGap={res.slideGap ? res.slideGap : 0}
                withIndicators={res.withIndicators}
                withControls={res.withControls}
                loop={res.loop}
                dragFree={res.dragFree}
                draggable={res.draggable}
                height={'100%'}
                w='100%'
                plugins={[autoplay.current]}
            // onMouseEnter={autoplay.current.stop}
            // onMouseLeave={autoplay.current.reset}
            >
                {res.resource.map((item: any, i: any) => {
                    return <Carousel.Slide key={i} h={'100%'}>

                        {
                            (item[getShopName(shop)].href && item[getShopName(shop)].href != '') && <>
                                {
                                    item[getShopName(shop)].type == 'image' && <>
                                        <ImgBlock res={item} shop={shop} live={live} />
                                    </>
                                }

                                {
                                    item[getShopName(shop)].type == 'video' && <>
                                        <VideoBlock res={item} shop={shop} live={live} />
                                    </>
                                }

                                {
                                    !!item[getShopName(shop)].labelObj && !!item[getShopName(shop)].labelObj.content &&
                                    <>
                                        <Flex justify={item[getShopName(shop)].labelObj.align}>
                                            <PreviewTextIconStyle
                                                obj={item[getShopName(shop)].labelObj}
                                            />
                                        </Flex>
                                    </>

                                }
                            </>
                        }
                        {(!item[getShopName(shop)].href || item[getShopName(shop)].href == '') && defaultPlaceHolder(i + 1, item[getShopName(shop)].labelObj)}
                    </Carousel.Slide>
                })}
            </Carousel>
            {!shopIndicatorFloat && shopIndicator}
        </Box>
    </>);
}

export default PreviewCarousel;