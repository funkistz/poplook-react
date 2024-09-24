import { Table, rem, createStyles, Group, ActionIcon } from "@mantine/core";
import { useState } from "react";
import { IconEdit, IconTrash } from '@tabler/icons-react';

function AppTable({ data, onEdit, onDelete, children, header }: any) {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [newHeader, setNewHeader] = useState(header);

    if (!header) {
        header = Object.keys(data[0]);
    }

    let headerCheck: any = [];

    header = header.map((head: any) => {
        if (typeof head === 'object') {
            headerCheck.push(head.value);
            return head.label;
        } else {
            headerCheck.push(head);
            return head;
        }
    })

    const getValue = (column: any, row: any) => {

        let fields = Array.isArray(column) ? column : [column];
        let value = '';
        console.log('newHeader', newHeader[0]);

        fields.forEach((field, index) => {
            console.log('field', field);

            if (field.includes('.')) {
                const columns = field.split('.');
                value += (row[columns[0]] ? row[columns[0]][columns[1]] : '') + ' ';
            } else {
                value += row[field] ? row[field] + ' ' : '';
            }
        });

        return value;

    }

    return (
        <Table>
            <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                    <th>#</th>
                    {header.map((label: any, index: any) => {
                        return <th key={index}>{label}</th>
                    })}
                    {(onEdit || onDelete) &&
                        <th style={{ textAlign: 'center' }}>Action</th>
                    }
                </tr>
            </thead>
            <tbody>
                {!children && data.map((row: any, index: any) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        {headerCheck.map((column: any, index2: any) => {
                            if (headerCheck.includes(column)) {
                                return <td key={index2} >
                                    <span style={newHeader[index2].css ? newHeader[index2].css : null}>{getValue(column, row)}</span>
                                </td>
                            }
                        })}
                        {(onEdit || onDelete) &&
                            <td style={{ textAlign: 'center' }}>
                                <Group position="center">
                                    {onEdit &&
                                        <ActionIcon color="blue" size="lg" variant="filled" onClick={() => onEdit(row)}>
                                            <IconEdit size="1rem" />
                                        </ActionIcon>
                                    }
                                    {onDelete &&
                                        <ActionIcon color="red" size="lg" variant="filled" onClick={() => onDelete(row)}>
                                            <IconTrash size="1rem" />
                                        </ActionIcon>
                                    }
                                </Group>
                            </td>
                        }
                    </tr>
                })}
                {children}
            </tbody>
        </Table>
    );
}

export default AppTable;

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
                }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));