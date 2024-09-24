import { BarChart } from '@mantine/charts'
import { Text, Modal } from '@mantine/core'
import React from 'react'

export default function ModalBarChart({opened, close, data}:any) {

    return (
        <Modal opened={opened} onClose={() => close(null)} size={'lg'} title={data ? <Text tt={'capitalize'}>{data.keyword}</Text> : ''} centered>
        <BarChart
            h={300}
            data={data ? data.trend: []}
            dataKey="date"
            series={[
                { name: 'Click', color: 'blue.6' },
                { name: 'Search', color: 'teal.6' },
            ]}
            tickLine="y"
        />
    </Modal>
    )
}
