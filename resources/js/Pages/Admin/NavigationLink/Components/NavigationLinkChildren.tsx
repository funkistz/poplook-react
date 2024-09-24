import { AddButton, AppCard, AppTable, DeleteButton, UpdateButton } from "@/Components";
import { router, useForm, usePage } from "@inertiajs/react";
import { Flex, Button, PasswordInput, Stack, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import NavigationLinkChildrenForm from "./NavigationLinkChildrenForm";


function NavigationLinkChildren(label?: any) {
    const { navigation, role, create } = usePage<any>().props;
    const [navChildModal, setNavChildModal] = useState<any>();
    const [navChildData, setNavChildData] = useState<any>('');

    const tableData = (data: []) => {
        const values: any = [];
        data && data.map((value: any, key: any) => {
            values.push({
                'name': value.label,
                'link': (value.link) ? value.link : '',
                'action':
                    <Flex justify='left' gap='xs'>
                        <UpdateButton iconOnly={true} onClick={() => setNavChild(value, true)}></UpdateButton>
                        <DeleteButton iconOnly={true} onDelete={() => onDelete(value.id)}></DeleteButton>
                    </Flex>
            });
        })
        return values;
    }

    const setNavChild = (value:any, modal:any) => {
        setNavChildModal(modal);
        setNavChildData(value);
    }

    const onDelete = (id: any) => {
        router.delete(route('navigation_link.deletechildren', id));
    }

    function closeModal(){
        setNavChildModal(false);
    }

    return <>
        <Modal
            opened={navChildModal}
            onClose={() => setNavChildModal(false)}
            title={navChildData.label}
            size={'xl'}
            closeOnClickOutside={true}>
            <NavigationLinkChildrenForm closeModal={closeModal} navchildata={navChildData} navigation={navigation}/>
        </Modal>
        <AppCard title={label.label + ' Children'} rightComponent={<AddButton onClick={() => setNavChildModal(true)}></AddButton>}>
            <AppTable
                data={tableData(navigation.navigation_link_children)}
                // meta={list}
                canSort={[{ label: 'Label', value: 'label' }]}
                searchPlaceholder='Search by name or email'
            />
        </AppCard>
    </>
}

export default NavigationLinkChildren;
