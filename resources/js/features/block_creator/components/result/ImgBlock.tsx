import { useState } from "react";
import { Image } from "@mantine/core";
import { getHoverBlock, getShopName } from "@/features/helper/Index";

function ImgBlock({ res, shop, live, noShop = true }: any) {

    const [hover, setHover] = useState<boolean>(false);

    return <>
        {!noShop ?
            live ?
                <a href={res.link != null ? res.link : '#'} >
                    <Image
                        src={getHoverBlock(res, hover)}
                        onMouseOver={(e) => setHover(true)}
                        onMouseOut={(e) => setHover(false)}
                    />
                </a >
                :
                <Image
                    src={getHoverBlock(res, hover)}
                    onMouseOver={(e) => setHover(true)}
                    onMouseOut={(e) => setHover(false)}
                />
            :

            live ?
                <a href={res[getShopName(shop)].link != null ? res[getShopName(shop)].link : '#'} >
                    <Image
                        src={getHoverBlock(res[getShopName(shop)], hover)}
                        onMouseOver={(e) => setHover(true)}
                        onMouseOut={(e) => setHover(false)}
                    />
                </a >
                :
                <Image
                    src={getHoverBlock(res[getShopName(shop)], hover)}
                    onMouseOver={(e) => setHover(true)}
                    onMouseOut={(e) => setHover(false)}
                />
        }


    </>;
}

export default ImgBlock;