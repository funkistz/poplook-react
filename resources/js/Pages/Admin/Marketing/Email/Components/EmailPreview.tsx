import { ScrollArea, Table } from '@mantine/core'
import SkeletonEmail from './SkeletonEmail'
import InfoEmail from './InfoEmail'

export default function EmailPreview({ data, theObj }:any) {
    return <>
        <Table>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td w={'30%'} style={{ padding: 0, verticalAlign: 'top' }}>
                        <Table withTableBorder>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>
                                        <SkeletonEmail />
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>
                                        <InfoEmail data={data}/>
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>
                                        <SkeletonEmail />
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>
                                        <SkeletonEmail />
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>
                                        <SkeletonEmail />
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>
                                        <SkeletonEmail />
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Table.Td>
                    <Table.Td w={'70%'} p={10} style={{ padding: 0, verticalAlign: 'top' }}>
                        <ScrollArea w={'100%'} h={600}>
                            <div dangerouslySetInnerHTML={theObj} style={{ width: '100%', height: '100%', overflowX: 'scroll', border: '1px solid #ccc' }}></div>
                        </ScrollArea>
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    </>
}
