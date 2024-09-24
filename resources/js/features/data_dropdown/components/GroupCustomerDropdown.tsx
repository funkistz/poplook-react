import React, { useEffect, useMemo, useState } from 'react'
import { MultiSelect, Select } from '@mantine/core';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getGroups } from '../redux/DataDropdown';

export default function GroupCustomerDropdown({ id, label = 'Groups', data = [], value, onChange }: any) {

    const listGroup = useSelector((state: any) => state.dataDropdown.groups)
    const dispatch = useDispatch();

    useEffect(() => {

        const promise = dispatch(getGroups());


        return () => {
            promise.abort()
        }

    }, [])

    return (
        <MultiSelect
            label={label}
            placeholder="Pick one"
            searchable
            nothingFoundMessage="No options"
            data={listGroup}
            value={value}
            clearable
            onChange={(newValue) => onChange(newValue)}
            id={id}
            mb={300}
        />
    )
}
