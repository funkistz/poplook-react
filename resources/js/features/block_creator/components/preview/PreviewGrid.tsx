import { getShopName } from "@/features/helper/Index";
import { SimpleGrid, Box, Center, Flex } from "@mantine/core";
import React from "react";
import { ImgBlock, VideoBlock } from "../../index";


function PreviewGrid({ res, shop, parentHeight, live = false, shopIndicator }: any) {

    const defaultPlaceHolder = (i: any) => {
        return <Box key={i} w='100%' h={isNaN(parentHeight) ? 300 : (parentHeight / Math.ceil(res.resource.length / res.columnNo))} mx="auto" style={{ background: 'linear-gradient(42deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)' }}><Center h='100%'>{(i) ? 'Grid ' + i : 'Dummy Child'}</Center></Box>;
    }

    return <>
        <Flex w={'100%'}>
            <Flex style={{position: 'relative'}}>
                <SimpleGrid w='100%' h={'100%'} cols={res.columnNo} spacing={res.gridSpacing} verticalSpacing={res.gridSpacing}>
                    {res.resource.map((resource: any, i: any) => {
                        if (resource[getShopName(shop)].href && resource[getShopName(shop)].href != '') {
                            return <React.Fragment key={i}>
                                {
                                    resource[getShopName(shop)].type == 'image' && <>
                                        <ImgBlock res={resource} shop={shop} live={live} />
                                    </>
                                }

                                {
                                    resource[getShopName(shop)].type == 'video' && <>
                                        <VideoBlock res={resource} shop={shop} live={live} />
                                    </>
                                }
                            </React.Fragment>
                        } else {
                            return defaultPlaceHolder(i);
                        }
                    })}
                </SimpleGrid>
                {shopIndicator}
            </Flex>
        </Flex>
    </>;
}

export default PreviewGrid;