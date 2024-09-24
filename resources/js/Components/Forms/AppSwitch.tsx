import { Input, Switch } from '@mantine/core';

function AppSwitch(options: any) {

    const mt = options.noMargin ? 0 : 8;

    return (
        <>
            <Switch
                mt={mt}
                placeholder={options.placeholder ? options.placeholder : options.label}
                radius={'sm'}
                {...options}
                value={options.values ? options.values[options.id] : (options.value ? options.value : '')}
                error={options.errors ? options.errors[options.id] : (options.error ? options.error : '')}
                checked={options.checked}
            />
        </>
    );
}

export default AppSwitch;