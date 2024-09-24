export default function getShopName(shop: Number, full = false) {
    if (shop == 2) {
        return full ? 'Singapore' : 'sgd';
    } else if (shop == 3) {
        return full ? 'International' : 'usd';
    } else {
        return full ? 'Malaysia' : 'myr';
    }
}

export function getShopUrl(shop: number) {
    if (shop == 2) {
        return 'sgd';
    } else if (shop == 3) {
        return 'int';
    }

    return 'en';
}

export function getLoyaltyName(loyalty: Number) {
    if (loyalty == 1 || loyalty == 5) {
        return 'Bronze';
    } else if (loyalty == 2 || loyalty == 6) {
        return 'Silver';
    } else if (loyalty == 3 || loyalty == 7) {
        return 'Gold';
    } else {
        return '-';
    }
}

export function getCurrency(shop: Number) {
    if (shop == 2) {
        return 'S$ ';
    } else if (shop == 3) {
        return '$ ';
    } else {
        return 'RM ';
    }
}