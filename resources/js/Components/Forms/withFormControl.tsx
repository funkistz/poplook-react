import React from 'react'
import { Input } from '@mantine/core';

export default function withFormControl(Component: any) {

    const NewComponent = (props: any) => {
        // if (props.isLoading) {
        //     if (props.spinner)
        //         return props.spinner;
        //     return <View style={props.loadingStyle}>
        //         <ActivityIndicator />
        //     </View>
        // };
        return <Input.Wrapper
            id={props.id}
            withAsterisk={props.required}
            // label={props.label}
            description={props.description}
            error={props.errors ? props.errors[props.id] : props.error}
            mt='sm'
        >
            <Component {...props} />
        </Input.Wrapper>
    };

    return NewComponent;
}
