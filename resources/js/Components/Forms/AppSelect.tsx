import { Input, Select } from '@mantine/core';

function AppSelect({ id, label, placeholder, description, error, required = false, onChange, props, value, data, values, errors, searchable }: any) {
    return (
        <Input.Wrapper
            id={id}
            withAsterisk={required}
            label={label}
            description={description}
            error={errors ? errors[id] : error}
            mt='sm'
        >
            <Select
                data={data ? data : []}
                id={id}
                placeholder={placeholder}
                searchable={searchable}
                value={values ? (values[id] ? values[id] : '') : (value ? value : '')}
                clearable
                onChange={(e) => {
                    const target = {
                        id: id,
                        value: e,
                    }
                    return onChange({ target })
                }}
            />
        </Input.Wrapper>
    );
}

export default AppSelect;