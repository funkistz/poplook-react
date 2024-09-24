import { Stack, Text, rem, Paper, SegmentedControl, Flex, Image, Modal, Button, Table, ScrollArea } from "@mantine/core";
import { useState } from "react";
import { IconTemplateOff } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import SkeletonEmail from "./SkeletonEmail";
import InfoEmail from "./InfoEmail";
import { EmailPreview } from "./Index";

function PreviewHtml({ width, content, data, justBtn = false }: any) {

    const [preview, setPreview] = useState('desktop');
    const [opened, { open, close }] = useDisclosure(false);
    const theObj = { __html: content };
    const size = 40;

    const nocode = () => {
        return <>
            <Flex justify="center" direction="column" align={'center'} py={40}>
                <IconTemplateOff style={{ width: rem(size), height: rem(size), color: '#1cae49' }} />
                <Text py={'xs'} fw={600}>No HTML Code</Text>
                <Text
                    c={'dimmed'}
                    py={'xs'}
                    px={80}
                    ta={'center'}
                    style={{ lineHeight: 1.5 }}
                >You haven't added any HTML code yet. You can add your HTML code and preview your message here.</Text>
            </Flex>
        </>
    }

    if(justBtn) {
        return <>
            <Button size="xs" color="green" onClick={open}>View Details</Button>
            <Modal opened={opened} onClose={close} title="Authentication" size={'80%'} centered>
                <EmailPreview data={data} theObj={theObj} />
            </Modal>
        </>
    }

    return <Stack w={width}>
        <Paper p={'lg'} radius={'lg'} withBorder w={'100%'}>
            {/* <Text c={'dimmed'} fw={600}>Preview</Text>
            <SegmentedControl
                my={'lg'}
                w={'100%'}
                value={preview}
                onChange={setPreview}
                data={[
                    { label: 'Desktop', value: 'desktop' },
                    { label: 'Mobile', value: 'mobile' },
                ]}
            /> */}

            {preview == 'desktop' && <>
                {content ? <>
                        <Flex justify={'end'} mb={'xs'}>
                            <Button size="xs" color="green" onClick={open}>View Details</Button>
                        </Flex>
                        <div dangerouslySetInnerHTML={theObj}
                            style={{ 
                                height: 1000, 
                                overflowX: 'scroll', 
                                border: '1px solid #ccc' 
                            }}>
                        </div>
                    </>
                    :
                    nocode()}

            </>}

            {preview == 'mobile' && <>
                {content ?
                    <div dangerouslySetInnerHTML={theObj} style={{ height: 1000, overflow: 'auto', border: '1px solid #ccc' }}></div>
                    :
                    nocode()}
            </>}

        </Paper>

        <Modal opened={opened} onClose={close} title="Authentication" size={'80%'} centered>
            <EmailPreview data={data} theObj={theObj} />
        </Modal>
    </Stack>;

}

export default PreviewHtml;
