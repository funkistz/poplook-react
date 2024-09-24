import { Text, FileInput, ActionIcon, rem, SimpleGrid, Drawer, Paper, Flex, Grid, ScrollArea, Modal } from "@mantine/core";
import { IconCode, IconCodeCircle, IconFileZip, IconSquareForbid2, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { DesignType, HtmlEditor, PreviewHtml, ZipForm } from "./Index";
import {usePage} from "@inertiajs/react";

function EmailDesign({ data }: any) {
    const { id, campaign } = usePage<any>().props;

    const [openHtmlEditor, setOpenHtmlEditor] = useState(false);
    const [openBlockCreator, setOpenBlockCreator] = useState(false);
    const [openZipUpload, setOpenZipUpload] = useState(false);

    const [content, setContent] = useState<string>('');

    const header = {
        id: id,
        subject: data.subject,
        preheader: data.preheader,
    }

    return <>
        <Text>Email Design</Text>

        <SimpleGrid cols={2} spacing={0} my={'md'}>
            {/* <DesignType
                title={'Block Creator'}
                desc={'You can can pick elements freely to create your email design.'}
                icon={IconCodeCircle}
                clicked={() => setOpenBlockCreator(true)}
            /> */}
            <DesignType
                title={'HTML Editor'}
                desc={'You can use the HTML Editor to create your email design.'}
                icon={IconSquareForbid2}
                clicked={() => setOpenHtmlEditor(true)}
            />
            <DesignType
                title={campaign.template ? 'Zip File' : 'Upload Zip'}
                desc={campaign.template ? campaign.template.template.template_name:'You can upload a ZIP file containing your email design.'}
                icon={IconFileZip}
                clicked={() => setOpenZipUpload(true)}
            />
             {/* <DesignType/> */}
        </SimpleGrid>

        <Drawer
            opened={openHtmlEditor}
            onClose={() => setOpenHtmlEditor(false)}
            title="HTML Editor"
            position={'right'}
            size={'100%'}
            closeOnEscape={false}
        >
            <Flex justify={'space-between'}>
                <HtmlEditor width={'100%'} content={content} setContent={setContent} close={() => setOpenHtmlEditor(false)} header={header} />
                {/* <PreviewHtml width={'35%'} content={content} data={data} justBtn /> */}
            </Flex>
        </Drawer>

        <Modal opened={openZipUpload} onClose={() => setOpenZipUpload(false)} title={'Upload Zip File'}>
            <ZipForm id={id} close={() => setOpenZipUpload(false)}/>
        </Modal>



    </>;
}

export default EmailDesign;
