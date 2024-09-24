import {  Stack, Text, Alert } from "@mantine/core";
import { IconInfoCircle, IconSquareRoundedCheck } from "@tabler/icons-react";

function StatusLaunch({status}:any) {

    const title = () => {
        return <Text fw={600} fz={15}>Before You Launch</Text>
    }

    return <Stack gap={0} mr={'xs'}>
         
        {status == 1 && <>
            {title()}
            <Alert mt={'xs'} variant="light" color="green" icon={<IconSquareRoundedCheck />}>
                <Text fz={14} fw={600} c={'green.8'}>Your campaign is ready to run.</Text>
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your current target audience is:<br />
                    15,953 Engaged Subscribers
                </Text>
                
            </Alert>
        </>}

        {status == 2 && <>
            {title()}
            <Alert mt={'xs'} variant="light" color="green" icon={<IconSquareRoundedCheck />}>
                <Text fz={14} fw={600} c={'green.8'}>Your campaign is ready to run.</Text>
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your campaign will be activated on:<br />
                    02.06.2023 - 18:01 (UTC+8, Asia/Kuala_Lumpur)
                </Text>
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your current target audience is:<br />
                    15,953 Engaged Subscribers<br /><br />
                    This may change at the send time.
                </Text>
            </Alert>
        </>}

        {status == 3 && <>
            {title()}
            <Alert mt={'xs'} variant="light" color="green" icon={<IconSquareRoundedCheck />}>
                <Text fz={14} fw={600} c={'green.8'}>Your campaign is ready to run.</Text>
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your campaign will be activated:<br />
                    From 02.06.2023 - 18:01 To 02.07.2023 - 18:01<br /><br />
                    Monthly - 18:01 (UTC+8, Asia/Kuala_Lumpur)
                </Text>
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your current target audience is:<br />
                    15,953 Engaged Subscribers<br /><br />
                    This may change at the recurring send times.
                </Text>
            </Alert>
        </>}
    </Stack> 
   
}

export default StatusLaunch;
