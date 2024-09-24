// import { templateValue } from './template_values';

// Default Resource
export const defaultLinkData: any = {
    type: 'category', // category or product
    id: null,
    name: ''
}
export const defaultIcon: any = {
    isShow: false, // is show or not
    href: "", // url icon
    position: "left", // left or right
    size: 10, // size icon
    gap: 10, // gap icon
}
export const defaultTextWithStyle: any = {
    icon: { ...defaultIcon },
    content: '',
    size: 14,
    bold: 400,
    textDecoration: 'none',
    color: '#000',
    align: 'left',
    transform: 'none',
    fontFamily: null,
    fontStyle: 'normal',
    letterSpacing: 0,
}
export const defaultResource: any = {
    type: null, // img or video
    href: null, // url img or video
    hoverHrefUrl: null, // url img or video
    isHoverHref: false, // isChangeHref?
    internalLink: true, // using internal link or external
    link: "", // link clicked
    linkData: { ...defaultLinkData },
    labelObj: { ...defaultTextWithStyle }, // label obj
    isNewTab: false
};
export const defaultNavigationListResource: any = {
    type: "link",
    linkData: { ...defaultLinkData },
    internalLink: true,
    link: "",
    labelObj: { ...defaultTextWithStyle, content: 'link' },
    isNewTab: false
};

// Default Block
export const defaultBlock: any = {
    type: "block",
    multiShop: false,
    resource: {
        myr: { ...defaultResource },
        sgd: { ...defaultResource },
        usd: { ...defaultResource },
    }
}
export const defaultBlockNavigationList: any = {
    type: "navigation_list",
    navigation_type: "list",
    multiShop: false,
    resource: [
        {
            myr: { ...defaultNavigationListResource },
            sgd: { ...defaultNavigationListResource },
            usd: { ...defaultNavigationListResource },
        },
        {
            myr: { ...defaultNavigationListResource },
            sgd: { ...defaultNavigationListResource },
            usd: { ...defaultNavigationListResource },
        },
        {
            myr: { ...defaultNavigationListResource },
            sgd: { ...defaultNavigationListResource },
            usd: { ...defaultNavigationListResource },
        },
        {
            myr: { ...defaultNavigationListResource },
            sgd: { ...defaultNavigationListResource },
            usd: { ...defaultNavigationListResource },
        }
    ],
    labelObj: {
        ...defaultTextWithStyle,
        content: 'navigation',
        size: 14,
        bold: 700,
        transform: 'capitalize',
    },
    labelResourceObj: { ...defaultTextWithStyle, content: 'link' }
}
export const defaultBlockCarousel: any = {
    type: "carousel",
    multiShop: false,
    resource: {
        myr: { ...defaultResource },
        sgd: { ...defaultResource },
        usd: { ...defaultResource },
    },
    slideSize: 100,
    slideGap: 0,
    withIndicators: true,
    withControls: true,
    loop: false,
    dragFree: false,
    draggable: true,
    autoPlay: null,
    labelObj: { ...defaultTextWithStyle },
    labelResourceObj: { ...defaultTextWithStyle }
}
export const defaultBlockSlider: any = {
    type: "slider",
    multiShop: false,
    resource: {
        myr: { ...defaultResource },
        sgd: { ...defaultResource },
        usd: { ...defaultResource },
    },
    slideSize: 40,
    slideGap: 10,
    withIndicators: false,
    withControls: false,
    loop: false,
    dragFree: true,
    draggable: true,
    labelObj: { ...defaultTextWithStyle },
    labelResourceObj: { ...defaultTextWithStyle }
}
export const defaultBlockGrid: any = {
    type: "grid",
    multiShop: false,
    resource: {
        myr: { ...defaultResource },
        sgd: { ...defaultResource },
        usd: { ...defaultResource },
    },
    columnNo: 2,
    gridSpacing: 0,
}
export const defaultBlockVimeo: any = {
    type: "vimeo",
    multiShop: false,
    resource: {
        myr: { ...defaultResource },
        sgd: { ...defaultResource },
        usd: { ...defaultResource },
    },
    muted: true,
    loop: true,
    autoplay: true,
    controls: false,
}
export const defaultBlockText: any = {
    type: "text",
    multiShop: false,
    resource: {
        myr: { ...defaultResource, labelObj: { ...defaultTextWithStyle, content: 'lorem ipsum' } },
        sgd: { ...defaultResource, labelObj: { ...defaultTextWithStyle, content: 'lorem ipsum' } },
        usd: { ...defaultResource, labelObj: { ...defaultTextWithStyle, content: 'lorem ipsum' } },
    }
}
export const defaultBlockCountdown: any = {
    type: "countdown",
    multiShop: false,
    resource: {
        myr: { ...defaultResource },
        sgd: { ...defaultResource },
        usd: { ...defaultResource },
    },
    start_at: null,
    end_at: null,
    position: 5,
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingRight: 0,
    timerSize: 13, // 20% = percentage
    categoryId: [],
    fontSize: 13,
    fontColor: '#fff',
    panelColor: '#3b3d3b',
    panelObj: { ...defaultTextWithStyle },
    labelSize: 13,
    labelColor: '#000',
    labelShow: true,
    labelObj: { ...defaultTextWithStyle },
    CornerRadius: 5,
}
export const defaultBlockProductList: any = {
    type: "product_list",
    multiShop: false,
    resource: {
        myr: { ...defaultResource },
        sgd: { ...defaultResource },
        usd: { ...defaultResource },
    },
    align: 'start',
    slideSize: 30,
    slideGap: 10,
    withIndicators: false,
    withControls: false,
    loop: false,
    dragFree: true,
    draggable: true,
    // label: '',
    // labelFontSize: 13,
    labelObj: { ...defaultTextWithStyle },
    labelResourceObj: { ...defaultTextWithStyle },
    category: null,
    numList: 20,
    numPage: 1,
    sortOption: 0,

}

// Default Parent
export const defaultParent: any = {
    name: "Block",
    height: "auto",
    backgroundColor: "#fff",
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    flex: {
        direction: "column",
        wrap: "wrap",
        justifyContent: "center"
    },
    shops: ['myr', 'sgd', 'usd'],
    children: null
}
export const defaultChild: any = {
    name: 'Details',
    height: 'auto',
    backgroundColor: "#fff",
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    col: {
        value: 100,
        type: "%"
    },
    shops: ['myr', 'sgd', 'usd'],
    block: { ...defaultBlock }
}
export const defaultMenu: any = {
    name: "Menu",
    show_all_button: true,
    active: true,
    resource: {
        myr: defaultNavigationListResource,
        sgd: defaultNavigationListResource,
        usd: defaultNavigationListResource
    },
    shops: ['myr', 'sgd', 'usd'],
    block: []
}

// Default Children
export const defaultNavigationList: any = {
    ...defaultChild,
    name: 'Navigation',
    col: {
        value: 0,
        type: "auto"
    },
    padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20,
    },
    block: { ...defaultBlockNavigationList }
}
export const defaultCarouselList: any = {
    ...defaultChild,
    name: 'Carousel',
    block: { ...defaultBlockCarousel }
}
export const defaultSliderList: any = {
    ...defaultChild,
    name: 'Slider',
    block: { ...defaultBlockSlider }
}
export const defaultGrid: any = {
    ...defaultChild,
    name: 'Grid',
    block: { ...defaultBlockGrid }
}
export const defaultVimeo: any = {
    ...defaultChild,
    name: 'Vimeo',
    block: { ...defaultBlockVimeo }
}
export const defaultText: any = {
    ...defaultChild,
    name: 'Text',
    padding: {
        top: 20,
        right: 0,
        bottom: 20,
        left: 0,
    },
    block: { ...defaultBlockText }
}
export const defaultCountdownBanner: any = {
    ...defaultChild,
    name: 'Countdown Banner',
    padding: {
        top: 20,
        right: 0,
        bottom: 20,
        left: 0,
    },
    block: { ...defaultBlockCountdown }
}
export const defaultProductList: any = {
    ...defaultChild,
    name: 'Product List',
    block: { ...defaultBlockProductList }
}

// Create New Row
export const defaultData: any = {
    block: [
        {
            col: 1,
            data: null,
            title: "Image or Video",
            type: "block"
        }
    ],
    grid: [
        {
            col: 1,
            row: 1,
            title: "1x1",
            type: "grid"
        },
        {
            col: 2,
            row: 1,
            title: "1x2",
            type: "grid"
        },
        {
            col: 3,
            row: 1,
            title: "1x3",
            type: "grid"
        },
        {
            col: 4,
            row: 1,
            title: "1x4",
            type: "grid"
        },
        {
            col: 1,
            row: 2,
            title: "2x1",
            type: "grid"
        },
        {
            col: 2,
            row: 2,
            title: "2x2",
            type: "grid"
        },
        {
            col: 3,
            row: 2,
            title: "2x3",
            type: "grid"
        },
        {
            col: 4,
            row: 2,
            title: "2x4",
            type: "grid"
        },
        {
            col: 1,
            row: 3,
            title: "3x1",
            type: "grid"
        },
        {
            col: 2,
            row: 3,
            title: "3x2",
            type: "grid"
        },
        {
            col: 3,
            row: 3,
            title: "3x3",
            type: "grid"
        },
        {
            col: 4,
            row: 3,
            title: "3x4",
            type: "grid"
        }
    ],
    single: {
        ...defaultParent,
        name: 'New Block',
        children: [{ ...defaultChild }]
    },
    customGrid: {
        ...defaultParent,
        name: 'New Grid',
        children: [{
            ...defaultGrid,
            block: {
                ...defaultBlockGrid,
                resource: [
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    }
                ]
            }
        }]
    },
    carousel: {
        ...defaultParent,
        name: 'New Carousel',
        children: [{
            ...defaultCarouselList,
            block: {
                ...defaultBlockCarousel,
                resource: [
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    }
                ]
            }
        }]
    },
    slider: {
        ...defaultParent,
        name: 'New Slider',
        children: [{
            ...defaultSliderList,
            block: {
                ...defaultBlockSlider,
                resource: [
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    }
                ]
            }
        }]
    },
    productList: {
        ...defaultParent,
        name: 'New Product List',
        children: [{
            ...defaultProductList,
            block: {
                ...defaultBlockProductList,
                resource: [
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    },
                    {
                        myr: { ...defaultResource },
                        sgd: { ...defaultResource },
                        usd: { ...defaultResource },
                    }
                ]
            }
        }]
    },
    text: {
        ...defaultParent,
        name: 'New Text',
        children: [{ ...defaultText }]
    },
    navigationList: {
        ...defaultParent,
        name: 'New Navigation List',
        children: [{
            ...defaultNavigationList,
            block: { ...defaultBlockNavigationList }
        }]
    },
    countdown: {
        ...defaultParent,
        name: 'New Countdown',
        children: [{
            ...defaultCountdownBanner,
            block: { ...defaultBlockCountdown }
        }]
    },
    vimeo: {
        ...defaultParent,
        name: 'New Vimeo',
        children: [{
            ...defaultVimeo,
            block: { ...defaultBlockVimeo }
        }]
    },
    template: [
        {
            title: 'Complex Menu',
            img: 'Images/complexMenu.png',
            type: 'template',
            data: [{
                ...defaultParent,
                name: "Complex Menu",
                flex: {
                    direction: 'row',
                    wrap: 'nowrap',
                    justifyContent: 'center'
                },
                children: [
                    {
                        ...defaultNavigationList,
                    },
                    {
                        ...defaultNavigationList
                    },
                    {
                        ...defaultChild,
                        col: {
                            value: 30,
                            type: "%"
                        },
                    }
                ]
            }]
        },
        {
            title: 'Simple Grid',
            img: 'Images/simplegrid.png',
            type: 'template',
            data: [{
                ...defaultParent,
                name: "Simple Grid Menu",
                padding: {
                    top: 0,
                    right: 70,
                    bottom: 0,
                    left: 70,
                },
                flex: {
                    direction: 'row',
                    wrap: 'wrap',
                    justifyContent: 'center'
                },
                children: [{
                    ...defaultGrid,
                    col: {
                        value: 75,
                        type: "%"
                    },
                    block: {
                        ...defaultBlockGrid,
                        resource: [
                            {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }
                        ],
                        columnNo: 3,
                        gridSpacing: 20,
                    }
                }]

            }]
        },
        {
            title: '4 Column',
            img: 'Images/grid.png',
            type: 'template',
            data: [{
                ...defaultParent,
                name: "4 Column",
                padding: {
                    top: 0,
                    right: 70,
                    bottom: 0,
                    left: 70,
                },
                flex: {
                    direction: 'row',
                    wrap: 'wrap',
                    justifyContent: 'center'
                },
                children: [{
                    ...defaultGrid,
                    block: {
                        ...defaultBlockGrid,
                        resource: [
                            {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }
                        ],
                        columnNo: 4,
                        gridSpacing: 10,
                    }
                }]
            }]
        },
        {
            title: 'Navigation Desktop',
            img: 'Images/list.png',
            type: 'template',
            data: [{
                ...defaultParent,
                name: "Navigation Desktop",
                flex: {
                    direction: 'row',
                    wrap: 'wrap',
                    justifyContent: 'center'
                },
                children: [
                    { ...defaultNavigationList },
                    { ...defaultNavigationList },
                    { ...defaultNavigationList },
                    { ...defaultNavigationList },
                    { ...defaultNavigationList },
                    { ...defaultNavigationList },

                ]
            }]
        },
        {
            title: 'Navigation Mobile',
            img: 'Images/navigation_mobile.jpg',
            type: 'template',
            data: [{
                ...defaultParent,
                name: "Navigation Desktop",
                flex: {
                    direction: 'row',
                    wrap: 'wrap',
                    justifyContent: 'center'
                },
                children: [{
                    ...defaultSliderList,
                    block: {
                        ...defaultBlockSlider,
                        resource: [
                            {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }, {
                                myr: { ...defaultResource },
                                sgd: { ...defaultResource },
                                usd: { ...defaultResource },
                            }
                        ]
                    }
                }]
            }]
        }
    ],
    // template: templateValue,
}
