import { Flex, Stack, Text, Paper, TextInput, Checkbox, Group, Radio, Select, SegmentedControl } from "@mantine/core";
import { usePage } from "@inertiajs/react";
import { getIdCategory, getNameCategory } from "@/features/helper/Index";


function UrlForm({ label = false, labelBtnText = null, labelBtn, setLabel, type, setType, data, setData, url, setUrl, width = '100%' }: any) {
    const { category, pages, env } = usePage<any>().props;

    const onUrl = (res:any, props: any) => {
        if(type == 0) {
            return setData(setUrl, props)
        } else if(type == 1) {
            // return setData(setUrl, props + '-business-whatsapp')
            return setData(setUrl, props)
        } else if(type == 2) {
            return setData(setUrl, getNameCategory(props))
        } else if(type == 3) {
            return setData(setUrl, props)
        }
    }

    const onChangeSegment = (props: any) => {
        // clear url when type change
        return setData({
            ...data,
            linkType: props,
            linkUrl: ''
        });
    }

    return <>
        <Stack gap={'xs'} w={width}>
            {label && <TextInput 
                label={labelBtnText ? labelBtnText : ' Button Text'} 
                placeholder={labelBtnText ? 'Enter ' + labelBtnText + ' Button Text' : 'Enter Button Text'}
                value={labelBtn} 
                onChange={(e) => setData(setLabel, e.target.value)} 
            />}
           
            <SegmentedControl
                value={type.toString()}
                onChange={(e) => onChangeSegment(e)}
                data={[
                    { label: 'Category', value: '0' },
                    { label: 'Product', value: '1' },
                    { label: 'page', value: '2' },
                    { label: 'External', value: '3' },
                ]}
            />
            {type == 0 &&  <Select
                data={category}
                value={url}
                placeholder="Choose Category"
                onChange={(e) => onUrl(type, e)}
                allowDeselect={false}
                searchable
                nothingFoundMessage="Nothing found..."

            />}

            {type == 1 &&  <TextInput
                placeholder="Enter Product ID"
                value={url}
                onChange={(e) => onUrl(type, e.target.value)}

            />}

            {type == 2 &&  <Select
                data={pages}
                placeholder="Choose Page"
                value={url}
                onChange={(e) => onUrl(type,e)}
                allowDeselect={false}
                searchable
                nothingFoundMessage="Nothing found..."

            />}

            {type == 3 &&  <TextInput
                placeholder="Enter Url"
                value={url}
                onChange={(e) => onUrl(type, e.target.value)}

            />}
        </Stack>
    </>;
}

export default UrlForm;
