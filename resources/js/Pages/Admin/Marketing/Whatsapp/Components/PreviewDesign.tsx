
import { AppCard } from "@/Components";
import { Stack} from "@mantine/core";
import { MsgBtn, MsgHeader, MsgHeaderBtn, MsgText, NoTemplate } from "./Index";
import { usePage } from "@inertiajs/react";

function PreviewDesign({ data }: any) {
    // 0 = Text Message;    
    // 1 = Text Message with Media Header;
    // 2 = Text Message with Buttons;
    // 3 = Text Message Media Header and Buttons;

    const { env } = usePage<any>().props;
    const getUrl = () => {
        if(data.linkType == 0) {
            return env + 'en/' + data.linkUrl;
        } else if(data.linkType == 1) {
            return env + 'en/category/' + data.linkUrl;
        } else if(data.linkType == 2) {
            return env + 'page/' + data.linkUrl;
        } else if(data.linkType == 3) {
            return data.linkUrl;
        }
    }

    return <Stack gap={0} mr={'xs'} style={{ position: 'sticky', top: 80}}>
       <AppCard title={'Preview'}>
            {data.template == null && <NoTemplate />}

            {data.template == 0 && <MsgText data={data} />}

            {data.template == 1 && <MsgHeader data={data} />}

            {data.template == 2 &&  <MsgBtn data={data} url={getUrl} />}

            {data.template == 3 && <MsgHeaderBtn data={data} url={getUrl} />}
       </AppCard>
    </Stack>
}

export default PreviewDesign;
