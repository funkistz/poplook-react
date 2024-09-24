import { UpdateButton } from "@/Components";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Text, Flex, Group, Modal, Stack, TextInput, Select, Button, Checkbox, Switch, Paper, Space, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";


function CustomerAddress({ id_shop }: any) {
    const {  address, dev, params } = usePage<any>().props;

    const [opened, { open, close }] = useDisclosure(false);
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);

    const { data, setData, post, put, reset, errors, setError } = useForm({
        id_address: null,
        firstname: '',
        lastname: '',
        company: '',
        address1: '',
        address2: '',
        postcode: '',
        city: '',
        id_state: '',
        state: '',
        id_country: '',
        country: '',
        phone: '',
        is_default: null,
    });

    useEffect(() => {
        getState(id_shop)
    },[])

    const paper = () => {

        return address.map((res:any, i: any) => {
            return <Paper radius={'lg'} p={'lg'} withBorder key={i}>
                <Flex justify={'space-between'} mb={'md'}>
                    <Text fz={14} fw={700}>{res.firstname} {res.lastname}</Text>
                    <Text fz={14}>{res.phone}</Text>
                </Flex>
                <Stack gap={0} h={150}>
                    <Text fz={14}>{res.company}</Text>
                    <Text fz={14}>{res.address1}</Text>
                    <Text fz={14}>{res.address2}</Text>
                    <Text fz={14}>{res.postcode} {res.city}</Text>
                    <Text fz={14}>{res.state} {res.country_lang.name}</Text>
                </Stack>
                <Flex justify={'space-between'} align={'center'} mt={'xs'}>
                    <Checkbox
                        label="Set Default"
                        checked={res.is_default ? true: false}
                        disabled={res.is_default ? true: false}
                        onChange={(e) => setDefaultAddress(res.id_address)}
                    />
                    <Flex>
                        <UpdateButton onClick={() => onOpen(res.id_address)} />
                    </Flex>
                </Flex>
            </Paper>
        })
    }
    
    const onOpen = (id: Number) => {
        const result = address.find((res:any) => res.id_address == id)
        setData({
            id_address: result.id_address,
            firstname: result.firstname,
            lastname: result.lastname,
            company: result.company,
            address1: result.address1,
            address2: result.address2,
            postcode: result.postcode,
            city: result.city,
            id_state: result.id_state,
            state: result.state,
            id_country: result.country_lang.id_country,
            country: result.country_lang_name,
            phone: result.phone,
            is_default: result.is_default,
        })
        open();
    }
    const onClose = () => {
        try {
            reset() 
        } catch (error) {

        } finally {
            close();
        }
    }
    const setDefaultAddress = async (id: Number) => {
        try {
            await post(route('customer.set_default_address', { id: id, value: 1 }));
        } catch (error) {
            console.log('error', error)
        } finally {

        }
    }

    const getState = async (shop:Number) => {
        try {
            const response = await axios.get(dev + '/api/infos/countries', {
                params: {
                    shop: shop
                }
            });

            const getCountry = response.data.data.country.map((res:any, i: any) => {
                return { value: res.id_country.toString() , label: res.name}
            })
            const getState = response.data.data.state.map((res:any, i: any) => {
                return { value: res.id.toString() , label: res.name}
            })

            setCountry(getCountry)
            setState(getState)
        } catch (error) {
            console.error('Error fetching customer counts:', error);
            return {};
        }
    }

    const onSubmit = async (e: any) => {

        e.preventDefault();

        try {
            await post(route('customer.update_address'));
        } catch (error) {
            console.log('error', error)
        } finally {
            onClose()
        }
    }

    return <>
        {address.length > 0 ? 
            <SimpleGrid cols={3} spacing={'xs'}>
                {paper()}
            </SimpleGrid>
        :
        <Paper radius={'lg'} p={'lg'} withBorder>
            <Text ml={'xs'}>No results found</Text>
        </Paper>}
        

        <Modal size={'lg'} opened={opened} onClose={close} title="Edit Address" centered>
            <form onSubmit={onSubmit}>
                <Stack gap={0}>
                    <Flex mb={'xs'}>
                        <TextInput 
                            label={'Firstname'}
                            w={'50%'}
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                        />
                        <TextInput 
                            label={'Lastname'}
                            w={'50%'}
                            ml={'xs'}
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                        />
                    </Flex>
                    <TextInput 
                        label={'Company'}
                        mb={'xs'}
                        value={data.company}
                        onChange={(e) => setData('company', e.target.value)}
                    />
                    <TextInput 
                        label={'Address'}
                        mb={'xs'}
                        value={data.address1}
                        onChange={(e) => setData('address1', e.target.value)}
                    />
                    <TextInput 
                        mb={'xs'}
                        value={data.address2}
                        onChange={(e) => setData('address2', e.target.value)}
                    />
                    <TextInput 
                        label={'Postcode'}
                        mb={'xs'}
                        value={data.postcode}
                        onChange={(e) => setData('postcode', e.target.value)}
                    />
                    <Select 
                        label={'Country'}
                        data={country}
                        mb={'xs'}
                        value={data.id_country}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        onChange={(e:any) => setData('state', e)}
                        allowDeselect={false}

                    />
                    {state.length > 0 && <Select 
                        label={'State'}
                        data={state}
                        mb={'xs'}
                        value={data.id_state}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        onChange={(e:any) => setData('state', e)}
                        allowDeselect={false}

                    />}
                    <TextInput 
                        label={'Town/City'}
                        mb={'md'}
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                    />
                    <TextInput 
                        label={'Telephone'}
                        mb={'md'}
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <Flex justify={'end'} >
                        <Button variant="light" color="gray" mr={'xs'} onClick={() => onClose()}>Cancel</Button>
                        <Button color="green" type="submit">Update Address</Button>
                    </Flex>
                </Stack>
            </form>
        </Modal>
    </>


}

export default CustomerAddress;
