import AppLayout from '@/Components/AppLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Text, FileInput, Modal, Group, Button, rem, createStyles, Progress,
    Card, Image, Grid, Badge, Menu, ActionIcon, SimpleGrid, Flex, Input, Switch, Select, MultiSelect, Paper, JsonInput, TextInput, Tabs, Textarea, Box, ScrollArea, NavLink, Title, Table, Pagination, NativeSelect, Highlight, Tooltip, GridCol
} from '@mantine/core';
import {
    IconPencil, IconKey, IconTrash
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import AppDatatable from '@/Components/AppDatatable';
import AppModal from '@/Components/AppModal';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppCard, AppSwitch, DeleteButton } from '@/Components';
import AppDatatableCustom from '@/Components/data-display/Table/AppDatatableCustom';
import ImageCheck from '@/Components/Image/ImageCheck';
import Checkbox from '@/Components/Checkbox';

export default function CategoryPage() {
    const { product_list, param, search } = usePage<any>().props;
    const [values, setValues] = useState({})
    const [showDeleteProduct, setShowDeleteProduct] = useState<any>({})

    const customHighlight = (data: any) => {
        if (search != null) {
            return <Highlight color="green" highlight={search} children={data} />
        }
        return data;
    }

    function Actions(data: any) {
        // if (showDeleteProduct) {
        //     return <DeleteButton color='red' iconOnly={true} onDelete={() => deleteProduct(data.id_product)}><IconTrash></IconTrash></DeleteButton>;
        // } else {
        // }
        return <Checkbox onChange={() => { }} name='id_product_delete' data-value={data.id_product} />;
    }

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any, index: any) => {
            values.push({
                'position': <>
                    <Input name='id_product' type='hidden' value={[value.id_product]} onChange={handleChange} />
                    <Input id='position' name='position' type='hidden' value={param.position_init + index}/>
                    <Input id='init_position' name='init_position' type='hidden' value={param.position_init}/>
                    {value.position}
                </>,
                'product id': value.id_product,
                'name': <Flex style={{
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                }}>
                    <Image
                        width={50}
                        height={50}
                        src={param['domain'] + 'img/tmp/product_mini_' + value.id_product + '.jpg?time=1705388282'}
                        fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                    />
                    {value.product_lang.name}
                </Flex>,
                'active': <>
                    <AppSwitch size='md' onLabel="Active" offLabel="Inactive" checked={value.product.active == 1} onChange={(e: any) => { console.log('e', e.target.checked); toggleActive(value.id, e.target.checked) }} />
                </>,
                'action': <><Actions id_product={value.id_product} /></>
            });
        })
        return values;
    }

    const deleteAllProduct = async () => {
        const all_prod_id = document.getElementsByName('id_product_delete');
        const product_id_del = [];
        for (let index = 0; index < all_prod_id.length; index++) {
            const element = all_prod_id[index];
            product_id_del.push(element.dataset.value);
        }
        const data_del = {product_id_del, category: param.category.id_category};
        onDelete(data_del);
    }

    
    const deleteProduct = async (data: any) => {
        
        const data_del = {product_id_del: [data], category: param.category.id_category};
        onDelete(data_del);
    }

    const onDelete = async (data: any) => {
        const category_id = data.category;
        const product_del = data.product_id_del;
        router.delete(route('category.destroy', category_id), {data: {product_del}});
    }

    const headerOptions = {
        'action': { ta: 'left' }
    }

    let drag = 0;
    const dragStart = (e: any) => {
        drag = e.target.parentNode;
    }

    const dragEnd = (e: any) => {
        let children = Array.from(e.target.parentNode.parentNode.children);
        if (children.indexOf(e.target.parentNode) > children.indexOf(drag)) {
            e.target.parentNode.after(drag);
        } else {
            e.target.parentNode.before(drag);
        }
        handleChange;
    }

    const row = (res: any) => {
        return <>
            {res.map((res: any, index: any) => {
                return <Table.Tr key={index}>
                    <Table.Td align='center'>{(index + 1)}</Table.Td>
                    <Table.Td draggable={true} onDragStart={dragStart} onDragOver={dragEnd}>{res.position}</Table.Td>
                    <Table.Td>{customHighlight(res.id_product)}</Table.Td>
                    <Table.Td>
                        <Flex style={{
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                        }}>
                            <Image
                                width={50}
                                height={50}
                                src={param['domain'] + 'img/tmp/product_mini_' + res.id_product + '.jpg?time=1705388282'}
                            />
                            {customHighlight(res.product_lang.name)}
                        </Flex>
                    </Table.Td>
                    <Table.Td>{customHighlight(res.product.active)}</Table.Td>
                </Table.Tr>
            })}
        </>
    }

    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
        var id_product_elem = document.getElementsByName('id_product');
        var id_category = document.getElementById('id_category');
        var position = document.getElementsByName('position');
        var init_position = document.getElementById('init_position');
        
        var product_sort = [];
        var data = {};
        for (let index = 0; index < id_product_elem.length; index++) {
            const product_elem = id_product_elem[index];
            const position_elem = position[index];
            let id_prod = product_elem.value;
            let product_pos = position_elem.value;
            product_sort.push({
                id_product: id_prod,
                position: product_pos,
                init_position: init_position?.value
            });
        }
        data = {product_sort}
        // setValues(id_product_arr);

        e.preventDefault()
        router.put('/category/' + id_category?.value, data);
        window.location.reload();
    }

    const checkAll = (e: any) => {
        let parent = e.target;
        var delete_elem = document.getElementsByName('id_product_delete');
        if (!parent.checked) {
            setShowDeleteProduct(true);
        } else {
            setShowDeleteProduct(false);
            delete_elem.forEach(element => {
                element.style.backgroundColor = 'red';
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <AppCard title={param.category.categories_lang[0].name}>
                    <Grid>
                        <GridCol span={10}></GridCol>
                        <GridCol span={2} style={{ textAlign: 'right' }}>
                            <Checkbox
                                size="lg"
                                label="test"
                                onChange={checkAll}
                            />
                            <DeleteButton onClick={deleteAllProduct}>Delete</DeleteButton>
                        </GridCol>
                    </Grid>
                    <AppDatatableCustom
                        headerOptions={headerOptions}
                        data={tableData(product_list.data)}
                        meta={product_list}
                        // children={row(product_list.data)}
                        canSort={[{ label: 'position', value: 'position' }, { label: 'product id', value: 'product id' }]}
                        dragAble={[{ index: 0 }]}
                    />
                    <Grid mt={10} p={10} style={{ position: 'sticky', bottom: 10, backgroundColor: 'white' }}>
                        <GridCol span={10}></GridCol>
                        <GridCol span={2} style={{ textAlign: 'right' }}>
                            <Input type='hidden' id='id_category' name='id_category' value={param.category.id_category} />
                            <Button type='submit' color='green'>Submit</Button>
                        </GridCol>
                    </Grid>
                </AppCard>
                {/* <AppDatatable
                data={product_list}
                head={header}
                row={row(product_list.data)}
            /> */}
            </form>
        </>
    );

}

CategoryPage.layout = (page: any) => <AdminLayout back={true} children={page} title='Category List' />;