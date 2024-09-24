import { Stack, Text, Paper, SegmentedControl, Table, Image } from "@mantine/core";
import {useEffect, useState} from "react";
import SkeletonEmail from "./SkeletonEmail";
import InfoEmail from "./InfoEmail";
import {PreviewHtml} from "@/Pages/Admin/Marketing/Email/Components/Index";
import { router, usePage } from "@inertiajs/react";

function PreviewEmail({ width, design, data }: any) {
    const { html, campaign } = usePage<any>().props;
    const [preview, setPreview] = useState('inbox');
   

    return <Stack w={width} style={{ position: 'sticky', top: 80}}>
        <Paper p={'lg'} radius={'lg'} withBorder>
            <Text c={'dimmed'} fw={600}>Preview</Text>
            <SegmentedControl
                my={'lg'}
                w={'100%'}
                value={preview}
                onChange={setPreview}
                data={[
                    { label: 'Inbox', value: 'inbox' },
                    { label: 'Email', value: 'email' },
                ]}
            />

            {preview == 'inbox' && <Table withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>
                            <SkeletonEmail />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <InfoEmail id={design} data={data}/>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <SkeletonEmail />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <SkeletonEmail />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>}

            {preview == 'email' &&
                <PreviewHtml width={'100%'} content={html} data={data} />
            }
        </Paper>
    </Stack>;
}

export default PreviewEmail;
