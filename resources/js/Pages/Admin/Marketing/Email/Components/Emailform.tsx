import { Text, TextInput, Select, Stack } from "@mantine/core";
import TextWithTooltips from "./TextWithTooltips";

function Emailform({ data , setData, errors, setError }: any) {

    const subjectPreHeader = () => {
        return <>
            <Text size="xs" mb={'xs'}><b>Subject</b> is the title text which your recipients will see when they receive your Email in their inbox.</Text>
            <Text size="xs"><b>Preheader</b> is the summary text following the subject, which the recipients see when they receive your email in their inbox.</Text>
        </>
    }
    return <>
        <Stack w={'60%'} gap={'md'}>
            <Select
                label="From"
                data={['POPLOOK Team <no-reply@mkt-mailing.poplook.com>']}
                value={'POPLOOK Team <no-reply@mkt-mailing.poplook.com>'}
            />

            <TextWithTooltips
                width={180}
                title={'Subject & Preheader'}
                details={subjectPreHeader()}
            />

            <TextInput 
                label="Subject" 
                placeholder='Enter Subject' 
                value={data.subject} 
                onChange={(e) => {setData('subject',e.target.value), setError('subject', '') }}
                error={errors.subject}
            />

            <TextInput
                label="Preheader"
                placeholder='Enter Preheader' 
                value={data.preheader} 
                onChange={(e) => {setData('preheader', e.target.value), setError('preheader', '')}} 
                error={errors.preheader}
            />
        </Stack>
    </>;
}

export default Emailform;
