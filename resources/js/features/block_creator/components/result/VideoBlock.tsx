import { useState } from "react";
import { getHoverBlock, getShopName } from "@/features/helper/Index";

function VideoBlock({ res, shop, live }: any) {

    const [hover, setHover] = useState<boolean>(false);

    return <>
        {
            live ?
                <a key={res[getShopName(shop)].href} href={res[getShopName(shop)].link != null ? res[getShopName(shop)].link : '#'}>
                    <video
                        width="100%"
                        height="100%"
                        // controls
                        autoPlay
                        muted
                        loop
                    >
                        <source src={getHoverBlock(res[getShopName(shop)], hover)} type="video/mp4" />
                    </video>
                </a>
                :

                <video
                    key={res[getShopName(shop)].href}
                    width="100%"
                    height="100%"
                    // controls
                    autoPlay
                    muted
                    loop
                >
                    <source src={getHoverBlock(res[getShopName(shop)], hover)} type="video/mp4" />
                </video>

        }
    </>;
}

export default VideoBlock;