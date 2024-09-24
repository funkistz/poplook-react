import { Flex, Checkbox, Stack, Text, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";

function TextWithTooltips({ width = '100%', title, details }: any) {

    const [opened, { close, open }] = useDisclosure(false);

    return <Flex align={'center'} justify={'centert'} w={width}>
        <Text fz={14} mr={'xs'} >{title}</Text>
        <Popover width={200} position="bottom-start" withArrow shadow="md" opened={opened}>
            <Popover.Target>
                <IconInfoCircle onMouseEnter={open} onMouseLeave={close} style={{ color: 'gray' }} stroke={1} />
            </Popover.Target>
            <Popover.Dropdown>
                {details}
            </Popover.Dropdown>
        </Popover>
    </Flex>;
}

export default TextWithTooltips;
