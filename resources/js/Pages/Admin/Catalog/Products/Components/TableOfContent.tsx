import { Box, Group, Paper, Text, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import cx from 'clsx';
import classes from '../Css/TableOfContent.module.css'
import { links } from '../Values/Data';

export default function TableOfContent({ current, setCurrent }: any) {

    const active = current;

    const handle = (e: any) => {
        setCurrent(e)
    }

    const items = links.map((item: any) => (
        <a

            href={'#'}
            onClick={(event) => handle(item.link)}
            key={item.label}
            className={cx(classes.link, { [classes.linkActive]: active === item.link })}
            style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
        >
            {item.label}
        </a>
    ));

    return (
        <Paper radius={'lg'} p={'lg'} withBorder>
            {items}
        </Paper>
    );
}
