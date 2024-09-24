import { Text, SimpleGrid, ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UploadComponent, UploadFilePaginate } from '../Index';
import { MiniImg } from '@/Pages/Admin/Settings/FileUpload/Components/Index';


function CustomUploadFile({ setImageSelected, app = false }: any) {

    const [fileData, setFileData] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);

    const getImages = async () => {

        await axios.get(route('file_upload.fileList'), {
            params: {
                page: currentPage
            }
        }).then((result) => {
            let data = result.data.files;
            setFileData(data)
        }).catch((error) => {
            console.log('Show error notification!', error)
            return Promise.reject(error)
        })
    }

    useEffect(() => {
        getImages();
    }, [currentPage])

    return <>

        <UploadComponent updatelist={getImages} isApp={app} />

        {fileData && <>
            <Text mt={20} mb={10} fz={16}>Recent Upload</Text>
            <ScrollArea h={400}>
                <SimpleGrid cols={5} mb={10} >
                    {fileData && fileData.data && fileData.data.map((res: any, index: any) => {
                        return <MiniImg data={res} key={index} click={setImageSelected} isUsing={true} />
                    })}
                </SimpleGrid>
            </ScrollArea>

            {fileData.data &&
                <UploadFilePaginate
                    meta={fileData}
                    setData={setCurrentPage}
                />
            }
        </>}
    </>
}

export default CustomUploadFile;
