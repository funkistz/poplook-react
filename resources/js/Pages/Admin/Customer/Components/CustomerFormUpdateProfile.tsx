import { AppCard } from "@/Components";
import { getLoyaltyName, getShopName } from "@/features/helper/Index";
import { router, useForm } from "@inertiajs/react";
import { Flex, Button, TextInput, Text, Grid, Tooltip } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import TextWithTooltips from "../../Marketing/Email/Components/TextWithTooltips";
import { IconInfoCircle } from "@tabler/icons-react";


function CustomerFormUpdateProfile({ customer }: any) {

    const { data, setData, post, put, reset, errors, setError } = useForm({
        firstname: customer ? customer.firstname : '',
        lastname: customer ? customer.lastname : '',
        email: customer ? customer.email : '',
        birthday: customer ? customer.birthday : '',
        company: customer ? customer.company ? customer.company : '-' : '',
        shop: customer ? getShopName(customer.id_shop, true) : '-',
        loyalty: customer ? getLoyaltyName(customer.loyalty) : '-',
    });

    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await put(route('customer.update', customer.id_customer));

        } catch (error) {
            console.log('error', error)
        } finally {

        }
    }


    return <>
        <form onSubmit={onSubmit}>
            <AppCard title='Update Profile' rightComponent={<Button size={'xs'} type="submit">Submit</Button>}>
                <Grid grow gutter="xs">
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Firstname"
                            label="Firstname"
                            value={data.firstname}
                            error={errors.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Lastname"
                            label="Lastname"
                            value={data.lastname}
                            error={errors.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Email"
                            label="Email"
                            readOnly
                            value={data.email}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Birthday"
                            label="Birthday"
                            readOnly
                            value={moment(data.birthday).format('DD MMMM YYYY')}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <TextInput
                            placeholder="Shop"
                            label="Shop"
                            readOnly
                            value={data.shop}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <TextInput
                            placeholder="Loyalty"
                            label="Loyalty"
                            readOnly
                            value={data.loyalty}
                        />
                    </Grid.Col>
                </Grid>
            </AppCard>
        </form>
    </>
}

export default CustomerFormUpdateProfile;
