import { usePage } from '@inertiajs/react';
import React from 'react'

export default function AppPrice({ price }: { price: Number }) {

    const { settings }: any = usePage().props;


    return (
        <>
            {settings.currency_symbol.value} {Number(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </>
    )
}
