import { Flex, Stack, Text, Image } from "@mantine/core";

import classes from './SeeDetails.module.css';

function SeeDetails() {
    return <Stack gap={'xs'} px={'md'} pb={'md'}>
        <Stack gap={0} mb={'md'}>
            <Text fz={16} fw={600}>Schedule Details</Text>
            <Flex justify={'space-between'}>
                <Text fz={16} >Scheduled On</Text>
                <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                <Text c={'dimmed'}>23.01.2024 11:05</Text>
            </Flex>
        </Stack>
        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Campaign Details</Text>
            <Flex justify={'space-between'} my={'xs'}>
                <Text fz={16}>Created On</Text>
                <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                <Text c={'dimmed'}>22.01.2024 17:23</Text>
            </Flex>
            <Flex justify={'space-between'} my={'xs'}>
                <Text fz={16}>ID</Text>
                <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                <Text c={'dimmed'}>2</Text>
            </Flex>
            <Flex justify={'space-between'} my={'xs'} >
                <Text fz={16} >Send Time Optimized</Text>
                <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                <Text c={'dimmed'}>Disabled</Text>
            </Flex>
            <Flex justify={'space-between'} my={'xs'}>
                <Text fz={16}>Last Updated Date</Text>
                <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                <Text c={'dimmed'}>23.01.2024 11:05</Text>
            </Flex>
            <Flex justify={'space-between'} my={'xs'}>
                <Text fz={16}>Time Zone</Text>
                <Text mx={'md'} className={classes.lineDot} >&nbsp;</Text>
                <Text c={'dimmed'}>UTC+8, Kuala_Lumpur</Text>
            </Flex>
        </Stack>

        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Tag</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>


        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Exclude Recipients</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>



        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Segments</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>

        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Design</Text>
            <Image
                radius="md"
                src={'https://image.useinsider.com/email-previews/dee48c17cd8a7d405e6c2fc34ad1ad8b-100.jpeg'}
            />
        </Stack>

        <Stack gap={0} my={'md'}>
            <Text fz={16} fw={600}>Subject</Text>
            <Text c={'dimmed'}>✿ The Kelopak Collection ✿</Text>
        </Stack>

        <Stack gap={0} my={'md'} mb={'xl'}>
            <Text fz={16} fw={600}>Notes</Text>
            <Text c={'dimmed'}>None</Text>
        </Stack>
    </Stack>;
}

export default SeeDetails;
