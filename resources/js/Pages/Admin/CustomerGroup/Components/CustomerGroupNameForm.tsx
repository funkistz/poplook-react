import { AppCard } from "@/Components";
import { router, useForm } from "@inertiajs/react";
import { Button, Grid, Group, NumberInput, Radio, Select, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

function CustomerGroupNameForm(params: any) {
    const { data, setData, post, get, put, reset, errors, setError } = useForm({
        id: params.data.id_group ? params.data.id_group : '',
        name: params.data.group_lang ? params.data.group_lang.name : '',
        discount: params.data.discount ? params.data.discount : 0,
        price_display_method: params.data.price_display_method ? params.data.price_display_method : '0',
        show_price: params.data.show_prices ? "" + params.data.show_prices + "" : '',
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await post(route('customer_group.updateorcreate'));
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        router.post(route('customer_group.updateorcreate'), data);
    }

    return <>
        <form onSubmit={handleSubmit}>
            <AppCard title={data.name}>
                <Grid grow gutter="xs" >
                    <Grid.Col span={12}>
                        <TextInput
                            label={'Name'}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label={'Discount'}
                            value={data.discount}
                            onChange={(e) => setData('discount', e)}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Select
                            name="price_display_method"
                            label="Price Display Method"
                            placeholder="Pick value"
                            data={[{ value: '0', label: 'Tax Excluded' }, { value: '1', label: 'Tax Included' }]}
                            defaultValue={data.price_display_method}
                            onChange={(e) => setData('price_display_method', e)}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Radio.Group
                            value={data.show_price}
                            name="show_price"
                            label="Show Price"
                        >
                            <Group>
                                <Radio value="1" label="Yes" onClick={(e) => setData('show_price', e.target.value)} />
                                <Radio value="0" label="No" onClick={(e) => setData('show_price', e.target.value)} />
                            </Group>
                        </Radio.Group>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Button color='green' style={{ float: 'right' }} type='submit'>submit</Button>
                    </Grid.Col>
                </Grid>
            </AppCard>
        </form>
    </>
}

export default CustomerGroupNameForm;