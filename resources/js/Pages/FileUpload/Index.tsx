import AppLayout from '@/Components/AppLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '../../types';
import ActionBar from '../../Components/Dashboard/ActionBar';
import VehicleStats from '../../Components/Dashboard/VehicleStats';
import { Box, FileInput, Modal, Group, Button, rem, createStyles, Progress, Card, Image, Grid, Flex } from '@mantine/core';
import { useDisclosure, useInterval } from '@mantine/hooks';
import { IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import UploadImageForm from '../../Components/Forms/UploadImageForm';
import React from 'react';
import AppModal from '@/Components/AppModal';
import { FileWithPath } from '@mantine/dropzone';
import { UploadFileButton } from '@/features/custom_upload_file/Index';

export default function FileUploadPage() {
    const { files, path } = usePage().props;
    const [opened, { open, close }] = useDisclosure(false);
    const [img, imgSelect] = useState('');

    const [dialog, setDialog] = useState<boolean>(false);
    const [uploadFiles, setUploadFiles] = useState<FileWithPath[]>([]);

    const onChangeModalFunc = () => {
        setDialog(!dialog)
        if (!dialog) {
            setDialog(true);
            return
        }

        setDialog(false);

    }

    const setImageSelected = (url: any) => {
        imgSelect(url);
        close();
        setDialog(false);
    }

    // API
    const updatePass = async () => {
        try {

            console.log('img', uploadFiles)
            const params = {
                file: uploadFiles,
            }

            await router.post('file_upload', params);

        } catch (error) {
            console.log('error', error)
        } finally {
            // setImageSelected(null)
        }
    }


    return (
        <>
            {/* Modal */}
            {/* <UploadImageForm opened={opened} setOpen={open} setClose={close} setImageSelected={setImageSelected} /> */}
            <UploadFileButton />

            {/* <AppModal
                data={<CustomUploadFile setImageSelected={setImageSelected} />}
                opened={dialog}
                close={onChangeModalFunc}
                title={'File Upload'}
                // closeOutside={false}
                closeOnEscape={false}
                size={'xl'}
                submitColor={'green'}
                textSubmit={'Upload'}
                action={updatePass}


            // disabledBtn={(name.length > 0) && (desc.length > 0) ? false : true}
            // action={duplicateAPI}
            // index={{ name: name, description: desc, id: id }}
            ></AppModal> */}


            {/* <Flex justify={'space-between'} w={'100%'}>
                <Flex w={'50%'} wrap={'wrap'} justify={'center'}>
                    <Button onClick={open}>Choose File</Button>
                    {img.includes('mp4') === false && img &&
                        <Image
                            src={img}
                            height="100%"
                        />
                    }
                    {img.includes('mp4') === true &&
                        <video
                            width="100%"
                            height="100%"
                            controls
                        >
                            <source src={img} type="video/mp4" />
                        </video>
                    }
                </Flex>
                <Flex w={'50%'} wrap={'wrap'} justify={'center'}>
                    <Button onClick={() => onChangeModalFunc()}>Custom File Upload</Button>
                </Flex>
            </Flex> */}

        </>
    );
}

FileUploadPage.layout = (page: any) => <AppLayout children={page} title='File Upload' />;
