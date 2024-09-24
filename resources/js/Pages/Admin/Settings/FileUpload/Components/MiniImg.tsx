import { Image, Text, Flex } from '@mantine/core';
import classes from '../Css/MiniImg.module.css';

function MiniImg({ data, selected, click, isUsing = false }: any) {

    const handle = () => {
        if (isUsing) {
            return click('/' + data.url, data.type)
        }

        return click(data.id)
    }
    return <>
        <Flex direction={'column'} onClick={() => handle()} className={selected == data.id ? classes.blockActive : classes.block} >
            <Flex w={'100%'} h={130} className={selected == data.id ? classes.selected : ''}>
                {data.type == 'image' && <Image
                    src={'/' + data.thumbnail_url}
                    style={{ borderRadius: 5 }}
                />}

                {data.type == 'video' && <video
                    src={data.url}
                    style={{ borderRadius: 5, width: '100%' }}

                ></video>}
            </Flex>

            <Flex direction={'column'} w={'100%'}>
                <Text fz={13} truncate="end">{data.name}</Text>
                <Text fz={12} c={'dimmed'}>{data.size}</Text>
            </Flex>
        </Flex>
    </>

}

export default MiniImg;