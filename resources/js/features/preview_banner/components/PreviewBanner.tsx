import { PreviewBlock, PreviewCarousel, PreviewCountdown, PreviewGrid, PreviewNavigation, PreviewText, PreviewVimeo } from '@/features/block_creator';
import { Flex } from '@mantine/core'

function PreviewDesktopBanner({ json, shop }: any) {

    return (
        <>
            {json != null && json.map((resParent: any, i: any) => {
                return <Flex
                    key={i}
                    direction={resParent.flex.direction}
                    wrap={resParent.flex.wrap}
                    justify={resParent.flex.justifyContent}
                    bg={resParent.backgroundColor}
                    w={'100%'}
                    pt={resParent.padding.top}
                    pb={resParent.padding.bottom}
                    pr={resParent.padding.right}
                    pl={resParent.padding.left}
                    h={resParent.height}
                >
                    {resParent.children != null &&
                        <>
                            {resParent.children.map((res: any, childIndex: any) => {

                                const flexStyle = res.col.type == 'flexGrow' ? { flexGrow: res.col.value } : {};
                                const childrenStyles: any = {
                                    ...classes.children,
                                    ...flexStyle
                                };

                                return (
                                    <Flex align="center"
                                        bg={res.backgroundColor}
                                        w={res.col.type == '%' ? res.col.value + '%' : res.col.type == 'px' ? res.col.value : undefined}
                                        style={childrenStyles}
                                        pt={res.padding.top}
                                        pb={res.padding.bottom}
                                        pr={res.padding.right}
                                        pl={res.padding.left}
                                        h={res.height}
                                        key={childIndex}
                                    >

                                        {res.block.type == 'block' && <PreviewBlock shop={shop} res={res.block.resource} defaultTitle={'Child ' + (Number(childIndex) + 1)} parentHeight={res.height} />}

                                        {res.block.type == 'grid' && <PreviewGrid shop={shop} res={res.block} parentHeight={res.height} />}

                                        {(res.block.type == "carousel" || res.block.type == "slider") && <PreviewCarousel shop={shop} res={res.block} />}

                                        {res.block.type == 'navigation_list' && <PreviewNavigation res={res.block} shop={shop} />}

                                        {res.block.type == 'vimeo' && <PreviewVimeo res={res.block} shop={shop} />}

                                        {res.block.type == 'text' && <PreviewText res={res.block.resource} shop={shop} />}

                                        {res.block.type == 'countdown' && <PreviewCountdown res={res.block} shop={shop} />}
                                    </Flex>
                                )
                            })}
                        </>
                    }
                </Flex>
            })}
        </>
    )
}

const classes = {
    children: {
        "&:hover": {
            cursor: 'pointer'
        },
    },
};

export default PreviewDesktopBanner;
