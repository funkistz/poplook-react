import { getShopName } from "@/features/helper/Index";
import { Box, Center } from "@mantine/core";
import { useState } from "react";
import { ImgBlock, VideoBlock } from "../../index";

function PreviewBlocks({ res, shop, defaultTitle, parentHeight, live = false, shopIndicator }: any) {

    const [hover, setHover] = useState<boolean>(false);


    const defaultPlaceHolder = (shops: any) => {
        return <Box w='100%' h={isNaN(parentHeight) ? 400 : parentHeight} mx="auto" style={{ background: 'linear-gradient(42deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)', position: 'relative' }} >
            {shops}
            <Center h='100%'>{defaultTitle ? defaultTitle : 'Dummy Child'}</Center>
        </Box>;
    }

    return (<>
        {
            (res[getShopName(shop)].href && res[getShopName(shop)].href != '') && <>
                <div style={{ position: 'relative', width: '100%', padding: 0, margin: 0 }}>
                    {
                        res[getShopName(shop)].type == 'image' && <>
                            <ImgBlock res={res} shop={shop} live={live} />
                            {shopIndicator}
                        </>
                    }

                    {
                        res[getShopName(shop)].type == 'video' && <>
                            <VideoBlock res={res} shop={shop} live={live} />
                            {shopIndicator}
                        </>
                    }
                </div>
            </>
        }
        {(!res[getShopName(shop)].href || res[getShopName(shop)].href == '') && defaultPlaceHolder(shopIndicator)}
    </>);
}

export default PreviewBlocks;