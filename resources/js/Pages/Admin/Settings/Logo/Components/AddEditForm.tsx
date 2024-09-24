import { UploadFileButton } from "@/features/custom_upload_file/Index";
import { Flex, Stack, TextInput, Image, Text, Button, ScrollArea } from "@mantine/core";
import { WithImage, NoImage } from "./Index";

function AddEditForm({ data, setData, post, put, reset, errors, setError, close }: any) {

    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            if (data.id != null) {
                await put(route('logo.update', data.id));
                return
            }

            await post('logo');
            return

        } catch (error) {
            // console.log('error', error)
        } finally {
            close();
        }
    }


    return <>
        <form onSubmit={onSubmit}>
            <ScrollArea h={700}>
                <TextInput
                    label={'Name'}
                    placeholder='Enter Name'
                    my={'xs'}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />

                <Stack gap={'xs'} my={'xs'}>
                    <TextInput
                        label={'Logo'}
                        placeholder='Select Logo'
                        value={data.logo}
                        onChange={(e) => setData('logo', e.target.value)}
                        readOnly
                    />
                    <Flex justify={'end'}>
                        <UploadFileButton setImageSelected={(url: any) => setData('logo', url)} />
                    </Flex>

                    <Text fz={15}>Preview</Text>
                    {data.logo ? <WithImage img={data.logo} /> : <NoImage desc={'No Image Upload'} />}

                </Stack>

                <Stack gap={'xs'} my={'xs'}>
                    <TextInput
                        label={'Icon'}
                        placeholder='Select Icon'
                        value={data.icon}
                        onChange={(e) => setData('icon', e.target.value)}
                        readOnly
                    />
                    <Flex justify={'end'}>
                        <UploadFileButton setImageSelected={(url: any) => setData('icon', url)} />
                    </Flex>

                    <Text fz={15}>Preview</Text>
                    {data.icon ? <WithImage img={data.icon} /> : <NoImage />}


                </Stack>
            </ScrollArea>


            <Flex mb={'xs'} style={{ position: 'absolute', bottom: 0, left: 10, right: 0 }} w={'95%'}>
                <Button
                    fullWidth
                    disabled={(data.name.length == 0 || data.logo.length == 0 || data.logo.length == 0)}
                    type={'submit'}
                >
                    {data.id == null ? 'Create Now' : 'Update Now'}

                </Button>
            </Flex>
        </form>

    </>
}

export default AddEditForm;