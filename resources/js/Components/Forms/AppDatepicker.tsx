import { usePage } from '@inertiajs/react';
import { Input, MultiSelect } from '@mantine/core';
import { DateInput, DatesProvider } from '@mantine/dates';

function AppDatePicker(options: any) {

    const { timezone }: any = usePage().props;

    return (
        <>
            <DatesProvider settings={{ timezone: 'UTC' }}>
                <DateInput
                    clearable
                    mt={8}
                    radius={'sm'}
                    placeholder={options.placeholder ? options.placeholder : 'Select Date'}

                    value={options.values ? options.values[options.id] : (options.value ? options.value : '')}
                    error={options.errors ? options.errors[options.id] : options.error}
                    {...options}
                />
            </DatesProvider>
        </>
    );
}

export default AppDatePicker;
