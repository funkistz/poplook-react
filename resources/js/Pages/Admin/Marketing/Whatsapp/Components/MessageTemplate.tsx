
import { UploadFileButton } from "@/features/custom_upload_file/Index";
import { useForm } from "@inertiajs/react";
import { Button, ActionIcon, rem, SimpleGrid, Paper, Flex, Stack, Text, Center, TextInput, SegmentedControl, Textarea } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";
import { UrlForm } from "./Index";

function MessageTemplate({ data, setData }: any) {

    const setImageSelected = (url: any, type: any) => {
        setData('img', url)
        close();
    }

    return <Stack gap={'xs'} w={'60%'}>
        <Text fw={500} fz={16}>Message Template</Text>
        <Text fz={13}>You can select a template by WhatsApp to create your message.</Text>
    
        <SegmentedControl
            value={data.template}
            onChange={(e) => setData('template',e)}
            data={[
                { label: 'Message only', value: '0' },
                { label: 'Header', value: '1' },
                { label: 'Button', value: '2' },
                { label: 'Header & Button', value: '3' },
            ]}
        />

        {data.template == 0 && <>
            <Textarea
                placeholder="Write Something ..."
                autosize
                minRows={10}
                value={data.text}
                onChange={(e) => setData('text', e.target.value)}
            />
        </>}

        {data.template == 1 && <>
            <TextInput
                label={'Image'}
                placeholder="Choose Image"
                onChange={(e) => setData('img', e.target.value)}
                value={data.img}
                
            />
            <Flex justify={'end'} mb={10}>
                <UploadFileButton setImageSelected={setImageSelected} />
            </Flex>
            <Textarea
                placeholder="Write Something ..."
                autosize
                minRows={10}
                value={data.text}
                onChange={(e) => setData('text', e.target.value)}
            />
        </>}

        {data.template == 2 && <>
            <Textarea
                placeholder="Write Something ..."
                autosize
                minRows={10}
                value={data.text}
                onChange={(e) => setData('text', e.target.value)}
            />
            <UrlForm
                label={true}
                labelbtn={data.linkLabel}
                setLabel={'linkLabel'}
                type={data.linkType}
                setType={'linkType'}
                setData={setData}
                data={data}
                url={data.linkUrl}
                setUrl={'linkUrl'}
            />
        </>}

        {data.template == 3 && <>
            <TextInput
                label={'Image'}
                placeholder="Choose Image"
                onChange={(e) => setData('img', e.target.value)}
                value={data.img}
                
            />
            <Flex justify={'end'} mb={10}>
                <UploadFileButton setImageSelected={setImageSelected} />
            </Flex>
            <Textarea
                placeholder="Write Something ..."
                autosize
                minRows={10}
                value={data.text}
                onChange={(e) => setData('text', e.target.value)}
            />
            <UrlForm
                label={true}
                labelbtn={data.linkLabel}
                setLabel={'linkLabel'}
                type={data.linkType}
                setType={'linkType'}
                setData={setData}
                data={data}
                url={data.linkUrl}
                setUrl={'linkUrl'}
            />
        </>}
    </Stack>
}

export default MessageTemplate;
