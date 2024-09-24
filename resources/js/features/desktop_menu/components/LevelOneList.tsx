import React from 'react'
import {
    createStyles, rem, Flex, Button, Accordion, TextInput, Checkbox, Stack
} from '@mantine/core';
import { CategoryDropdown } from '@/features/data_dropdown';
import { ColorInput, Input, SimpleGrid, NumberInput, Divider } from '@mantine/core';
import AppInput from '@/Components/Forms/AppInput';

export default function LevelOneList({ data, setData, activeIndex, parentIndex, onActiveChange }: any) {

    console.log('level 1 list', data[parentIndex]);

    const onChange = (e: any, id: any = null) => {

        let temp = [...data];
        if (e.target) {
            temp[parentIndex].children[activeIndex][e.target.id] = e.target.value;
        } else {
            temp[parentIndex].children[activeIndex][id] = e;
        }

        setData(temp);

    }

    const onCategoryChange = (id: any, value: any, label: any) => {


        let temp = [...data];
        temp[activeIndex][id] = value;

        const firstNumber = value.match(/[0-9]+/);
        const categoryName = value.split('-').pop();
        const link = '/' + firstNumber + '-' + categoryName.replace(/ /g, "-").replace(/'/g, "");

        temp[activeIndex]['category_id'] = Number(firstNumber);
        temp[activeIndex]['link'] = link;

        setData(temp);
    }


    return (
        <>
            <Accordion radius="xs" variant="contained" value={activeIndex} onChange={onActiveChange}>
                {parentIndex && data[parentIndex] && data[parentIndex].children.map((parent: any, index: any) => {
                    return (
                        <Accordion.Item value={index.toString()} key={index}>
                            <Accordion.Control>{parent.name}</Accordion.Control>
                            <Accordion.Panel style={{ backgroundColor: '#ffffff' }}>
                                <Stack p='md'>
                                    <TextInput
                                        placeholder="Width"
                                        label="Width"
                                        withAsterisk
                                        id='width'
                                        onChange={onChange}
                                        value={parent.width}
                                    />
                                    <TextInput
                                        placeholder="Menu label"
                                        label="Name"
                                        withAsterisk
                                        id='name'
                                        onChange={onChange}
                                        value={parent.name}
                                    />

                                    <CategoryDropdown id='category' value={parent.category} onChange={onCategoryChange} />
                                    <TextInput
                                        placeholder="Menu label"
                                        label='Link'
                                        description="link will also change based on category selected above"
                                        id='link'
                                        onChange={onChange}
                                        value={parent.link}
                                    />

                                    <ColorInput
                                        placeholder="Pick color"
                                        label="Your favorite color"
                                        id='color'
                                        onChange={(value) => onChange(value, 'color')}
                                        value={parent.color}
                                    />

                                    <Input.Wrapper label="Padding">
                                        <SimpleGrid cols={4} mt='xs'>
                                            <TextInput type='number' placeholder="pixel" label="Top:" id='padding_top' onChange={onChange} value={parent.padding_top} />
                                            <TextInput type='number' placeholder="pixel" label="Bottom:" id='padding_bottom' onChange={onChange} value={parent.padding_bottom} />
                                            <TextInput type='number' placeholder="pixel" label="Left:" id='padding_left' onChange={onChange} value={parent.padding_left} />
                                            <TextInput type='number' placeholder="pixel" label="Right:" id='padding_right' onChange={onChange} value={parent.padding_right} />
                                        </SimpleGrid>
                                    </Input.Wrapper>

                                    <Input.Wrapper label="Active Shops" >
                                        <SimpleGrid cols={3} mt='xs'>
                                            <Checkbox label="MYR" />
                                            <Checkbox label="SGD" />
                                            <Checkbox label="USD" />
                                        </SimpleGrid>
                                    </Input.Wrapper>
                                    <Divider my="sm" />

                                    <Checkbox
                                        label="Show All Button"
                                    />

                                    <Checkbox
                                        label="Active"
                                    />

                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </>
    )
}
