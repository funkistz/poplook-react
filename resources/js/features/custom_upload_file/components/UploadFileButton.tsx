import React from 'react'
import { Button } from '@mantine/core';
import { Modal } from '@mantine/core';
import CustomUploadFile from './CustomUploadFile';
import { useDisclosure } from '@mantine/hooks';
import { IconPhotoSearch } from '@tabler/icons-react';

export default function UploadFileButton({ setImageSelected, isApp = false }: any) {

    const [opened, { open, close }] = useDisclosure(false);

    const setImage = (url: any, type: any) => {
        close();
        setImageSelected(url, type);
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="File Upload" size={'xl'}>
                <CustomUploadFile setImageSelected={setImage} app={isApp}/>
            </Modal>
            <Button color='green' size='xs' onClick={open} leftSection={<IconPhotoSearch size={16} />}>
                Choose Image
            </Button>
        </>
    )
}
