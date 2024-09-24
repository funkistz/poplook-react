import { Flex,Text, Box, Center } from "@mantine/core";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getShopName } from "@/features/helper/Index";
import { ImgBlock, PreviewTextIconStyle } from "../../index";
import { usePage } from "@inertiajs/react";

function PreviewProductList({ res, shop, parentHeight, defaultTitle, live = false, shopIndicator, shopIndicatorFloat = false }: any) {

    // Define
    const [api, setApi] = useState<any>([]);
    const { env, apiKey } = usePage<any>().props;
    // const domain = env ? env : 'https://poplook.com/';

    // Get API
    const getProductList = async () => {
        try {
            const categoryId = res.category?.id ? res.category?.id : null;
            const params = {
                num_page: res.numPage,
                num_list: res.numList,
                sort_options: res.sortOption,
                shop: shop,
                api_version: 'apps'
            }

            if (categoryId != null) {
                // const response = await axios.get(domain + 'webapi/Products/category/id/' + categoryId + '?apikey=PL%3A%40KrAk!fA9RpGDcnIfDKzljGkEqW48yU4M6Y2GckgawSVbEg62FHKHBU7awnidFZ4wxVxUdcTAvkxT1GrlVhuZ1dKlqzl9zlsedD66G', { params: params });
                const response = await axios.get(env + 'Products/category/id/' + categoryId + '?apikey=' + apiKey, { params: params });
                apiToResource(response.data, res)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (res.type == 'product_list') {
            getProductList();
        }
    }, [])

    useEffect(() => {
        if (res.type == 'product_list') {
            getProductList();
        }
    }, [res, shop])

    const autoplay = useRef(Autoplay({ delay: 5000, playOnInit: false }));

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
                    style={{ letterSpacing: obj.letterSpacing }}
                >
                    {obj.content}
                </Text>
            }
        </>;
    }

    const apiToResource = (result: any, item: any) => {
        const data = result.data;
        const apiResult = data.map((res: any, index: any) => {
            return {
                type: 'image',
                href: res.image_url[0],
                hoverHrefUrl: res.image_url[1],
                isHoverHref: true,
                internalLink: false,
                link: res.link,
                linkData: {
                    type: 'category',
                    id: item.category?.id,
                    name: res.name,
                },
                labelObj: {
                    icon: item.labelResourceObj.icon,
                    content: '<p>' + res.name + '<br>' + result.currency.prefix + res.price_tax_inc + '</p>',
                    size: item.labelResourceObj.size,
                    bold: item.labelResourceObj.bold,
                    textDecoration: item.labelResourceObj.textDecoration,
                    color: item.labelResourceObj.color,
                    align: item.labelResourceObj.align,
                    transform: item.labelResourceObj.transform,
                    fontFamily: item.labelResourceObj.fontFamily,
                    fontStyle: item.labelResourceObj.fontStyle,
                    letterSpacing: item.labelResourceObj.letterSpacing
                }
            }
        })
        setApi(apiResult)
    }

    return (<>
        <Box w='100%' style={{ position: 'relative' }}>
            {shopIndicatorFloat && shopIndicator}
            {!!res.labelObj && !!res.labelObj.content &&
                <Flex justify={res.labelObj.align}>
                    <PreviewTextIconStyle
                        obj={res.labelObj}
                    />
                </Flex>}
            <Carousel
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
                // plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
            >
                {res.category != null ?
                    <>
                        {api.map((res: any, index: any) => {
                            return <Carousel.Slide key={index} h={'100%'}>
                                <ImgBlock res={res} live={live} noShop={false} />
                                {
                                    !!res.labelObj && !!res.labelObj.content &&
                                    <>
                                        <Flex justify={res.labelObj.align}>
                                            <PreviewTextIconStyle
                                                obj={res.labelObj}
                                            />
                                        </Flex>
                                    </>
                                }
                            </Carousel.Slide>
                        })}
                    </>
                    :
                    res.resource.map((item: any, i: any) => {
                        return <Carousel.Slide key={i} h={'100%'}>
                            {(!item[getShopName(shop)].href || item[getShopName(shop)].href == '') && defaultPlaceHolder(i + 1, item[getShopName(shop)].labelObj)}
                        </Carousel.Slide>
                    })
                }
            </Carousel>
            {!shopIndicatorFloat && shopIndicator}
        </Box>
    </>);
}

export default PreviewProductList;

