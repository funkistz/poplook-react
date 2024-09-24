import { Stack, Text, Paper, Alert } from "@mantine/core";
import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

function PreviewBeforelaunch({ width }: any) {
    const [preview, setPreview] = useState('inbox');

    return <Stack w={width}>
        <Paper p={'lg'} radius={'lg'} withBorder>
            <Text c={'dimmed'} fw={600}>Before You Launch</Text>
            <Alert variant="light" color="red" icon={<IconInfoCircle />} my={'md'}>
                <Text c={'red'}>You cannot send the same email campaign more than once.</Text>
            </Alert>
        </Paper>
    </Stack>;
}

export default PreviewBeforelaunch;
