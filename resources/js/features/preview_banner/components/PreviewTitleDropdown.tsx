import React, { useEffect } from 'react'
import { Flex, Title, Select } from '@mantine/core'

function PreviewTitleDropdown({ title, shop, setShop }: any) {

    useEffect(() => {

    }, [])

    return (
        <>
            <Flex justify={'space-between'} bg={'#F8F9FA'} py={20} mb={5} w={'100%'}
                style={{ ...classes.children, transition: 'width 0.2s', position: 'sticky', top: 55, zIndex: 1 }} >
                <Title order={4} mt={2}>{title} {shop}</Title>

                <Flex direction={'row'}>
                    <Select
                        size='xs'
                        mr={10}
                        data={[
                            { value: '1', label: 'MYR' },
                            { value: '2', label: 'SGD' },
                            { value: '3', label: 'USD' },
                        ]}
                        onChange={(e) => setShop(Number(e))}
                        defaultValue={shop.toString()}
                    />
                </Flex>

            </Flex>
        </>
    )
}

const classes = {
    children: {
        "&:hover": {
            cursor: 'pointer'
        },
    },
};

export default PreviewTitleDropdown;
