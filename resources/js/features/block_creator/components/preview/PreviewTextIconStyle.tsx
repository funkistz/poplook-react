import { Flex, Text } from "@mantine/core";

function PreviewTextIconStyle({ obj }: { obj: any }) {
    return <>
        {obj && <Flex direction={'row'} align={'center'}>
            {
                (obj?.icon.isShow && obj?.icon.position == 'left') &&
                <img src={obj.icon.href} alt=" " style={{ marginRight: obj.icon.gap, height: obj.icon.size }} />
            }

            <Text
                // my={10}
                size={obj.size}
                ta={obj.align}
                c={obj.color}
                fs={obj.fontStyle}
                fw={obj.bold}
                tt={obj.transform}
                td={obj.textDecoration}
                style={{ letterSpacing: obj.letterSpacing, lineHeight: 'normal' }}
                dangerouslySetInnerHTML={{ __html: obj.content }}
            >
            </Text>

            {
                (obj.icon.isShow && obj.icon.position == 'right') &&
                <img src={obj.icon.href} alt=" " style={{ marginLeft: obj.icon.gap, height: obj.icon.size }} />
            }
        </Flex>
        }
    </>
}

export default PreviewTextIconStyle;