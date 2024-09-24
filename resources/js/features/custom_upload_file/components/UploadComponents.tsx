import { Button, Flex, Image, Pill, FileInput, FileInputProps } from '@mantine/core';
import { useState } from 'react';
import { IconUpload } from '@tabler/icons-react';
import { router, } from '@inertiajs/react';
import { FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';


function UploadComponents({ updatelist, setImageSelected, type = 'all', isApp = false }: any) {
    const fileImg = (type == 'all' || type == 'image') ? [MIME_TYPES.jpeg, MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif] : [];
    const fileVideo = (type == 'all' || type == 'video') ? [MIME_TYPES.mp4] : [];
    const FileAccepted = [...fileImg, ...fileVideo];
    const maxUpload = 5;

    const [uploadFiles, setUploadFiles] = useState<FileWithPath[]>([]);

    const convert = () => {
        const extensions = FileAccepted.map((mimeType: any) => {
            const parts = mimeType.split('/');
            if (parts.length === 2) {
                return ` .${parts[1]}`;
            }
            return '';
        });

        return extensions;
    }

    const preview = (file: any) => {
        const url = URL.createObjectURL(file);
        if (file.type == 'video/mp4') {
            return <video width={'100%'} controls>
                <source src={url} type="video/mp4" />
            </video>
        }

        return (
            <Image
                src={url}
                height={300}
            />

        );
    }

    const ValueComponents: FileInputProps['valueComponent'] = ({ value }) => {
        if (value === null) {
            return null;
        }

        if (Array.isArray(value)) {
            if (value.length > maxUpload) {
                alert('You can select a maximum of ' + maxUpload + ' files.');
                return (
                    <Pill.Group>
                        {value.map((file, index) => (
                            <Pill key={index}>{file.name}</Pill>
                        ))}
                    </Pill.Group>
                );
            }
            return (
                <Pill.Group>
                    {value.map((file, index) => (
                        <Pill key={index}>{file.name}</Pill>
                    ))}
                </Pill.Group>
            );
        }

        return <Pill>{value.name}</Pill>;
    };

    const onUploadFiles = async () => {
        try {
            const params = {
                file: uploadFiles,
                app: isApp
            }

            console.log(params);

            await router.post(route('file_upload.store'), params, {
                onSuccess: () => {
                    setUploadFiles([]);
                    updatelist()
                }
            });
        } catch (error) {
            console.log('error', error)
        }
    }

    const onPickFile = (files: any) => {

        const maxVideo = 30000000;  // 30 megabytes
        const maxImage = 5000000; // 5 megabytes

        files.forEach((file: any, index: any) => {
            if (file.type == 'video/mp4') {
                if (file.size > maxVideo) {
                    files.splice(index, 1);
                    notifications.show({
                        // title: 'Default notification',
                        message: 'Video cannot exceed more than ' + (maxVideo / 1000000) + 'mb',
                        color: 'red'
                    })
                }
            } else {
                if (file.size > maxImage) {
                    files.splice(index, 1);
                    notifications.show({
                        // title: 'Default notification',
                        message: 'Image cannot exceed more than ' + (maxImage / 1000000) + 'mb',
                        color: 'red'
                    })
                }
            }

        });

        setUploadFiles(files);

    }


    return <>
        <Flex justify={'space-between'} align={'center'}>
            <FileInput
                w={'85%'}
                mr={'xs'}
                multiple
                placeholder={'Only' + convert()}
                clearable={true}
                accept={FileAccepted.toString()}
                value={uploadFiles}
                valueComponent={ValueComponents}
                onChange={onPickFile}
            />

            <Button
                color='green'
                w={'15%'}
                onClick={onUploadFiles}
                disabled={uploadFiles.length <= 0}
                leftSection={
                    <IconUpload style={{ width: '70%', height: '70%' }} stroke={1.5} />
                }
            >Upload</Button>

        </Flex>

        {uploadFiles.length > 0 && <>
            <Flex bg={'#f8f9fa'} my={5} justify={'center'}>
                {uploadFiles.map((res: any, index: any) => {
                    return <Flex key={index} px={'xs'} style={classes.carouselSlide}>
                        {preview(res)}
                    </Flex>
                })}
            </Flex>
        </>}
    </>
}

export default UploadComponents;


const classes: any = {
    carouselSlide: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transitionDuration: '100ms',
        '&:hover': {
            transform: `scale(0.98)`
        },
    },
    wrapper: {

    }
};
