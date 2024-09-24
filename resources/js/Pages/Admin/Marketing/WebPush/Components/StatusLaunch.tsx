import { usePage } from "@inertiajs/react";
import {  Stack, Text, Alert, NumberFormatter } from "@mantine/core";
import { IconInfoCircle, IconSquareRoundedCheck } from "@tabler/icons-react";
import moment from "moment";

function StatusLaunch({form}:any) {

    const { segment, campaign } = usePage<any>().props;

    const title = () => {
        return <Text fw={600} fz={15}>Before You Launch</Text>
    }

    const startDate = campaign?.start_date + ' ' + campaign?.start_time;

    return <Stack gap={0} mr={'xs'}>
        {form.data.status == 'send now' && <>
            {title()}
            <Alert mt={'xs'} variant="light" color="green" icon={<IconSquareRoundedCheck />}>
                {campaign?.campaign_status == "Completed" ? 
                    <Text fz={14} fw={600} c={'green.8'}> Your campaign has already run on {moment(startDate).format('YYYY-MM-DD')} at {moment(startDate).format('HH:mm A')}</Text> 
                :
                    <Text fz={14} fw={600} c={'green.8'}> Your campaign is ready to run</Text>
                }
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your current target audience is:<br />
                    <NumberFormatter value={segment} thousandSeparator /> Engaged Subscribers
                </Text>
                
            </Alert>
        </>}

        {form.data.status == 'send later' && <>
            {title()}
            <Alert mt={'xs'} variant="light" color="green" icon={<IconSquareRoundedCheck />}>
                {campaign?.campaign_status == "Completed" ? 
                    <Text fz={14} fw={600} c={'green.8'}> Your campaign has already run on {moment(startDate).format('YYYY-MM-DD')} at {moment(startDate).format('HH:mm A')}</Text> 
                :
                    <Text fz={14} fw={600} c={'green.8'}> Your campaign is ready to run</Text>
                }
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your campaign will be activated on:<br />
                    02.06.2023 at 18:01
                </Text>
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your current target audience is:<br />
                    <NumberFormatter value={segment} thousandSeparator /> Engaged Subscribers<br /><br />
                    This may change at the send time.
                </Text>
            </Alert>
        </>}

        {form.data.status == 'send recurring' && <>
            {title()}
            <Alert mt={'xs'} variant="light" color="green" icon={<IconSquareRoundedCheck />}>
                {campaign?.campaign_status == "Completed" ? 
                    <Text fz={14} fw={600} c={'green.8'}> Your campaign has already run on {moment(startDate).format('YYYY-MM-DD')} at {moment(startDate).format('HH:mm A')}</Text> 
                :
                    <Text fz={14} fw={600} c={'green.8'}> Your campaign is ready to run</Text>
                }
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your campaign will be activated:<br />
                    From 02.06.2023 - 18:01 To 02.07.2023 - 18:01<br /><br />
                    Monthly at 18:01 
                </Text>
            </Alert>
            <Alert mt={'xs'} variant="light" color="blue" icon={<IconInfoCircle />}>
                <Text fz={14} fw={600} c={'blue.8'}>
                    Your current target audience is:<br />
                    <NumberFormatter value={segment} thousandSeparator /> Engaged Subscribers<br /><br />
                    This may change at the recurring send times.
                </Text>
            </Alert>
        </>}
    </Stack> 
   
}

export default StatusLaunch;
