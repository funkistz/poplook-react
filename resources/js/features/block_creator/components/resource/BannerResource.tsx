import { usePage } from "@inertiajs/react";
import { Paper, Select, TextInput, Tabs, Switch, Text, Flex, ActionIcon, Group, Checkbox, SegmentedControl, Tooltip } from "@mantine/core";
import { IconAlertCircle, IconArrowDown, IconArrowUp, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import AppModal from "@/Components/AppModal";
import { setResource, deleteResource, setChildBLock } from "../../redux/blockSlice";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { UploadFileButton } from "@/features/custom_upload_file/Index";
import { getIdCategory, getNameCategory } from "@/features/helper/Index";
import { TextWithStyle } from "../../index";
import { defaultLinkData } from "../../values";

function BannerResource({ index, resource, childBlock, setPosition, lastIndex }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Define
    const { categoryList, pagesList } = usePage<any>().props;
    const [multiShop, setMultiShop] = useState(childBlock.multiShop ? childBlock.multiShop : false)
    const [activeShop, setActiveShop] = useState<any>(null)
    const [alert, setAlert] = useState<boolean>(false)

    const blockWithImage = ['block', 'grid', 'carousel', 'slider', 'vimeo', 'countdown'];
    const blockWithLabel = ['carousel', 'slider', 'text', 'navigation_list'];
    const blockFullStyle = ['text'];

    // Function
    const onChangeMultiShop = (e: any) => {
        setMultiShop(e)
        const newChild = JSON.parse(JSON.stringify(childBlock));
        newChild.multiShop = e;

        if (!e) {
            setActiveShop(null)
        } else {
            setActiveShop('myr')
        }

        dispatch(setChildBLock(newChild))
    }
    const updateResource = (params: any, shop: any = null, other: any = null) => {

        const newResource = JSON.parse(JSON.stringify(resource));

        for (const key of Object.keys(params)) {
            if (key == 'categoryId') {
                if (shop) {
                    newResource[shop][key] = getIdCategory(params[key]);
                    newResource[shop].link = params[key];
                } else {
                    newResource.myr[key] = getIdCategory(params[key]);
                    newResource.myr.link = params[key];

                    newResource.sgd[key] = getIdCategory(params[key]);
                    newResource.sgd.link = params[key];

                    newResource.usd[key] = getIdCategory(params[key]);
                    newResource.usd.link = params[key];
                }
            } else if (key == 'linkData') {
                const findName = categoryList.find((option: any) => option.value === params[key])
                if (shop) {
                    !newResource[shop].linkData && (newResource[shop].linkData = { ...defaultLinkData });

                    newResource[shop][key].id = getIdCategory(params[key]);
                    newResource[shop][key].name = getNameCategory(findName.label);
                    newResource[shop][key].url = getNameCategory(findName.value);
                    newResource[shop].linkData.type = newResource[shop].linkData.type;
                    newResource[shop].link = params[key];
                } else {
                    !newResource.myr.linkData && (newResource.myr.linkData = { ...defaultLinkData });
                    !newResource.sgd.linkData && (newResource.sgd.linkData = { ...defaultLinkData });
                    !newResource.usd.linkData && (newResource.usd.linkData = { ...defaultLinkData });

                    newResource.myr.linkData.id = getIdCategory(params[key]);
                    newResource.myr.linkData.name = getNameCategory(findName.label);
                    newResource.myr.linkData.type = newResource.myr.linkData.type;
                    newResource.myr.linkData.url = getNameCategory(findName.value);
                    newResource.myr.link = params[key];

                    newResource.sgd.linkData.id = getIdCategory(params[key]);
                    newResource.sgd.linkData.name = getNameCategory(findName.label);
                    newResource.sgd.linkData.type = newResource.myr.linkData.type;
                    newResource.sgd.linkData.url = getNameCategory(findName.value);
                    newResource.sgd.link = params[key];

                    newResource.usd.linkData.id = getIdCategory(params[key]);
                    newResource.usd.linkData.name = getNameCategory(findName.label);
                    newResource.usd.linkData.type = newResource.myr.linkData.type;
                    newResource.usd.linkData.url = getNameCategory(findName.value);
                    newResource.usd.link = params[key];
                }
            } else if (key == 'linkPage') {
                const findName = pagesList.find((option: any) => option.value === params[key])
                if (shop) {
                    !newResource[shop].linkData && (newResource[shop].linkData = { ...defaultLinkData });

                    newResource[shop].linkData.id = getIdCategory(params[key]);
                    newResource[shop].linkData.name = getNameCategory(findName.label);
                    newResource[shop].linkData.type = newResource[shop].linkData.type;
                    newResource[shop].linkData.url = getNameCategory(findName.value);
                    newResource[shop].link = 'page/' + getNameCategory(findName.value);
                } else {
                    !newResource.myr.linkData && (newResource.myr.linkData = { ...defaultLinkData });
                    !newResource.sgd.linkData && (newResource.sgd.linkData = { ...defaultLinkData });
                    !newResource.usd.linkData && (newResource.usd.linkData = { ...defaultLinkData });

                    newResource.myr.linkData.id = getIdCategory(params[key]);
                    newResource.myr.linkData.name = getNameCategory(findName.label);
                    newResource.myr.linkData.type = newResource.myr.linkData.type;
                    newResource.myr.linkData.url = getNameCategory(findName.value);
                    newResource.myr.link = 'page/' + getNameCategory(findName.value);

                    newResource.sgd.linkData.id = getIdCategory(params[key]);
                    newResource.sgd.linkData.name = getNameCategory(findName.label);
                    newResource.sgd.linkData.type = newResource.myr.linkData.type;
                    newResource.sgd.linkData.url = getNameCategory(findName.value);
                    newResource.sgd.link = 'page/' + getNameCategory(findName.value);

                    newResource.usd.linkData.id = getIdCategory(params[key]);
                    newResource.usd.linkData.name = getNameCategory(findName.label);
                    newResource.usd.linkData.type = newResource.myr.linkData.type;
                    newResource.usd.linkData.url = getNameCategory(findName.value);
                    newResource.usd.link = 'page/' + getNameCategory(findName.value);
                }
            } else if (key == 'productId') {

                if (shop) {
                    newResource[shop].linkData = { ...newResource[shop].linkData, id: params[key], url: '' };
                    newResource[shop].link = 'product/' + params[key] + '-' + newResource[shop].linkData.name.replace(/\s/g, '-');
                } else {
                    newResource.myr.linkData = { ...newResource.myr.linkData, id: params[key], url: '' };
                    newResource.myr.link = 'product/' + params[key] + '-' + newResource.myr.linkData.name.replace(/\s/g, '-');

                    newResource.sgd.linkData = { ...newResource.sgd.linkData, id: params[key], url: '' };
                    newResource.sgd.link = 'product/' + params[key] + '-' + newResource.myr.linkData.name.replace(/\s/g, '-');

                    newResource.usd.linkData = { ...newResource.usd.linkData, id: params[key], url: '' };
                    newResource.usd.link = 'product/' + params[key] + '-' + newResource.myr.linkData.name.replace(/\s/g, '-');
                }
            } else if (key == 'productName') {
                if (shop) {
                    newResource[shop].linkData = { ...newResource[shop].linkData, name: params[key], url: '' };
                    newResource[shop].link = 'product/' + newResource[shop].linkData.id + '-' + params[key].replace(/\s/g, '-');
                } else {
                    newResource.myr.linkData = { ...newResource.myr.linkData, name: params[key], url: '' };
                    newResource.myr.link = 'product/' + newResource.myr.linkData.id + '-' + params[key].replace(/\s/g, '-');

                    newResource.sgd.linkData = { ...newResource.sgd.linkData, name: params[key], url: '' };
                    newResource.sgd.link = 'product/' + newResource.myr.linkData.id + '-' + params[key].replace(/\s/g, '-');

                    newResource.usd.linkData = { ...newResource.usd.linkData, name: params[key], url: '' };
                    newResource.usd.link = 'product/' + newResource.myr.linkData.id + '-' + params[key].replace(/\s/g, '-');
                }
            } else if (key == 'selectType') { // category or product or page
                if (shop) {
                    !newResource[shop].linkData && (newResource[shop].linkData = { ...defaultLinkData });

                    newResource[shop].linkData.id = newResource[shop].linkData.id;
                    newResource[shop].linkData.name = newResource[shop].linkData.name;
                    newResource[shop].linkData.type = params[key];
                    newResource[shop].link = newResource[shop].link;
                } else {
                    !newResource.myr.linkData && (newResource.myr.linkData = { ...defaultLinkData });
                    !newResource.sgd.linkData && (newResource.sgd.linkData = { ...defaultLinkData });
                    !newResource.usd.linkData && (newResource.usd.linkData = { ...defaultLinkData });

                    newResource.myr.linkData.id = newResource.myr.linkData.id;
                    newResource.myr.linkData.name = newResource.myr.linkData.name;
                    newResource.myr.linkData.type = params[key];
                    newResource.myr.link = newResource.myr.link;

                    newResource.sgd.linkData.id = newResource.myr.linkData.id;
                    newResource.sgd.linkData.name = newResource.myr.linkData.name;
                    newResource.sgd.linkData.type = params[key];
                    newResource.sgd.link = newResource.myr.link;

                    newResource.usd.linkData.id = newResource.myr.linkData.id;
                    newResource.usd.linkData.name = newResource.myr.linkData.name;
                    newResource.usd.linkData.type = params[key];
                    newResource.usd.link = newResource.myr.link;
                }
            } else if (key == 'link') {
                if (shop) {
                    newResource[shop][key] = params[key];
                } else {
                    newResource.myr[key] = params[key];
                    newResource.sgd[key] = params[key];
                    newResource.usd[key] = params[key];
                }
            } else if (key == 'internalLink') {
                if (shop) {
                    newResource[shop][key] = params[key];
                    newResource[shop].link = '';
                } else {
                    newResource.myr[key] = params[key];
                    newResource.myr.link = '';
                   
                    newResource.sgd[key] = params[key];
                    newResource.sgd.link = '';

                    newResource.usd[key] = params[key];
                    newResource.usd.link = '';
                }
            } else if (other == 'labelObj') { // for resource obj
                if (shop) {
                    newResource[shop][other] = params;
                } else {
                    newResource.myr[other] = params;
                    newResource.sgd[other] = params;
                    newResource.usd[other] = params;
                }
            } else {
                if (shop) {
                    newResource[shop][key] = params[key];
                } else {
                    newResource.myr[key] = params[key];
                    newResource.sgd[key] = params[key];
                    newResource.usd[key] = params[key];
                }
            }
        }

        dispatch(setResource({
            index: index,
            resource: newResource,
        }));
    }

    const onDeleteResource = () => {
        dispatch(deleteResource({
            index: index
        }));
    }

    // Components
    const content = (shop: any = null) => {


        const setImageSelected = (url: any, type: any) => {

            if (multiShop) {
                updateResource({ href: url, type: type }, activeShop)
                close();
                return
            }

            updateResource({ href: url, type: type }, shop)
            close();
        }

        const setHoverSelected = (url: any, type: any) => {

            if (multiShop) {
                updateResource({ hoverHrefUrl: url, type: type }, activeShop)
                close();
                return
            }

            updateResource({ hoverHrefUrl: url, type: type }, shop)
            close();
        }

        return <>
            <AppModal
                data={'Are you sure you want to delete ?'}
                size={'md'}
                opened={alert}
                close={() => setAlert(false)}
                title={'Delete Block'}
                closeOutside={false}
                closeOnEscape={false}
                center={true}
                textSubmit={'Delete'}
                submitColor={'red'}
                action={onDeleteResource}
                index={index}
            ></AppModal>

            {blockWithImage.includes(childBlock.type) && <>
                <TextInput
                    label="Image or Video"
                    placeholder="Image or Video"
                    mb={10}
                    size='xs'
                    value={shop ? resource.myr.href != null ? resource[shop].href : resource[shop].myr : resource.myr.href != null ? resource.myr.href : ''}
                    onChange={(e) => updateResource({ 'href': e.target.value }, shop)}
                />

                <Flex justify={'end'} mb={10}>
                    <UploadFileButton setImageSelected={setImageSelected} />
                </Flex>

                <Flex mb={5} align={'center'}>
                    <Text size={'xs'} fw={500} c={'#212529'}>Hover</Text>
                    <Text ml={5} fz={10} c={'dimmed'} fs="italic">*Image Only</Text>

                    <Checkbox
                        checked={shop ? resource.myr.isHoverHref ? true : false : resource.myr.isHoverHref ? true : false}
                        disabled={shop ? (resource.myr.type == 'video' || resource.myr.type == null) ? true : false : (resource.myr.type == 'video' || resource.myr.type == null) ? true : false}
                        size={'xs'}
                        ml={10}
                        onChange={(e) => updateResource({ 'isHoverHref': e.target.checked }, shop)}
                    />

                </Flex>

                {
                    shop ?
                        resource[shop].isHoverHref && <>
                            <TextInput
                                placeholder="Hover Image or Video"
                                mb={10}
                                size='xs'
                                value={shop ? resource[shop].hoverHrefUrl != null ? resource[shop].hoverHrefUrl : resource[shop].hoverHrefUrl : resource[shop].hoverHrefUrl != null ? resource[shop].hoverHrefUrl : ''}
                                onChange={(e) => updateResource({ 'hoverHrefUrl': e.target.value }, shop)}
                            />
                            <Flex justify={'end'} mb={10}>
                                <UploadFileButton setImageSelected={setHoverSelected} />
                            </Flex>
                        </>

                        :
                        resource.myr.isHoverHref && <>
                            <TextInput
                                placeholder="Hover Image or Video"
                                mb={10}
                                size='xs'
                                value={shop ? resource.myr.hoverHrefUrl != null ? resource.myr.hoverHrefUrl : resource.myr.hoverHrefUrl : resource.myr.hoverHrefUrl != null ? resource.myr.hoverHrefUrl : ''}
                                onChange={(e) => updateResource({ 'hoverHrefUrl': e.target.value }, shop)}
                            />
                            <Flex justify={'end'} mb={10}>
                                <UploadFileButton setImageSelected={setHoverSelected} />
                            </Flex>
                        </>
                }
            </>}
            <Text fz={12} fw={400}>Link</Text>

            <SegmentedControl
                data={[
                    { label: 'Category', value: 'category' },
                    { label: 'Product', value: 'product' },
                    { label: 'Page', value: 'page' },
                ]}
                size={'xs'}
                fullWidth
                mb={5}
                value={shop ? resource[shop]?.linkData?.type : resource.myr?.linkData?.type}
                onChange={(e) => { updateResource({ 'selectType': e }, shop) }}
            />

            {shop ?
                <>
                    {resource[shop]?.linkData?.type == 'category' && <>
                        {resource[shop]?.internalLink ?
                            <Select
                                size='xs'
                                mb={10}
                                placeholder="Category"
                                searchable
                                withCheckIcon={false}
                                nothingFoundMessage="No options"
                                value={resource[shop].link != null ? resource[shop].link : ''}
                                data={categoryList}
                                onChange={(e: any) => updateResource({ 'linkData': e }, shop)}
                            />
                            :
                            <TextInput
                                mb={10}
                                size='xs'
                                placeholder={'Link'}
                                value={resource[shop].link != null ? resource[shop].link : ''}
                                onChange={(e: any) => updateResource({ 'link': e.target.value }, shop)}
                            />}
                    </>}

                    {resource[shop]?.linkData?.type == 'product' && <>
                        {resource[shop]?.internalLink ?
                            <Flex direction={'row'} mb={10}>
                                <TextInput
                                    size='xs'
                                    w={'30%'}
                                    mr={5}
                                    placeholder={'Id'}
                                    value={resource[shop]?.linkData?.id != null ? resource[shop]?.linkData?.id : ''}
                                    onChange={(e: any) => updateResource({ 'productId': e.target.value }, shop)}
                                    rightSection={
                                        <Tooltip label="Id" position="top-end" withArrow>
                                            <div>
                                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                            </div>
                                        </Tooltip>
                                    }
                                />
                                <TextInput
                                    size='xs'
                                    w={'70%'}
                                    placeholder={'Link'}
                                    value={resource[shop]?.linkData?.name ? resource[shop]?.linkData?.name : ''}
                                    onChange={(e: any) => updateResource({ 'productName': e.target.value }, shop)}
                                    rightSection={
                                        <Tooltip label="Name" position="top-end" withArrow>
                                            <div>
                                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                            </div>
                                        </Tooltip>
                                    }
                                />
                            </Flex>
                            :
                            <TextInput
                                mb={10}
                                size='xs'
                                placeholder={'Link'}
                                value={resource[shop].link != null ? resource[shop].link : ''}
                                onChange={(e: any) => updateResource({ 'link': e.target.value }, shop)}
                            />}
                    </>}

                    {resource[shop]?.linkData?.type == 'page' && <>
                        {resource[shop]?.internalLink ?
                            <Select
                                size='xs'
                                mb={10}
                                placeholder="Page"
                                searchable
                                withCheckIcon={false}
                                nothingFoundMessage="No options"
                                // value={resource[shop].link != null ? resource[shop].link : ''}
                                value={resource[shop].linkData?.id != null ? resource[shop].linkData?.id + '-' + resource[shop].linkData?.url : ''}
                                data={pagesList}
                                onChange={(e: any) => updateResource({ 'linkPage': e }, shop)}
                            />
                            :
                            <TextInput
                                mb={10}
                                size='xs'
                                placeholder={'Link'}
                                value={resource[shop].link != null ? resource[shop].link : ''}
                                onChange={(e: any) => updateResource({ 'link': e.target.value }, shop)}
                            />}
                    </>}
                </>
                :
                <>
                    {resource.myr?.linkData?.type == 'category' && <>
                        {resource.myr?.internalLink ?
                            <Select
                                size='xs'
                                mb={10}
                                placeholder="Category"
                                searchable
                                withCheckIcon={false}
                                nothingFoundMessage="No options"
                                value={resource.myr.link != null ? resource.myr.link : ''}
                                data={categoryList}
                                onChange={(e: any) => updateResource({ 'linkData': e }, shop)}
                            />
                            :
                            <TextInput
                                mb={10}
                                size='xs'
                                placeholder={'Link'}
                                value={resource.myr.link != null ? resource.myr.link : ''}
                                onChange={(e: any) => updateResource({ 'link': e.target.value }, shop)}
                            />}
                    </>}

                    {resource.myr?.linkData?.type == 'product' && <>
                        {resource.myr?.internalLink ?
                            <Flex direction={'row'} mb={10}>
                                <TextInput
                                    size='xs'
                                    w={'30%'}
                                    mr={5}
                                    placeholder={'Id'}
                                    value={resource.myr?.linkData?.id != null ? resource.myr?.linkData?.id : ''}
                                    onChange={(e: any) => updateResource({ 'productId': e.target.value }, shop)}
                                    rightSection={
                                        <Tooltip label="Id" position="top-end" withArrow>
                                            <div>
                                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                            </div>
                                        </Tooltip>
                                    }
                                />
                                <TextInput
                                    size='xs'
                                    w={'70%'}
                                    placeholder={'Link'}
                                    value={resource.myr?.linkData?.name ? resource.myr?.linkData?.name : ''}
                                    onChange={(e: any) => updateResource({ 'productName': e.target.value }, shop)}
                                    rightSection={
                                        <Tooltip label="Name" position="top-end" withArrow>
                                            <div>
                                                <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                            </div>
                                        </Tooltip>
                                    }
                                />
                            </Flex>
                            :
                            <TextInput
                                mb={10}
                                size='xs'
                                placeholder={'Link'}
                                value={resource.myr.link != null ? resource.myr.link : ''}
                                onChange={(e: any) => updateResource({ 'link': e.target.value }, shop)}
                            />}
                    </>}

                    {resource.myr?.linkData?.type == 'page' && <>
                        {resource.myr?.internalLink ?
                            <Select
                                size='xs'
                                mb={10}
                                placeholder="Page"
                                searchable
                                withCheckIcon={false}
                                nothingFoundMessage="No options"
                                value={resource.myr.linkData?.id != null ? resource.myr.linkData?.id + '-' + resource.myr.linkData?.url : ''}
                                data={pagesList}
                                onChange={(e: any) => updateResource({ 'linkPage': e }, shop)}
                            />

                            :
                            <TextInput
                                mb={10}
                                size='xs'
                                placeholder={'Link'}
                                value={resource.myr.link != null ? resource.myr.link : ''}
                                onChange={(e: any) => updateResource({ 'link': e.target.value }, shop)}
                            />}
                    </>}
                </>}

            <Flex justify='space-between'>
                <Group gap={8}>
                    <Text size="xs">Open in new tab:</Text>
                    <Checkbox
                        checked={shop ? resource.myr.isNewTab ? true : false : resource.myr.isNewTab ? true : false}
                        size={'xs'}
                        ml={10}
                        onChange={(e) => updateResource({ 'isNewTab': e.target.checked }, shop)}
                    />
                </Group>

                <Switch
                    onLabel="Internal"
                    offLabel="External"
                    size='lg'
                    checked={shop != null ? resource[shop].internalLink : resource.myr.internalLink}
                    onChange={(e: any) => updateResource({ 'internalLink': e.target.checked }, shop)}
                />
            </Flex>

            {blockWithLabel.includes(childBlock.type) && <>
                <TextWithStyle
                    obj={shop ? resource[shop].labelObj : resource.myr.labelObj}
                    onChangeData={updateResource}
                    onChangeType={'resource'}
                    title={"Label"}
                    resourceShop={shop}
                    withStyle={blockFullStyle.includes(childBlock.type) ? true : false}
                />
            </>}
        </>
    }

    return (<>

        <Paper withBorder p="md" mb={10} bg="lime.0">

            <Flex justify='space-between'>
                <Switch
                    onLabel="Multi Shop"
                    offLabel="All Shop"
                    size='lg'
                    checked={multiShop}
                    onChange={(e: any) => onChangeMultiShop(e.target.checked)}
                    mb='xl'
                />
                <Flex gap={'xs'}>
                    {childBlock.type != 'block' && childBlock.resource.length >= 2 &&
                        <>
                            <ActionIcon color="dark" variant="light" onClick={(e) => setPosition('up', index)} disabled={index == 0}>
                                <IconArrowUp size="1.125rem" />
                            </ActionIcon>
                            <ActionIcon color="dark" variant="light" onClick={(e) => setPosition('down', index)} disabled={lastIndex - 1 == index}>
                                <IconArrowDown size="1.125rem" />
                            </ActionIcon>
                            <ActionIcon color='red' size='md' variant="filled" onClick={() => setAlert(true)} >
                                <IconTrash size="1.125rem" />
                            </ActionIcon>
                        </>
                    }
                </Flex>

            </Flex>

            {!multiShop && content()}

            {multiShop && <Tabs defaultValue='myr' onChange={setActiveShop}>
                <Tabs.List grow>
                    <Tabs.Tab value="myr">
                        <Text fz={12}>Myr</Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="sgd">
                        <Text fz={12}>Sgd</Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="usd">
                        <Text fz={12}>Usd</Text>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="myr" pt="xs" p={0}>
                    {content('myr')}
                </Tabs.Panel>
                <Tabs.Panel value="sgd" pt="xs" p={0}>
                    {content('sgd')}
                </Tabs.Panel>
                <Tabs.Panel value="usd" pt="xs" p={0}>
                    {content('usd')}
                </Tabs.Panel>

            </Tabs>
            }

        </Paper>
    </>);
}

export default BannerResource;