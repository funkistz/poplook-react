import { Flex, Stack, Text, Paper, TextInput, Checkbox } from "@mantine/core";
import TextWithTooltips from "./TextWithTooltips";

function UTMform({ title, description }: any) {

    const UTPParameter = () => {
        return <>
            <Text size="xs">UTM Parameters let you assign unique tags to your links in the email to track your campaign's performance on Google Analytics.</Text>
        </>
    }
    return <>
        <TextWithTooltips
            width={160}
            title={'UTM Parameters'}
            details={UTPParameter()}
        />

        <Checkbox
            checked={false}
            onChange={(e) => console.log()}
            label="Enable UTM Parameters"
            my={'lg'}
        />
        <TextInput label="UTM Source" my={'lg'} w={'60%'} placeholder='Enter UTM Source' />
        <TextInput label="UTM Medium" my={'lg'} w={'60%'} placeholder='Enter UTM Medium' />
        <TextInput label="UTM Campaign" my={'lg'} w={'60%'} placeholder='Enter UTM Campaign' />
        <TextInput label="UTM Term" my={'lg'} w={'60%'} placeholder='Enter UTM Term' />
        <TextInput label="UTM Content" my={'lg'} w={'60%'} placeholder='Enter UTM Term' />
    </>;
}

export default UTMform;
