import { usePage } from "@inertiajs/react";
import { Paper, Select, TextInput, Tabs, Switch, Text, Flex} from "@mantine/core";
import { useState } from "react";
import AppModal from "@/Components/AppModal";
import { deleteResource } from "@/features/block_creator/redux/blockSlice";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getIdCategory } from "@/features/helper/Index";
import { TextWithStyle } from "@/features/block_creator";

function MenuResource({ index, resource, setResource }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Define
    const { categoryList } = usePage<any>().props;
    const [multiShop, setMultiShop] = useState(false)
    const [activeShop, setActiveShop] = useState<any>(null)
    const [alert, setAlert] = useState<boolean>(false)

    // Function
    const onChangeMultiShop = (e: any) => {
        setMultiShop(e)
        if (!e) {
            setActiveShop(null)
        } else {
            setActiveShop('myr')
        }
    }

    const updateResource = (prop: any, value: any, shop: any = null, propChild: any = null) => {
        // console.log('value: ', value)
        const newResource = JSON.parse(JSON.stringify(resource));
        if (prop == 'categoryId') {
            if (shop) {
                newResource[shop][prop] = getIdCategory(value);
                newResource[shop].link = value;
            } else {
                newResource.myr[prop] = getIdCategory(value);
                newResource.myr.link = value;

                newResource.sgd[prop] = getIdCategory(value);
                newResource.sgd.link = value;

                newResource.usd[prop] = getIdCategory(value);
                newResource.usd.link = value;
            }
        } else if (prop == 'link') {
            if (shop) {
                newResource[shop][prop] = value;
                newResource[shop].categoryId = null;
            } else {
                newResource.myr[prop] = value;
                newResource.myr.categoryId = null;

                newResource.sgd[prop] = value;
                newResource.sgd.categoryId = null;

                newResource.usd[prop] = value;
                newResource.usd.categoryId = null;
            }
        } else if (prop == 'internalLink') {
            if (shop) {
                newResource[shop][prop] = value;
                newResource[shop].link = '';
                newResource[shop].categoryId = null;
            } else {
                newResource.myr[prop] = value;
                newResource.myr.link = '';
                newResource.myr.categoryId = null;

                newResource.sgd[prop] = value;
                newResource.sgd.link = '';
                newResource.sgd.categoryId = null;

                newResource.usd[prop] = value;
                newResource.usd.link = '';
                newResource.usd.categoryId = null;
            }
        } else {
            if (propChild != null) {
                if (shop) {
                    newResource[shop][prop][propChild] = value;
                } else {
                    newResource.myr[prop][propChild] = value;
                    newResource.sgd[prop][propChild] = value;
                    newResource.usd[prop][propChild] = value;
                }
            } else {
                if (shop) {
                    newResource[shop][prop] = value;
                } else {
                    newResource.myr[prop] = value;
                    newResource.sgd[prop] = value;
                    newResource.usd[prop] = value;
                }
            }

        }

        setResource(index, newResource);
    }

    const onDeleteResource = () => {
        dispatch(deleteResource({
            index: index
        }));
    }

    // Components
    const content = (shop: any = null) => {

        const setImageSelected = (url: any) => {

            if (multiShop) {
                updateResource('icon', url, activeShop, 'url')
                close();
                return
            }

            updateResource('icon', url, shop, 'url')
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

            <TextWithStyle
                obj={shop ? resource[shop].labelObj : resource.myr.labelObj}
                onChangeData={updateResource}
                onChangeType={'top_menu'}
                // title={"Label"}
                topMargin={false}
                resourceShop={shop}
                withStyle
            />

            {!shop && <>
                {
                    resource.myr.internalLink && <>
                        <Select
                            size='xs'
                            // label={'Link'}
                            placeholder="Category"
                            searchable
                            nothingFoundMessage="No options"
                            my={10}
                            data={categoryList}
                            value={resource.myr.link ? resource.myr.link : ''}
                            onChange={(e: any) => updateResource('categoryId', e, shop)}
                        />
                    </>
                }

                {
                    !resource.myr.internalLink && <>
                        <TextInput
                            my={10}
                            size='xs'
                            // label={'Link'}
                            placeholder={'Link'}
                            value={resource.myr.link != null ? resource.myr.link : ''}
                            onChange={(e: any) => updateResource('link', e.target.value, shop)}
                        />
                    </>
                }

            </>}

            {shop && <>
                {
                    resource[shop].internalLink && <>
                        <Select
                            size='xs'
                            // label={'Link'}
                            my={10}
                            placeholder="Category"
                            searchable
                            nothingFoundMessage="No options"
                            value={resource[shop].link ? resource[shop].link : ''}
                            data={categoryList}
                            onChange={(e: any) => updateResource('categoryId', e, shop)}
                        />
                    </>
                }

                {
                    !resource[shop].internalLink && <>
                        <TextInput
                            my={10}
                            size='xs'
                            // label={'Link'}
                            placeholder={'Link'}
                            value={resource[shop].link != null ? resource[shop].link : ''}
                            onChange={(e: any) => updateResource('link', e.target.value, shop)}
                        />
                    </>
                }
            </>}

            <Flex justify={'end'}>
                <Switch
                    onLabel="Internal"
                    offLabel="External"
                    size='lg'
                    checked={shop != null ? resource[shop].internalLink : resource.myr.internalLink}
                    onChange={(e: any) => updateResource('internalLink', e.target.checked, shop)}
                />
            </Flex>
        </>
    }

    return (<>

        <Paper shadow={'none'}>
            <Flex justify={'space-between'} align={'center'} mb={'xs'}>
                <Text fz={15}>Label and Link</Text>
                <Switch onLabel="Multi Shop" offLabel="All Shop" size='lg' checked={multiShop} onChange={(e: any) => onChangeMultiShop(e.target.checked)} />
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

export default MenuResource;