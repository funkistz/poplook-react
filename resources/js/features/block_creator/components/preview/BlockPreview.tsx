import { Flex, Stack } from "@mantine/core";
import { PreviewBlock, PreviewCarousel, PreviewGrid, PreviewNavigation, PreviewText, PreviewVimeo } from "../../index";
import { getShopName } from "@/features/helper/Index";

export default function BlockPreview({ block, shop }: any) {

    const getChildWidth = (col: any) => {
        if (col.type == '%') {
            return col.value + '%';
        } else if (col.type == 'px') {
            return col.value + 'px';
        } else if (col.type == 'auto') {
            return 'auto';
        } else {
            return 'auto';
        }
    }

    return (
        <>
            {block && block.length > 0 &&
                <Flex justify={'left'} w={'100%'} style={{ backgroundColor: '#fff' }}>
                    <Stack style={{ overflow: 'scroll', backgroundColor: '#fff' }} w={'100%'} m={0} p={0} gap={2}>
                        {block.map((resParent: any, index: any) => {

                            if (resParent.shops && !resParent.shops.includes(getShopName(shop))) {
                                return;
                            }

                            return (
                                <Flex align="center" key={index}>
                                    <Flex
                                        direction={resParent.flex.direction}
                                        wrap={resParent.flex.wrap}
                                        justify={resParent.flex.justifyContent}
                                        key={index}
                                        bg={resParent.backgroundColor}
                                        w={'100%'}
                                        pt={resParent.padding.top}
                                        pb={resParent.padding.bottom}
                                        pr={resParent.padding.right}
                                        pl={resParent.padding.left}
                                        h={resParent.height}>

                                        {resParent.children != null &&
                                            <>
                                                {resParent.children.map((res: any, childIndex: any) => {

                                                    if (res.shops && !res.shops.includes(getShopName(shop))) {
                                                        return;
                                                    }

                                                    return (
                                                        <Flex
                                                            align="flex-start"
                                                            key={childIndex}
                                                            bg={res.backgroundColor}
                                                            w={getChildWidth(res.col)}
                                                            style={res.col.type == 'flexGrow' ? { flexGrow: res.col.value } : {}}
                                                            pt={res.padding.top}
                                                            pb={res.padding.bottom}
                                                            pr={res.padding.right}
                                                            pl={res.padding.left}
                                                            h={res.height}
                                                        >
                                                            {res.block.type == 'block' && <PreviewBlock shop={shop} res={res.block.resource} defaultTitle={'Child ' + (Number(childIndex) + 1)} parentHeight={res.height}></PreviewBlock>}

                                                            {res.block.type == 'grid' && <PreviewGrid shop={shop} res={res.block} parentHeight={res.height} />}

                                                            {(res.block.type == "carousel" || res.block.type == "slider") && <PreviewCarousel shop={shop} res={res.block} />}

                                                            {/* {res.block.type == 'product_list' && <PreviewProductList res={res.block.productList} shop={shop}></PreviewProductList>} */}

                                                            {res.block.type == 'navigation_list' && <PreviewNavigation res={res.block} shop={shop} />}

                                                            {res.block.type == 'vimeo' && <PreviewVimeo res={res.block} shop={shop} />}

                                                            {res.block.type == 'text' && <PreviewText res={res.block.resource} shop={shop} />}
                                                        </Flex>
                                                    )
                                                })}
                                            </>
                                        }
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Stack >
                </Flex >}
        </>
    )
}
