import { useForm, usePage } from "@inertiajs/react";
import { Button, Card, FileInput, Grid, Image, Modal, Progress } from "@mantine/core";
import { useDisclosure, useInterval } from "@mantine/hooks";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function FileUploadPage({ opened = false, setOpen, setClose, setImageSelected }: any) {

    const { errors } = usePage().props
    const { files, path } = usePage().props;
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        file: null,
    })
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [videoPrev, setVideoPreview] = useState();
    const [hover, setHoverAble] = useState({});

    useEffect(() => {
        if (opened) {
            getImages();
        }
        return () => {
        }
    }, [opened])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            setVideoPreview(undefined);
            return;
        }
        const objectUrl: any = URL.createObjectURL(selectedFile);
        setPreview(undefined);
        setVideoPreview(undefined);
        if (selectedFile['type'] == 'video/mp4') {
            setVideoPreview(objectUrl);
        } else {
            setPreview(objectUrl);
        }


        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile])

    const onSelectFile = (e: any) => {
        console.log('e', e)
        if (!e || e === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e);
        setData('file', e);
    }

    function submit(e: any) {
        e.preventDefault();
        post('file_upload', {
            data,
            onProgress: (e: any) => {
                setProgress(e.percentage);
            },
            onSuccess: () => {
                getImages(),
                    reset(),
                    setProgress(0)
            },
            onError: (e: any) => {
                // console.log(e);
                setProgress(0)
            }
        });
    }

    const getImages = async () => {

        const result = await axios.get(route('file_upload.create')).then((result) => {
            console.log('image result', result)

            let data = result.data.files;

            if (data.mime == 'mp4') {
                setVideo(data);
            } else {
                setImages(data);
            }
            setSelectedFile(undefined);
            setData('file', null);

        }).catch((error) => {
            console.log('Show error notification!', error)
            return Promise.reject(error)
        })
    }

    function hoverable(index: any) {
        const clickable = {
            cursor: 'pointer'
            // transform: 'scale(1.5)',
            // zIndex: 1
        }

        const hoverable = document.getElementsByClassName('hoverable' + index)[0];
        // hoverable.style.transform = 'scale(1.5)';
        // hoverable.style.zIndex = 1;


        setHoverAble(clickable);
    }

    function unhover(index: any) {
        const clickable = {
            zIndex: 0
        }
        const hoverable = document.getElementsByClassName('hoverable' + index)[0];
        // hoverable.style.transform = '';
        // hoverable.style.zIndex = 0;
        // setHoverAble(clickable);
    }

    // const setImageSelected = e => {
    //     imageSelected = e.target.currentSrc;
    //     close();
    // }

    return (<>
        <Modal size="xl" opened={opened} onClose={setClose} title="File Upload" centered>
            {/* Modal content */}
            <form onSubmit={submit}>
                <FileInput
                    placeholder="Choose file"
                    label="Upload your file"
                    description="image, video and gif"
                    withAsterisk
                    value={data.file}
                    onChange={onSelectFile}
                    error={errors.file}
                // onChange={(e: any) => {
                //     setData('file', e)
                // }}
                />

                {selectedFile && !videoPrev &&
                    <Card
                        shadow="xs"
                        padding="xl"
                        component="a"
                        target="_blank"
                    ><img height="100%" width="100%" src={preview} />
                    </Card>
                }
                {selectedFile && videoPrev &&
                    <Card
                        shadow="xs"
                        padding="xl"
                        component="a"
                        target="_blank"
                    >
                        <video
                            width="50%"
                            height="50%"
                            controls>
                            <source src={videoPrev} />
                        </video>
                    </Card>
                }
                {progress !== 0 && (
                    <Progress mb="1%" color="teal" animated value={progress} />
                )}
                <Button
                    fullWidth
                    type="submit"
                    style={classes.button}
                    // color={theme.primaryColor}
                    mb="5%"
                >
                    <div className={classes.label}>
                        Upload Files
                    </div>
                    {/* 
                    {progress !== 0 && (
                        <Progress
                            value={progress}
                            className={classes.progress}
                            color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
                            radius="sm"
                        />
                    )} */}
                </Button>
            </form>
            <Grid gutter={5}>
                {images && images.map((image: any, index) => (
                    <Grid.Col span={4}
                        key={index}>
                        {image.mime !== 'mp4' && (
                            <Card
                                onMouseEnter={() => hoverable(index)}
                                onMouseLeave={() => unhover(index)}
                                shadow="xs"
                                padding="xl"
                                component="a"
                                style={hover}
                                className={'hoverable' + index}
                                onClick={() => setImageSelected(image.url)}
                            >
                                <Card.Section>
                                    <Image
                                        src={image.thumbnail_url}
                                        height="100%"
                                    />
                                </Card.Section>
                            </Card>
                        )}
                        {image.mime === 'mp4' && (
                            <Card
                                shadow="xs"
                                padding="xl"
                                component="a"
                                style={hover}
                                onClick={() => setImageSelected(image.url)}
                                onMouseEnter={() => hoverable(index)}
                                onMouseLeave={() => unhover(index)}
                                className={'hoverable' + index}
                            >
                                <Card.Section>
                                    <video
                                        width="100%"
                                        height="100%"
                                        controls
                                    >
                                        <source src={image.url} type="video/mp4" />
                                    </video>
                                </Card.Section>
                            </Card>
                        )}
                    </Grid.Col>
                ))}
            </Grid>
        </Modal>
    </>);
}

const classes: any = {
    button: {
        position: 'relative',
        transition: 'background-color 150ms ease',
    },

    progress: {
        // ...theme.fn.cover(-1),
        height: 'auto',
        backgroundColor: 'transparent',
        zIndex: 0,
    },

    label: {
        position: 'relative',
        zIndex: 1,
    },
};