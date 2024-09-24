import React, { useEffect, useMemo } from 'react'
import { Select } from '@mantine/core';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '../redux/DataDropdown';

export default function CategoryDropdown({ id, label = 'Category', data = [], value, onChange }: any) {

    const categories = useSelector((state: any) => state.dataDropdown.categories)
    const dispatch = useDispatch();

    // const realValue = useMemo(() => first, [value])

    // console.log('categories', categories);

    useEffect(() => {

        const promise = dispatch(getCategory());

        return () => {
            promise.abort()
        }

    }, [])

    return (
        <Select
            label={label}
            placeholder="Pick one"
            searchable
            nothingFoundMessage="No options"
            data={categories}
            value={value}
            onChange={(newValue) => onChange(id, newValue)}
            id={id}
        />
    )
}
