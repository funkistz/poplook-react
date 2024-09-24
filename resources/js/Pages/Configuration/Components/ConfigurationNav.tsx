import { Text, NavLink, Box } from '@mantine/core';

function ConfigurationNav({ list, onChangeSett, activeUrl }: any) {
    return (
        <>
            {
                list.length > 0 ?
                    <>
                        <Box w={'100%'}>
                            {list.map((res: any, i: any) => {
                                return <NavLink key={i} label={res.name} color={'green'} active={activeUrl == i ? true : false} onClick={() => onChangeSett(i)} />
                            })}
                        </Box>

                    </>
                    : <>
                        <Text>No Data</Text>
                    </>
            }
        </>
    );

}
export default ConfigurationNav;