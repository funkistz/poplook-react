import { UploadFileButton } from '@/features/custom_upload_file/Index'
import { Text, Flex, Stack, TextInput, Textarea, Switch, Button } from '@mantine/core'
import { NoImage, WithImage } from '../../Settings/Logo/Components/Index'

export default function FormOutlet({data, setData, post, put, errors, setError, close}:any) {
   
    const onSubmit = async (e: any) => {

        e.preventDefault();

        if (data.id != null) {  
            await put(route('outlet.update', data.id) , {
                preserveScroll: true,
                onSuccess: () => {
                    close()
                },
            })
            return
        }

        await post(route('outlet.store') , {
            preserveScroll: true,
            onSuccess: () => {
                close()
            },
        })
    }

    return <>
        <form onSubmit={onSubmit}>
            <Stack gap={'xs'} mb={50}>
                <TextInput
                    label={'Name'}
                    placeholder={'Name'}
                    value={data.name}
                    onChange={(e) => {setData('name',e.target.value); setError('name','') }}
                    error={errors.name}
                />
                <Stack gap={'xs'} my={'xs'}>
                    <TextInput
                        label={'Image'}
                        placeholder='Select or Enter Link'
                        value={data.image}
                        onChange={(e) => {setData('image', e.target.value); setError('image','')}}
                        error={errors.image}
                    />
                    <Flex justify={'end'}>
                        <UploadFileButton setImageSelected={(url: any) => {setData('image', url); setError('image','')}} />
                    </Flex>

                    <Text fz={15}>Preview</Text>
                    {data.image ? <WithImage img={data.image} /> : <NoImage />}
                </Stack>
                <Stack gap={'xs'} my={'xs'}>
                    <TextInput
                        label={'Hover Image'}
                        placeholder='Select or Enter Link'
                        value={data.imgHover}
                        onChange={(e) => {setData('imgHover', e.target.value); setError('imgHover','')}}
                        error={errors.imgHover}
                    />
                    <Flex justify={'end'}>
                        <UploadFileButton setImageSelected={(url: any) => {setData('imgHover', url); setError('imgHover','')}} />
                    </Flex>

                    <Text fz={15}>Preview</Text>
                    {data.imgHover ? <WithImage img={data.imgHover} /> : <NoImage />}
                </Stack>
                <Textarea
                    label={'Address'}
                    placeholder='Address'
                    value={data.address}
                    onChange={(e) => {setData('address',e.target.value); setError('address','')}}
                    rows={5}
                    error={errors.address}
                />


                <TextInput
                    label={'Link'}
                    placeholder='Link'
                    value={data.link}
                    onChange={(e) => {setData('link',e.target.value); setError('link','')}}
                    error={errors.link}
                />
                <TextInput
                    label={'Phone'}
                    value={data.phone}
                    onChange={(e) => {setData('phone', e.target.value); setError('phone','')}}
                    error={errors.phone}
                />
                <TextInput
                    label={'Email'}
                    value={data.email}
                    onChange={(e) => {setData('email', e.target.value); setError('email','')}}
                    error={errors.email}
                    placeholder='Default Email for outlet'
                />
                {data.id == null &&  <Flex justify={'space-between'} align={'center'}>
                    <Text fz={14} fw={500}>Status</Text>
                    <Switch
                        checked={data.status}
                        onChange={(e) => setData('status', e.currentTarget.checked)}
                        size={'lg'}
                        color={'green'}
                    />
                </Flex>}
            </Stack>
            
            <Flex bg={'#fff'} py={'xs'} style={{ position: 'absolute', bottom: 0, left: 10, right: 0 }} w={'95%'}  >
                <Button fullWidth type={'submit'}color='green'>
                    {data.id == null ? 'Create Now' : 'Update Now'}
                </Button>
            </Flex>
        </form>
       
    </>
}
