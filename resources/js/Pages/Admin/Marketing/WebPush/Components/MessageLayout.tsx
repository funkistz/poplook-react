import { Flex, Stack, Text, Image, Group, Radio, Divider, TextInput, Checkbox, Paper, SegmentedControl, Select } from "@mantine/core";
import { AppCard } from "@/Components";
import { UTMForm } from "@/features/marketing";
import { UploadFileButton } from "@/features/custom_upload_file/Index";
import { usePage } from "@inertiajs/react";
import { UrlForm } from "./Index";
import { getNameCategory } from "@/features/helper/Index";

function Messagelayout({form}:{form:any}) {
    const { category, pages, campaign} = usePage<any>().props;

    const setIconSelected = (url: any) => {
        form.setData('customIcon', url)
        form.setError('customIcon','')
        close();
    }

    const setImgSelected = (url: any) => {
        form.setData('imgUrl', url)
        form.setError('imgUrl','')
        close();
    }

    console.log('campaign: ', campaign.is_lock)
    return <Stack gap={0} mr={'xs'}>
        <AppCard title={'message layout'}>
            <Stack mx={'xs'} gap={'xs'}>
                <Stack gap={'xs'}>
                    <Text fz={13}>You can select a layout with or without an extensive image besides an icon for your message design.</Text>
                    <SegmentedControl
                        value={form.data.isImg.toString()}
                        onChange={(e) => form.setData('isImg', e)}
                        data={[
                            { label: 'Icon only', value: '0' },
                            { label: 'Icon & Image', value: '1' },
                        ]}
                        w={'40%'}
                        disabled={campaign?.is_lock ? true : false}
                    />

                    <Text fw={500} fz={16}>Message Icon</Text>
                    <Group>
                        <Radio checked={form.data.icon == '0'} label="Default Icon" value="0" color={'green'} onChange={() => form.setData('icon', 0)}  disabled={campaign?.is_lock ? true : false} />
                        <Radio checked={form.data.icon == '1'} label="Custom Icon" value="1" color={'green'} onChange={() => form.setData('icon', 1)}  disabled={campaign?.is_lock ? true : false}/>
                    </Group>
                    {form.data.icon == 1 && <Flex direction={'column'} w={'60%'} justify={'end'}>
                        <TextInput
                            placeholder="Choose Icon"
                            readOnly={true}
                            mb={'xs'}
                            value={form.data.customIcon}
                            error={form.errors.customIcon}
                            disabled={campaign?.is_lock ? true : false}
                        />

                        {campaign.is_lock == 0 &&  <Flex justify={'end'}>
                            <UploadFileButton setImageSelected={setIconSelected} />
                        </Flex>}
                    </Flex>}

                    {form.data.isImg == 1 && <Flex direction={'column'} w={'60%'} justify={'end'}>
                        <Text fw={500} fz={16}>Message Image</Text>
                        <TextInput
                            placeholder="Choose Image"
                            mb={'xs'}
                            value={form.data.imgUrl}
                            onChange={(e) => form.setData('imgUrl', e.target.value)}
                            error={form.errors.imgUrl}
                            disabled={campaign?.is_lock ? true : false}
                        />

                        {campaign.is_lock == 0 && <Flex justify={'end'}>
                            <UploadFileButton setImageSelected={setImgSelected} />
                        </Flex>}
                    </Flex>}

                </Stack>

                <Divider my="md" variant="dashed"  />

                <Stack gap={'xs'}>
                    <Text fw={500} fz={16}>Message Content</Text>
                    <TextInput
                        label={'Message Title'}
                        placeholder="Enter Message Title"
                        w={'60%'}
                        value={form.data.title}
                        onChange={(e) => {form.setData('title',e.target.value); form.setError('title','')}}
                        error={form.errors.title}
                        disabled={campaign?.is_lock ? true : false}
                    />
                    <TextInput
                        label={'Message Description'}
                        placeholder="Enter Message Description"
                        w={'60%'}
                        value={form.data.desc}
                        onChange={(e) => {form.setData('desc',e.target.value); form.setError('desc', '')}}
                        error={form.errors.desc}
                        disabled={campaign?.is_lock ? true : false}
                    />
                </Stack>

                <Divider my="md" variant="dashed"  />

                <Text fw={500} fz={16}>Message Link</Text>
                <Stack gap={'xs'} w={'60%'}>
                    <SegmentedControl
                        value={form.data.link.toString()}
                        onChange={(e) => form.setData('link', e)}
                        data={[
                            { label: 'Category', value: 'category' },
                            { label: 'Product', value: 'product' },
                            { label: 'Page', value: 'page' },
                            { label: 'External', value: 'external' },
                        ]}
                        disabled={campaign?.is_lock ? true : false}
                    />
                    {form.data.link == 'category' &&  <Select
                        data={category}
                        placeholder="Choose Category"
                        onChange={(e) => {form.setData('linkUrl',e); form.setError('linkUrl','')}}
                        allowDeselect={false}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        value={form.data.linkUrl}
                        error={form.errors.linkUrl}
                        disabled={campaign?.is_lock ? true : false}
                    />}

                    {form.data.link == 'product' &&  <TextInput
                        placeholder="Enter Product ID"
                        onChange={(e) => {form.setData('linkUrl',e.target.value); form.setError('linkUrl','')}}
                        value={form.data.linkUrl}
                        error={form.errors.linkUrl}
                        disabled={campaign?.is_lock ? true : false}

                    />}

                    {form.data.link == 'page' &&  <Select
                        data={pages}
                        placeholder="Choose Page"
                        onChange={(e:any) => {form.setData('linkUrl', e); form.setError('linkUrl','')}}
                        allowDeselect={false}
                        value={form.data.linkUrl}
                        error={form.errors.linkUrl}
                        disabled={campaign?.is_lock ? true : false}
                    />}

                    {form.data.link == 'external' &&  <TextInput
                        placeholder="Enter Url"
                        onChange={(e) => {form.setData('linkUrl',e.target.value); form.setError('linkUrl','')}}
                        value={form.data.linkUrl}
                        error={form.errors.linkUrl}
                        disabled={campaign?.is_lock ? true : false}
                    />}
                </Stack>

                <Divider my="md" variant="dashed"  />

                <Stack gap={'xs'}>
                    <Text fw={500} fz={16}>Message Action Buttons</Text>
                    <Text fz={13}>You can assign one or two CTA (Call to Action) buttons to your message</Text>
                    <Checkbox
                        checked={form.data.actionBtn}
                        label="Enable Message Action Buttons"
                        color={'green'}
                        onChange={(e) => form.setData('actionBtn',e.currentTarget.checked)}
                        disabled={campaign?.is_lock ? true : false}
                    />
                    {form.data.actionBtn && <>
                        <Group mt={'xs'}>
                            <Radio checked={form.data.actionBtnTotal == 1} label="One Button" value="1" color={'green'} onChange={() => form.setData('actionBtnTotal', 1)}  disabled={campaign?.is_lock ? true : false}/>
                            <Radio checked={form.data.actionBtnTotal == 2} label="Two Buttons" value="2" color={'green'} onChange={() => form.setData('actionBtnTotal', 2)}  disabled={campaign?.is_lock ? true : false}/>
                        </Group>
                        {form.data.actionBtnTotal == 1 && <Paper radius={'md'} withBorder p={'md'} w={'100%'}>
                            <Stack gap={'xs'} w={'60%'}>
                                <TextInput
                                    label={'First Button Text'}
                                    placeholder={'Enter First Button Text'}
                                    value={form.data.stBtnLabel}
                                    onChange={(e) => form.setData('stBtnLabel', e.target.value)}
                                    error={form.errors.stBtnLabel}
                                    disabled={campaign?.is_lock ? true : false}
                                />

                                <SegmentedControl
                                    value={form.data.stBtnType.toString()}
                                    onChange={(e) => form.setData('stBtnType', e)}
                                    data={[
                                        { label: 'Category', value: 'category' },
                                        { label: 'Product', value: 'product' },
                                        { label: 'Page', value: 'page' },
                                        { label: 'External', value: 'external' },
                                    ]}
                                    disabled={campaign?.is_lock ? true : false}
                                />
                                    {form.data.stBtnType == 'category' &&  <Select
                                        data={category}
                                        placeholder="Choose Category"
                                        onChange={(e) => {form.setData('stBtnLink',e); form.setError('stBtnLink','')}}
                                        allowDeselect={false}
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.stBtnType == 'product' &&  <TextInput
                                        placeholder="Enter Product ID"
                                        onChange={(e) => {form.setData('stBtnLink',e.target.value); form.setError('stBtnLink','')}}
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.stBtnType == 'page' &&  <Select
                                        data={pages}
                                        placeholder="Choose Page"
                                        onChange={(e:any) => {form.setData('stBtnLink',e); form.setError('stBtnLink','')}}
                                        allowDeselect={false}
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.stBtnType == 'external' &&  <TextInput
                                        placeholder="Enter Url"
                                        onChange={(e) => {form.setData('stBtnLink',e.target.value); form.setError('stBtnLink','')}}
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}
                            </Stack>
                        </Paper>}

                        {form.data.actionBtnTotal == 2 && <Flex gap={'xs'}>
                            <Paper radius={'md'} withBorder p={'md'} w={'50%'}>
                                <Stack gap={'xs'} w={'100%'}>
                                    <TextInput
                                        label={'First Button Text'}
                                        placeholder={'Enter First Button Text'}
                                        value={form.data.stBtnLabel}
                                        onChange={(e) => {form.setData('stBtnLabel', e.target.value); form.setError('stBtnLabel','')}}
                                        error={form.errors.stBtnLabel}
                                        disabled={campaign?.is_lock ? true : false}
                                    />

                                    <SegmentedControl
                                        value={form.data.stBtnType.toString()}
                                        onChange={(e) => form.setData('stBtnType', e)}
                                        data={[
                                            { label: 'Category', value: 'category' },
                                            { label: 'Product', value: 'product' },
                                            { label: 'Page', value: 'page' },
                                            { label: 'External', value: 'external' },
                                        ]}
                                        disabled={campaign?.is_lock ? true : false}
                                    />

                                    {form.data.stBtnType == 'category' &&  <Select
                                        data={category}
                                        placeholder="Choose Category"
                                        onChange={(e) => {form.setData('stBtnLink',e); form.setError('stBtnLink','')}}
                                        allowDeselect={false}
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.stBtnType == 'product' &&  <TextInput
                                        placeholder="Enter Product ID"
                                        onChange={(e) => {form.setData('stBtnLink',e.target.value); form.setError('stBtnLink','')}}
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.stBtnType == 'page' &&  <Select
                                        data={pages}
                                        placeholder="Choose Page"
                                        onChange={(e:any) => {form.setData('stBtnLink',e); form.setError('stBtnLink','')}}
                                        allowDeselect={false}
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.stBtnType == 'external' &&  <TextInput
                                        placeholder="Enter Url"
                                        onChange={(e) => {form.setData('stBtnLink',e.target.value); form.setError('stBtnLink','')}}
                                        value={form.data.stBtnLink}
                                        error={form.errors.stBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}
                                </Stack>
                            </Paper>
                            <Paper radius={'md'} withBorder p={'md'} w={'50%'}>
                                <Stack gap={'xs'} w={'100%'}>
                                    <TextInput
                                        label={'Second Button Text'}
                                        placeholder={'Enter Second Button Text'}
                                        value={form.data.ndBtnLabel}
                                        onChange={(e) => {form.setData('ndBtnLabel', e.target.value); form.setError('ndBtnLabel','')}}
                                        error={form.errors.ndBtnLabel}
                                        disabled={campaign?.is_lock ? true : false}
                                    />

                                    <SegmentedControl
                                        value={form.data.ndBtnType.toString()}
                                        onChange={(e) => form.setData('ndBtnType', e)}
                                        data={[
                                            { label: 'Category', value: 'category' },
                                            { label: 'Product', value: 'product' },
                                            { label: 'Page', value: 'page' },
                                            { label: 'External', value: 'external' },
                                        ]}
                                        disabled={campaign?.is_lock ? true : false}
                                    />

                                    {form.data.ndBtnType == 'category' &&  <Select
                                        data={category}
                                        placeholder="Choose Category"
                                        onChange={(e) => {form.setData('ndBtnLink',e); form.setError('ndBtnLink','')}}
                                        allowDeselect={false}
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        value={form.data.ndBtnLink}
                                        error={form.errors.ndBtnLink}
                                        disabled={campaign?.is_lock ? true : false}

                                    />}

                                    {form.data.ndBtnType == 'product' &&  <TextInput
                                        placeholder="Enter Product ID"
                                        onChange={(e) => {form.setData('ndBtnLink',e.target.value); form.setError('ndBtnLink','')}}
                                        value={form.data.ndBtnLink}
                                        error={form.errors.ndBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.ndBtnType == 'page' &&  <Select
                                        data={pages}
                                        placeholder="Choose Page"
                                        onChange={(e:any) => {form.setData('ndBtnLink',getNameCategory(e)); form.setError('ndBtnLink','')}}
                                        allowDeselect={false}
                                        value={form.data.ndBtnLink}
                                        error={form.errors.ndBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}

                                    {form.data.ndBtnType == 'external' &&  <TextInput
                                        placeholder="Enter Url"
                                        onChange={(e) => {form.setData('ndBtnLink',e.target.value); form.setError('ndBtnLink','')}}
                                        value={form.data.ndBtnLink}
                                        error={form.errors.ndBtnLink}
                                        disabled={campaign?.is_lock ? true : false}
                                    />}
                                </Stack>
                            </Paper>

                        </Flex>}
                    </>}
                </Stack>

                <Divider my="md" variant="dashed"  />

                <UTMForm />
            </Stack>
        </AppCard>
    </Stack>

}

export default Messagelayout;
