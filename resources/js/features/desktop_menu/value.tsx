import { defaultNavigationListResource, defaultTextWithStyle } from "../block_creator/values"

export const defaultMenuParent: any = {
    name: "Menu",
    show_all_button: true,
    active: true,
    resource: {
        myr: { ...defaultNavigationListResource, labelObj: { ...defaultTextWithStyle, content: 'link' } },
        sgd: { ...defaultNavigationListResource, labelObj: { ...defaultTextWithStyle, content: 'link' } },
        usd: { ...defaultNavigationListResource, labelObj: { ...defaultTextWithStyle, content: 'link' } },
    },
    shops: ['myr', 'sgd', 'usd'],
    block: null,
}

export const defaultMenuMobileParent: any = {
    name: "Menu",
    show_all_button: true,
    active: true,
    resource: {
        myr: { ...defaultNavigationListResource, labelObj: { ...defaultTextWithStyle, color: '#fff', content: 'link' } },
        sgd: { ...defaultNavigationListResource, labelObj: { ...defaultTextWithStyle, color: '#fff', content: 'link' } },
        usd: { ...defaultNavigationListResource, labelObj: { ...defaultTextWithStyle, color: '#fff', content: 'link' } },
    },
    shops: ['myr', 'sgd', 'usd'],
    block: null,
}