import { Text, Paper, Stack, Image, BackgroundImage } from '@mantine/core'
import classes from './PanelDetails.module.css'

export default function PanelDetails({data}:any) {
    return (
        <Stack gap={'xs'}>
            <Paper withBorder className={classes.card}>
                <Image src={'https://api.poplook.com/storage/uploads/images/1716759578.jpg'} w={'100%'} />
            </Paper>
            <Text fz={14} truncate={'end'}>{data.name}</Text>
        </Stack>
    )
}
