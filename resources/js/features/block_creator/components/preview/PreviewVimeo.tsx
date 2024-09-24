import { getShopName } from "@/features/helper/Index";
import { Box, Center } from "@mantine/core";
import ReactPlayer from "react-player"


function PreviewVimeo({ res, shop, parentHeight, live = false }: any) {

    const defaultPlaceHolder = () => {
        return <Box w='100%' h={isNaN(parentHeight) ? 400 : parentHeight} mx="auto" style={{ background: 'linear-gradient(42deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)' }}>
            <Center h='100%'>Embedded</Center>
        </Box>;
    }

    return (<>
        {(res.resource[getShopName(shop)].href == null || res.resource[getShopName(shop)].href == '') ?
                defaultPlaceHolder() :
                <ReactPlayer
                    url={res.resource[getShopName(shop)].href}
                    controls={res.controls}
                    muted={res.muted}
                    loop={res.loop}
                    playing={res.autoplay}
                    width={'100%'}
                />}
    </>);
}

export default PreviewVimeo;