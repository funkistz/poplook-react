export default function hoverBlock(item: any, hover: boolean) {
    if (!item.isHoverHref) {
        return item.href;
    }

    if (item.hoverHrefUrl == null || item.hoverHrefUrl.length == 0) {
        return item.href;
    }

    if (hover) {
        if (item.hoverHrefUrl != null || item.hoverHrefUrl.length > 0) {
            return item.hoverHrefUrl;
        }

        return item.href;


    }

    return item.href;
};

export function isImageOrVideo(item: any) {
    const img = "uploads/image";
    const vid = "uploads/video";

    if (item.length == 0) {
        return null;
    }

    if (item.match(img)) {
        return 'image';
    }

    if (item.match(vid)) {
        return 'video';
    }

    return null;
}