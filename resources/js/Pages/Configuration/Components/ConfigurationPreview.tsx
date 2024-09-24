import { usePage } from '@inertiajs/react';
import { Text, NavLink, Box, Paper, Flex, TextInput, Textarea, Switch, MultiSelect, Select, Button, ScrollArea } from '@mantine/core';
import { DateInput, DateTimePicker, TimeInput } from '@mantine/dates';
import moment from 'moment';
import ConfigurationInput from './ConfigurationInput';
import { useEffect } from 'react';

function ConfigurationPreview({ list, onChangeData, activeUrl, submit }: any) {

    return (
        <>
            {
                list.length > 0 ?
                    <>
                        {activeUrl != null && <>
                            <Text fw={700} size={20} pb={'md'} style={{ borderBottom: '1px solid #ced4da' }} >{list[activeUrl].name}</Text>
                        </>}

                        {
                            activeUrl != null && list[activeUrl].configuration_setting.length > 0 ?
                                <Paper w={'100%'}>
                                    {list[activeUrl].configuration_setting.map((res: any, index: any) => {
                                        return <Flex justify={'space-between'} p={'xs'} py={'md'} w={'100%'} key={index} style={{ borderBottom: '1px solid #ced4da' }}>

                                            <ConfigurationInput res={res} index={index} onChangeData={onChangeData} />

                                        </Flex>
                                    })}
                                    <Flex justify={'flex-end'} pr={10} mt={20}>
                                        {/* <Button size='xs' color="white" mr={5}>Reset</Button> */}
                                        <Button size='xs' onClick={() => submit()}>Save</Button>
                                    </Flex>
                                </Paper>
                                : <>
                                    <Text pt={'md'} pl={'xs'}>
                                        No Data
                                    </Text>
                                </>
                        }

                    </>
                    : <>
                        <Paper radius="md" shadow="lg" mt={20} p={'xs'} w={'100%'}>
                            <Text>No Data</Text>
                        </Paper>
                    </>
            }
        </>
    );

}
export default ConfigurationPreview;