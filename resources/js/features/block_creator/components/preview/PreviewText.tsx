import { getShopName } from "@/features/helper/Index";
import { Flex } from "@mantine/core";
import { PreviewTextIconStyle } from "../../index";

function PreviewText({ res, shop, shopIndicator }: any) {
    return <>
        <Flex w={'100%'} direction={'column'}>
            <Flex direction={'column'} w={'100%'}>{shopIndicator}</Flex>
            <Flex w={'100%'} justify={res[getShopName(shop)].labelObj?.align} style={{ position: 'relative' }}>
                <PreviewTextIconStyle obj={res[getShopName(shop)].labelObj} />
            </Flex>
        </Flex>

    </>;
}

export default PreviewText;
