import { Text, TextInput, Select, Textarea, Stack, Button, Group } from "@mantine/core";
import { RichTextEditor, Link } from '@mantine/tiptap';
import { IconPlus } from "@tabler/icons-react";
import {useForm, usePage} from "@inertiajs/react";
import {useEffect} from "react";
import { PreviewHtml } from "./Index";

function HTMLEditor({ width, content, setContent, reditorRefef, close, header }: any) {
    const { id, campaign } = usePage<any>().props;
    const {data, setData, post} = useForm({
        html : '', 
        id: id,
        subject: header?.subject,
        preheader: header?.preheader,
    })

    useEffect(() => {
        fetch(route('campaign.email.get_design', {id : id}), {
            method: 'GET'
        }).then(response => response.json()).then(data => {
            console.log(data.html)
            setContent(data.html);
        })
    }, []);

    const onData = ({e}: { e: any }) => {
        setContent(e.currentTarget.value);
        setData("html", e.currentTarget.value);
    }

    const saveHtml = () => {
        post(route('campaign.email.design'), {
            data,
            onSuccess: (data : any) => {
                console.log(data);
            }
        })
    }

    return <Stack w={width} mr={'xs'}>
        <Textarea
            placeholder="Enter Html code"
            rows={25}
            value={content}
            onChange={(e) => onData({e: e})}
            w={'100%'}
        />
        <Group gap={'xs'}  justify="end">
            <Button variant="transparent" color={'gray'} onClick={() => close()}>
                Cancel
            </Button>
            <PreviewHtml content={content} data={header} justBtn />
            <Button size={'xs'} onClick={saveHtml} color={'green'}>
                Save
            </Button>
        </Group>
    </Stack>;
}

export default HTMLEditor;
