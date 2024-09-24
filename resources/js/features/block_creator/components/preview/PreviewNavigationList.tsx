import { Box} from "@mantine/core";
import { getShopName } from "@/features/helper/Index";
import { PreviewTextIconStyle } from "../../index";


function PreviewNavigationList({ res, shop, parentHeight, defaultTitle, live = false, shopIndicator }: any) {

    return (<>
        <Box w='100%' style={{ position: 'relative' }}>
            {shopIndicator}
            <PreviewTextIconStyle obj={res.labelObj} />

            {res.resource.map((nav: any, index: any) => {
                return <PreviewTextIconStyle obj={nav[getShopName(shop)].labelObj} key={index} />
            })}
        </Box>
    </>);
}

export default PreviewNavigationList;