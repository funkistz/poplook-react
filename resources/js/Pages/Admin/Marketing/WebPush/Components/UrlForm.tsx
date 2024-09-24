import { Stack, Paper, TextInput, Select, SegmentedControl } from "@mantine/core";
import { usePage } from "@inertiajs/react";
import { getNameCategory } from "@/features/helper/Index";


function UrlForm({ form, label = false, labelBtnText, labelBtn, setLabel, type, setType, setData, url, setUrl, width = '100%' }: any) {
    const { category, pages } = usePage<any>().props;

    return <>
        <Stack gap={'xs'} w={width}>
            {label && <TextInput 
                label={labelBtnText + ' Button Text'} 
                placeholder={'Enter ' + labelBtnText + ' Button Text'}
                value={labelBtn} 
                onChange={(e) => setData(setLabel, e.target.value)} 
            />}
           
            <SegmentedControl
                value={type.toString()}
                onChange={(e) => setData(setType, e)}
                data={[
                    { label: 'Category', value: 'category' },
                    { label: 'Product', value: 'product' },
                    { label: 'Page', value: 'page' },
                    { label: 'External', value: 'external' },
                ]}
            />
            {type == 'category' &&  <Select
                data={category}
                placeholder="Choose Category"
                onChange={(e) => setData('linkUrl',e)}
                allowDeselect={false}
                searchable
                nothingFoundMessage="Nothing found..."

            />}

            {type == 'product' &&  <TextInput
                placeholder="Enter Product ID"
                onChange={(e) => setData('linkUrl',e.target.value)}

            />}

            {type == 'page' &&  <Select
                data={pages}
                placeholder="Choose Page"
                onChange={(e:any) => setData('linkUrl',getNameCategory(e))}
                allowDeselect={false}

            />}

            {type == 'external' &&  <TextInput
                placeholder="Enter Url"
                onChange={(e) => setData('linkUrl',e.target.value)}

            />}
        </Stack>
    </>;
}

export default UrlForm;
