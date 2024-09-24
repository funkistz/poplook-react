import { usePage } from "@inertiajs/react";
import { Button, Menu, rem } from "@mantine/core";
import { IconChevronDown, IconFileSpreadsheet, IconFileTypeCsv } from "@tabler/icons-react";


function ButtonWithMenu({ data }: any) {

    const { settings } = usePage<any>().props;

    const handleDownload = () => {
        const storage = '/storage/LHDN/E-Invoice/';
        const url =  `${settings.app_url}${storage}${data.filename}.xlsx`;

        // router.post('/consolodation-invoice/downloadExcel', data, {
        //     forceFormData: true,
        //     preserveScroll: true,
        //     onSuccess: (e) => {
        //         window.open(url, '_blank');
        //     },
        // })
    };

    return <Menu
            transitionProps={{ transition: 'pop-top-right' }}
            position="bottom-end"
            width={170}
            withinPortal
        >
            <Menu.Target>
            <Button
                size={'xs'}
                rightSection={
                    <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                }
                pr={12}
                color={'blue'}
            >
                Download Raw Data
            </Button>
            </Menu.Target>
            <Menu.Dropdown>
            <Menu.Item
                leftSection={
                    <IconFileSpreadsheet
                        style={{ width: rem(16), height: rem(16) }}
                        color={'gray'}
                        stroke={1.5}
                    />
                }
                onClick={() => handleDownload()}>
                Excel
            </Menu.Item>
            <Menu.Item
                leftSection={
                    <IconFileTypeCsv
                        style={{ width: rem(16), height: rem(16) }}
                        color={'gray'}
                        stroke={1.5}
                    />
                }
                onClick={() => console.log('csv')}>
                Csv
            </Menu.Item>
            </Menu.Dropdown>
        </Menu>


}

export default ButtonWithMenu;
