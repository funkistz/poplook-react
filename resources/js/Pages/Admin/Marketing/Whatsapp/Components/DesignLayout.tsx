
import { AppCard } from "@/Components";
import { UploadFileButton } from "@/features/custom_upload_file/Index";
import { UTMForm } from "@/features/marketing";
import { useForm } from "@inertiajs/react";
import { Button, ActionIcon, rem, SimpleGrid, Paper, Flex, Stack, Text, Center, TextInput, Group, Radio, Divider, Select, Checkbox, Textarea, SegmentedControl } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";
import { useState } from "react";
import UrlForm from "./UrlForm";
import MessageTemplate from "./MessageTemplate";

function DesignLayout({ data, setData }: any) {

    const setImageSelected = (url: any, type: any) => {
        setData('img', url)
        close();
    }
 
    return <Stack gap={0} mr={'xs'}>
       <AppCard title={'Message'}>
            <Stack mx={'xs'} gap={'xs'}>
                <Stack gap={'xs'}>
                    <Text fz={13}>You can send a one-off promotional message or an interactive conversational message to engage your recipients.</Text>
                    <Group>
                        <Radio checked={data.type == 0} label="Promotional" value="0" color={'green'} onChange={() => setData('type', 0)} />
                        <Radio checked={data.type == 1} label="Conversational" value="1" color={'green'} onChange={() => setData('type', 1)}/>
                    </Group>
                </Stack>

                <Divider my={'md'} variant="dashed"  />

                <MessageTemplate data={data} setData={setData} />

                <Divider my={'md'} variant="dashed"  />

                <Stack gap={'xs'}>
                    <Text fw={500} fz={16}>Short Urls</Text>
                    <Text fz={13}>You can shorten all URLs to avoid long links in your auto-reply and confirmation messages.</Text>
                    <Checkbox
                        checked={data.shortUrl}
                        onChange={(e) => setData('shortUrl',e.currentTarget.checked)}
                        label="Enable Short URLs"
                        color="green"
                    />
                </Stack>

                <Divider my="md" variant="dashed"  />

                <UTMForm />

            </Stack>
       </AppCard>
    </Stack>
}

export default DesignLayout;
