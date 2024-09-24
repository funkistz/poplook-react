import { Text, Button, Group, rem, useMantineTheme, Stack, FileInput, Flex } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES,  } from '@mantine/dropzone'
import { IconCloudUpload, IconDownload, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import classes from './ZipForm.module.css';
import { useRef, useState } from 'react';
import { router } from '@inertiajs/react'

export default function ZipForm({id, close}:any) {
    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);
    const [file, setFile] = useState<any>(null);

    function uploadZip()
    {
        const data = {
            design : file,
            campaign_id: id
        }

        router.post('/email_analytics/campaign/email/zip', data, {
            forceFormData: true,
            onSuccess: () => {
                close()
            },
        });
    }
    return <>
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={(files) => {console.log('accepted files', files); setFile(files)}}
                onReject={(files) => {console.log('rejected files', files); setFile(false)}}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.zip]}
                // maxSize={30 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group justify="center">
                        <Dropzone.Accept>
                            <IconDownload
                                style={{ width: rem(50), height: rem(50) }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{ width: rem(50), height: rem(50) }}
                                color={theme.colors.red[6]}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        {/* <Dropzone.Idle>
                            <IconCloudUpload color='green' style={{ width: rem(50), height: rem(50) }} stroke={1} />
                        </Dropzone.Idle> */}
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        <Dropzone.Reject>Only .zip allow</Dropzone.Reject>
                        {/* <Dropzone.Idle>Upload Template</Dropzone.Idle> */}
                    </Text>
                    {file ?
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        {file[0].path}
                    </Text> : <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.zip</i> files that
                        are less than 30mb in size.
                    </Text>}
                </div>
            </Dropzone>

            {/* <Button color="dark" className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                Select files
            </Button> */}
        </div>

        <Group gap={'xs'} justify={'end'}>
            <Button variant="subtle" color="gray" onClick={close}>Cancel</Button>
            <Button type='submit' color={'green'} onClick={() => uploadZip()}>Submit</Button>
        </Group>
     </>
}
