import { CreateNewRow } from "@/features/block_creator";
import { useForm } from "@inertiajs/react";
import { TextInput, Textarea, Text, Button, Group, Flex } from "@mantine/core";


function FormBanner({ formData, submitPath, afterSubmit, copy = true, saveMenuData = false, cancelBtn = false, cancelAction }: any) {

    const { data, setData, post, put, reset, errors } = useForm({
        id: formData ? formData.id : '',
        name: formData ? formData.name : '',
        description: formData ? formData.description : '',
        data: formData ? formData.data : '[]',
    });

    const onChange = (event: { target: { name: any; value: any } }) => {
        setData(event.target.name, event.target.value);
    };

    const createTemplate = (item: any) => {

        if (saveMenuData) {
            return setData('data', addRowMenu(item));
        }

        return setData('data', addRowBanner(item));

    }

    const addRowBanner = (item: any) => {

        // template
        if (item.type == 'template') {
            const parent: any = item.data;
            return JSON.stringify(parent)
        }

        // from file value block creator
        if (item && typeof item === 'object' && item.constructor === Object) {
            const parent: any = [{ ...item }];
            return JSON.stringify(parent)
        }

        return [];
    }

    const addRowMenu = (item: any) => {

        // template
        if (item.type == 'template') {
            const parent: any = item.data;
            return JSON.stringify(parent)
        }

        // from file value block creator
        if (item && typeof item === 'object' && item.constructor === Object) {
            const parent: any = [{ ...item }];
            return JSON.stringify(parent)
        }

        return [];
    }

    const submitForm = (e: any) => {
        e.preventDefault();
        post(submitPath, {
            onSuccess: () => {
                afterSubmit()
            },
        });
    }

    return (<>
        <form onSubmit={submitForm}>
            <TextInput
                name='name'
                placeholder="Name"
                label={"Name"}
                value={data.name}
                onChange={onChange}
                size='xs'
                maxLength={255}
                withAsterisk
                required={true}
            />
            {data.name.length > 0 &&
                <Text
                    fz={10}
                    mt={1}
                    c={Number(data.name.length) < 235 ? "dimmed" : "red"}
                >
                    {255 - Number(data.name.length)} characters remaining
                </Text>}

            <Textarea
                name='description'
                placeholder="Description"
                label="Description"
                mt={10}
                value={data.description}
                onChange={onChange}
                size='xs'
                withAsterisk
                autosize
                minRows={4}
                maxRows={8}
                required={true}
                maxLength={255}
            />
            {data.description.length > 0 &&
                <Text
                    fz={10}
                    mt={1}
                    c={Number(data.description.length) < 235 ? "dimmed" : "red"}
                >
                    {255 - Number(data.description.length)} characters remaining
                </Text>}

            {copy && <Flex direction={'column'} mt={10}>
                <CreateNewRow addRow={createTemplate} />
            </Flex>}


            <Group justify="flex-end" my={20}>
                {cancelBtn && <Button type='button' variant="default" onClick={() => cancelAction(false)}>Cancel</Button>}
                <Button type='submit' color="green">Submit</Button>
            </Group>
        </form>
    </>);
}

export default FormBanner;