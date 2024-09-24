import { AppCard, AppTable, ConfirmButton, DeleteButton } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { getShopName } from '@/features/helper/Index';
import { Link, router, usePage } from '@inertiajs/react';
import { ActionIcon, Badge, Button, Flex, Group, Image, Switch, Text, Tooltip } from '@mantine/core';
import { IconEdit, IconPencil } from '@tabler/icons-react';
import { IconAdjustments, IconCopy, IconFileExport, IconPlus, IconTrash } from '@tabler/icons-react';

export default function ProductPage() {

    const { list, search, domain } = usePage<any>().props;

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'ID': value.id_product,
                'name': <Flex direction={'row'} wrap={'nowrap'} align={'center'} style={{ maxWidth: 250 }}>
                    <Image
                        width={50}
                        height={50}
                        mr={'xs'}
                        src={domain + 'img/tmp/product_mini_' + value.id_product + '.jpg?time=1705388282'}
                        fallbackSrc={'No_image.png'}
                    />
                    <Text fz={13} truncate="end">{value.product_lang?.name ? value.product_lang?.name : '-'}</Text>
                </Flex>,
                'reference': value.reference,
                'shop': getShopName(value.id_shop_default, true),
                'base price': <Text fz={13}>RM&nbsp;{Number(value.price).toFixed(2)}</Text>,
                'final price': finalPrice(Number(value.price).toFixed(2), value.specific_price),
                'quantity': value.product_availability ? value.product_availability.sum_qty : '-',
                // 'stock': value.product_avaibility ? value.product_avaibility.sum_qty > 0 ? <Badge variant="light" color="blue">In stock</Badge> : <Badge variant="light" color="red">Out of stock</Badge> : '-',
                'status': <Switch
                    checked={value.active}
                    onLabel="Active" offLabel="Inactive"
                    radius="sm"
                    size={'md'}
                    onChange={(event) => toggle(event.currentTarget.checked, value.id_product)}
                />,
                'action':
                    <Group justify='right' gap='xs'>
                        <Tooltip label="Edit">
                            <ActionIcon variant="filled" color={'blue'} component="a" href={route('product.show', { id: value.id_product })}>
                                <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Duplicate">
                            <ActionIcon variant="filled" color={'violet'}>
                                <IconCopy style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>

                        <DeleteButton onDelete={() => onDelete(value.id_product)} iconOnly={true} />
                    </Group>
            });
        })
        return values;
    }

    const finalPrice = (basePrice: any, specificPrice: any) => {

        const lastPrice = specificPrice[0];
        const type = lastPrice?.reduction_type;
        const reduction = Number(lastPrice?.reduction);

        if (type == 'amount') {
            return <Text fz={13}>RM&nbsp;{basePrice - reduction}</Text>
        }

        if (type == 'percentage') {

            const convert = () => {
                const result = basePrice - (basePrice * reduction);
                return result.toFixed(2)
            }

            return <Text fz={13}>RM&nbsp;{convert()}</Text>
        }

        return <Text fz={13}>RM&nbsp;{basePrice}</Text>;
    }

    const toggle = (e: any, id: any) => {
        const params = {
            id: id,
            active: e
        }
        router.put('product/status', params);
    }

    const onDelete = (id: any) => {
        router.delete(route('product.destroy', id));
    }

    return <>
        <AppCard
            title='&nbsp;'
            rightComponent={<Group gap="xs">
                <Button leftSection={<IconPlus />} color={'green'} size={'xs'}>Add New</Button>
                <Button leftSection={<IconFileExport style={{ width: '70%', height: '70%' }} stroke={1.5} />} size={'xs'}>Export</Button>
            </Group>}
        >
            <AppTable
                data={tableData(list.data)}
                meta={list}
                canSort={[
                    { label: 'ID', value: 'id_product' },
                    { label: 'reference', value: 'reference' },
                    // { label: 'name', value: 'name' },
                    { label: 'shop', value: 'id_shop_default' },
                    { label: 'base price', value: 'price' },
                    { label: 'status', value: 'active' },
                ]}
                searchBy={[
                    { value: 'id_product', label: 'ID' },
                    { value: 'name', label: 'Name' },
                    { value: 'reference', label: 'Reference' },
                    // { value: 'shop', label: 'Shop' },
                    // { value: 'price', label: 'Base Price' },
                    // { value: 'final price', label: 'Final Price' },
                    // { value: 'quantity', label: 'Quantity' },
                    // { value: 'active', label: 'Status' },
                ]}
            />
        </AppCard>
    </>
}

ProductPage.layout = (page: any) => <AdminLayout children={page} title='Product' />;
