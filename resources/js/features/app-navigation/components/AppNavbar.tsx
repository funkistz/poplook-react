import React, { useEffect, useState } from 'react'
import { AppShell, Burger, Divider, Group, Avatar, Title, Text, Box, Flex, Stack, ScrollArea } from '@mantine/core';
import AppLogo from '@/Components/AppLogo';
import { LinksGroup } from './LinksGroup';
import { adminLinks, AdminNavLink } from '../values/AdminLinks';
import { usePage } from '@inertiajs/react';
import { UserProfilePopup } from './UserProfilePopup';

export default function AppNavbar({ toggleMobile, toggleDesktop }: { toggleMobile: any, toggleDesktop: any }) {

  const { auth, permissions }: any = usePage().props;
  const [AdminNavLinks, AdminNavLinksState] = useState<any>([]);
  const pathname = window.location.pathname.split("/")[1];

  useEffect(() => {
    AdminNavLinksState(AdminNavLink(auth));
  },[]);

  const dummyLink = [
    { 
      group: 'Frontend', 
      items: [
        { icon: "IconLayoutDashboard", label: "Dashboard", link: "#", permissions: [] }, 
      ] 
    },{ 
      group: 'Backend', 
      items: [
        { icon: "IconLayoutDashboard", label: "Dashboard", link: "#", permissions: [] }, 
        {
          icon: 'IconUsers',
          label: 'Users',
          links: [
            { label: 'Customer', link: '#' },
            { label: 'Employee', link: '#' },
          ],
          permissions: []
        }
      ] 
    },{ 
      group: 'Marketing', 
      items: [
        { icon: "IconLayoutDashboard", label: "Dashboard", link: "#", permissions: [] }, 
        {
          icon: 'IconUsers',
          label: 'Users',
          links: [
            { label: 'Customer', link: '#' },
            { label: 'Employee', link: '#' },
          ],
          permissions: []
        }
      ] 
    },
  ]
  const LinkWithGroup = () => {
    return dummyLink.map((res:any, i:any) => {
      return <Stack gap={3} mb={'md'}>
        <Text mb={8} ml={16} mt={10} fz={14} fw={600} c={'dimmed'}>{res.group}</Text>
         {res.items.map((links: any, index: any) => {
            const active = links.link ? (pathname == links.link.split("/").pop()) : false;
            return <LinksGroup key={index} {...links} active={active} />
          })}
      </Stack>
    })
  }

  return (
    <>
      <Stack h={'100%'}>
        <ScrollArea>
          <Stack gap={0}>
            {/* <LinkWithGroup /> */}
            <Stack gap={3}>
              {AdminNavLinks.map((links: any, index: any) => {
                const active = links.link ? (pathname == links.link.split("/").pop()) : false;
                return <LinksGroup key={index} {...links} active={active} />
              })}
            </Stack>
          </Stack>
        </ScrollArea>
      </Stack>
    </>
  )
}
