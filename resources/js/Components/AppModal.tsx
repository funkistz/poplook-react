import { Link } from "@inertiajs/react";
import { Table, rem, Group, ActionIcon, Text, Modal, Flex, Burger, Button } from "@mantine/core";

function AppModal({ data, opened, close, title, size = 'lg', textSubmit = 'Save', action, index,

    center = false, closeOutside = true, submitColor = 'blue', closeOnEscape = true, disabledBtn = false }: any) {

    const submit = () => {
        action(index)
    }

    return (
        <Modal opened={opened} onClose={close} title={title} centered={center} size={size} closeOnClickOutside={closeOutside} closeOnEscape={closeOnEscape} zIndex={1001}>
            {data}
            <Flex justify={'end'} mt={10}>
                <Button size="xs" variant="default" mr={5} onClick={() => close()}>Cancel</Button>
                {action && <Button size="xs" variant="filled" color={submitColor} disabled={disabledBtn} onClick={() => submit()}>{textSubmit}</Button>}
            </Flex>
        </Modal>
    );
}

export default AppModal;
