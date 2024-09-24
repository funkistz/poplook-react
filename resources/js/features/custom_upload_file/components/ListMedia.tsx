import { Flex, Text, Pagination, SimpleGrid } from '@mantine/core';
import { UploadFilePaginate } from '../Index';
import MiniImg from '@/Pages/Admin/Settings/FileUpload/Components/MiniImg';

function ListMedia({ media, openMedia, click, handlePage }: any) {

    return <>
        <SimpleGrid cols={5} spacing={'md'}>
            {media.data.map((res: any, index: any) => {
                return <MiniImg data={res} key={index} selected={openMedia} click={click} />
            })}
        </SimpleGrid>
        <UploadFilePaginate meta={media} setData={handlePage} page={'page'} />
    </>
}

export default ListMedia;