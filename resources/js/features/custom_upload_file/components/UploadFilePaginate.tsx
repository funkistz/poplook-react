import { Flex, Text, Pagination } from '@mantine/core';

function UploadFilePaginate({ meta, setData, page = null }: any) {

    const handle = (e: number) => {

        if (page != null) {
            console.log('page is not null: ', e)
            return setData(page, e)
        }
        return setData(e)
    }

    return <>
        {meta && <Flex justify={'space-between'} my={20}>
            <Text fz={14}>Showing {meta.from} to {meta.to} of {meta.total} entries</Text>
            <Pagination
                total={meta.last_page}
                color='green' size={'md'} withEdges
                siblings={0} boundaries={0}
                defaultValue={Number(meta.current_page)}
                onChange={(e: any) => handle(Number(e))}
            />
        </Flex>}
    </>
}

export default UploadFilePaginate;