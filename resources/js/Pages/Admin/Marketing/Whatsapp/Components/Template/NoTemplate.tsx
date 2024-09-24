import { Paper,Stack,  Text} from "@mantine/core";
import { IconLayoutCollage } from "@tabler/icons-react";

function NoTemplate() {
 
    return <Paper radius={'md'} withBorder>
            <Stack gap={0} w={'100%'} justify={'center'} align={'center'} my={'md'}>
                <IconLayoutCollage style={{width: '50%', height: '50%'}} stroke={1} />
                <Text mb={'md'} fz={14}>No Template Selected</Text>
            </Stack>
        </Paper>
    }

export default NoTemplate;
