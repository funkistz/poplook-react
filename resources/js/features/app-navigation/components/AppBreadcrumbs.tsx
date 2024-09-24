import React, { useEffect, useState } from 'react'
import { Anchor, Breadcrumbs } from '@mantine/core';
import { adminLinks, AdminNavLink } from '../values/AdminLinks';
import { usePage } from '@inertiajs/react';

export default function AppBreadcrumbs() {

    const { auth, permissions }: any = usePage().props;
    const [currentRoute, setCurrentRoute] = useState({
        index: null,
        label: '',
        url: '',
        hasChild: false,
        ChildIndex: null,
    })
    const [data, setData] = useState([{}]);
    // const [AdminNavLinks, AdminNavLinksState] = useState<any>([]);
    const pathname = window.location.pathname.split("/")[1];

    useEffect(() => {
        getCurrentUrl();
    }, [])

    useEffect(() => {
        getCurrentUrl();
    }, [pathname])

    const getCurrentUrl = () => {

        let AdminNavLinks = AdminNavLink(auth);
        // adminLinks.filter((item: any, index: any) => {
        AdminNavLinks.filter((item: any, index: any) => {
            if (item.link && item.link.split("/").pop() == pathname) {

                setCurrentRoute({
                    index: index,
                    label: item.label,
                    url: item.link,
                    hasChild: false,
                    ChildIndex: null,
                })
                if (index == 0) {
                    return setData([{ title: AdminNavLinks[0].label, href: AdminNavLinks[0].link }])
                }

                // return setData([{ title: AdminNavLinks[0].label, href: AdminNavLinks[0].link }, { title: item.label, href: item.link }])
                return setData([{ title: item.label, href: item.link }])
            }
            if (Array.isArray(item.links)) {
                item.links.filter((res: any, i: any) => {
                    if (res.link.split("/").pop() == pathname) {
                        setCurrentRoute({
                            index: index,
                            label: res.label,
                            url: res.link,
                            hasChild: true,
                            ChildIndex: i,
                        })

                        return setData([
                            // { title: AdminNavLinks[0].label, href: AdminNavLinks[0].link },
                            { title: item.label, href: null },
                            { title: res.label, href: res.link },
                        ])
                    }
                })
            }
            return currentRoute
        })
    }

    const result = data.map((item: any, index: any) => {
        return pathname == item.href ?
            <Anchor key={index} c={'dimmed'} underline="never" >
                {item.title}
            </Anchor>
            :
            <Anchor href={item.href} key={index} c={'dark'} >
                {item.title}
            </Anchor>
    });


    return (
        <>
            <Breadcrumbs mt={'xs'} mb={'lg'}>{result}</Breadcrumbs>
        </>
    )
}