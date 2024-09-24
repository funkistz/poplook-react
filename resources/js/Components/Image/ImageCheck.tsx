
import { router } from '@inertiajs/react';
import { IconArrowsSort, IconSearch, IconSortAscending, IconSortDescending, IconX } from '@tabler/icons-react';
import { useDidUpdate } from '@mantine/hooks';
import { Image } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function ImageCheck({ options }: any) {
    const [imageSrc, setImageSrc] = useState<any>(false);
    const [imageUrl, setImageUrl] = useState<any>('');

    // const url = options.href;

    // if(options.hrrf == probmdkfm){

    // }
    useEffect(() => {
        var http = new XMLHttpRequest();

        http.open('HEAD', options.src, false);
        http.send();
        // console.log(http);
        if (http.status == 404) {
            setImageSrc(true);
            // console.log(imageUrl);
        }else{
            setImageUrl(options.src);
            // console.log(imageUrl);
        }
    })

    
    return {...imageSrc == false ? <Image
            {...options}
            src={imageUrl}
        // fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        /> : <Image
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
    }


}