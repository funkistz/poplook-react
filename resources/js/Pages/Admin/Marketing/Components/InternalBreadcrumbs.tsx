import { usePage } from "@inertiajs/react";
import { Anchor, Breadcrumbs, Flex, Text, Badge } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import React from "react";
import { useEffect } from "react";

interface BreadcrumbData {
    title: string;
    href: string;
}

interface InternalBreadcrumbsProps {
    data: BreadcrumbData[];
}

function InternalBreadcrumbs({ data, rightsection, withNumber = false }: InternalBreadcrumbsProps & { rightsection?: any, withNumber?: any }) {

    const currentPath = window.location.pathname.split("/").pop();
    const { id } = usePage<any>().props;

    const items = data.map((item, index) => {
        return currentPath == item.href.split("/").pop() ?
            <Anchor key={index} c={'dimmed'} underline="never" >
                <Flex align={'center'}>
                    {withNumber && <Badge size="xs" mr={'xs'} color={'gray'}>{index + 1}</Badge>}
                    <Text fz={15}>{item.title}</Text>
                </Flex>
            </Anchor>
            :
            <Anchor href={item.href} key={index} c={'dark'}>
                <Flex align={'center'}>
                    {withNumber && <Badge size="xs" mr={'xs'} color={'gray'}>{index + 1}</Badge>}
                    {<Text fz={15}>{item.title}</Text>}
                </Flex>
            </Anchor>
    })


    return <Flex justify={'space-between'}>
        <Breadcrumbs separator={<IconChevronRight />} ml={'xs'}>
            {items}
        </Breadcrumbs>
        {rightsection}
    </Flex>;
}

export default InternalBreadcrumbs;
