// import {
//     Anchor,
//     AppShell,
//     Box,
//     Burger,
//     Button,
//     Center,
//     Divider,
//     Drawer,
//     Group,
//     Header,
//     HoverCard,
//     SimpleGrid,
//     ThemeIcon,
//     Title,
//     UnstyledButton,
//     rem,
//     Text,
//     ScrollArea,
//     Collapse,
//     Image,
//     ActionIcon,
//     Container,
//     Portal,
// } from '@mantine/core';
// import { createStyles } from '@mantine/core';
// import { useDisclosure, useHeadroom } from '@mantine/hooks';
// import { IconAdjustments, IconBook, IconChartPie3, IconChevronDown, IconCode, IconCoin, IconFingerprint, IconNotification, IconSettings } from '@tabler/icons-react';

// const mockdata = [
//     {
//         icon: IconCode,
//         title: 'Open source',
//         description: 'This Pokémon’s cry is very loud and distracting',
//     },
//     {
//         icon: IconCoin,
//         title: 'Free for everyone',
//         description: 'The fluid of Smeargle’s tail secretions changes',
//     },
//     {
//         icon: IconBook,
//         title: 'Documentation',
//         description: 'Yanma is capable of seeing 360 degrees without',
//     },
//     {
//         icon: IconFingerprint,
//         title: 'Security',
//         description: 'The shell’s rounded shape and the grooves on its.',
//     },
//     {
//         icon: IconChartPie3,
//         title: 'Analytics',
//         description: 'This Pokémon uses its flying ability to quickly chase',
//     },
//     {
//         icon: IconNotification,
//         title: 'Notifications',
//         description: 'Combusken battles with the intensely hot flames it spews',
//     },
// ];

export default function HomeLayout({ children, title }: any) {

    //     const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    //     const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    //     const { classes, theme } = useStyles();
    //     const pinned = useHeadroom({ fixedAt: 120 });

    //     const links = mockdata.map((item) => (
    //         <UnstyledButton className={classes.subLink} key={item.title}>
    //             <Group noWrap align="flex-start">
    //                 <ThemeIcon size={34} variant="default" radius="md">
    //                 <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
    //                 </ThemeIcon>
    //                 <div>
    //                 <Text size="sm" fw={500}>
    //                     {item.title}
    //                 </Text>
    //                 <Text size="xs" color="dimmed">
    //                     {item.description}
    //                 </Text>
    //                 </div>
    //             </Group>
    //         </UnstyledButton>
    //     ));

    //     return (
    //         <>
    //         <Portal>
    //             <Box 
    //                 sx={(theme) => ({
    //                     position: 'fixed',
    //                     top: 0,
    //                     left: 0,
    //                     right: 0,
    //                     // padding: theme.spacing.xs,
    //                     height: rem(60),
    //                     zIndex: 1000000,
    //                     transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
    //                     transition: 'transform 400ms ease',
    //                     backgroundImage: `linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0))`,

    //                 })}>
    //                     <Header height={60} px="md" sx={{background: '#fff'}} style={{backgroundColor: 'transparent',borderBottom: 0}}>
    //                         <Group position="apart" sx={{ height: '100%'}}>
    //                             <Image src={'https://poplook.com/assets/img/logo.png?version=1.0.3'} style={{ width: 100, }} ></Image>
    //                         <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
    //                             <a href="#" className={classes.link}>
    //                             Home
    //                             </a>
    //                             <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
    //                             <HoverCard.Target>
    //                                 <a href="#" className={classes.link}>
    //                                 <Center inline>
    //                                     <Box component="span" mr={5}>
    //                                     Features
    //                                     </Box>
    //                                     <IconChevronDown size={16} color={theme.fn.primaryColor()} />
    //                                 </Center>
    //                                 </a>
    //                             </HoverCard.Target>

    //                             <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
    //                                 <Group position="apart" px="md">
    //                                 <Text fw={500}>Features</Text>
    //                                 <Anchor href="#" fz="xs">
    //                                     View all
    //                                 </Anchor>
    //                                 </Group>

    //                                 <Divider
    //                                 my="sm"
    //                                 mx="-md"
    //                                 color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
    //                                 />

    //                                 <SimpleGrid cols={2} spacing={0}>
    //                                 {links}
    //                                 </SimpleGrid>

    //                                 <div className={classes.dropdownFooter}>
    //                                 <Group position="apart">
    //                                     <div>
    //                                     <Text fw={500} fz="sm">
    //                                         Get started
    //                                     </Text>
    //                                     <Text size="xs" color="dimmed">
    //                                         Their food sources have decreased, and their numbers
    //                                     </Text>
    //                                     </div>
    //                                     <Button variant="default">Get started</Button>
    //                                 </Group>
    //                                 </div>
    //                             </HoverCard.Dropdown>
    //                             </HoverCard>
    //                             <a href="#" className={classes.link}>
    //                             Learn
    //                             </a>
    //                             <a href="#" className={classes.link}>
    //                             Academy
    //                             </a>
    //                         </Group>

    //                         <Group className={classes.hiddenMobile}>
    //                             <Button variant="default">Log in</Button>
    //                             <Button>Sign up</Button>
    //                         </Group>

    //                         <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
    //                         </Group>
    //                     </Header>

    //                     <Drawer
    //                         opened={drawerOpened}
    //                         onClose={closeDrawer}
    //                         size="100%"
    //                         padding="md"
    //                         title="Navigation"
    //                         className={classes.hiddenDesktop}
    //                         zIndex={1000000}
    //                     >
    //                         <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
    //                         <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

    //                         <a href="#" className={classes.link}>
    //                             Home
    //                         </a>
    //                         <UnstyledButton className={classes.link} onClick={toggleLinks}>
    //                             <Center inline>
    //                             <Box component="span" mr={5}>
    //                                 Features
    //                             </Box>
    //                             <IconChevronDown size={16} color={theme.fn.primaryColor()} />
    //                             </Center>
    //                         </UnstyledButton>
    //                         <Collapse in={linksOpened}>{links}</Collapse>
    //                         <a href="#" className={classes.link}>
    //                             Learn
    //                         </a>
    //                         <a href="#" className={classes.link}>
    //                             Academy
    //                         </a>

    //                         <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

    //                         <Group position="center" grow pb="xl" px="md">
    //                             <ActionIcon variant="transparent"><IconSettings size="1rem" /></ActionIcon>
    //                             <Button variant="default">Log in   <IconAdjustments size="1.125rem" /></Button>
    //                             <Button>Sign up</Button>
    //                         </Group>
    //                         </ScrollArea>
    //                     </Drawer>
    //             </Box>
    //             <Container fluid bg={'#fff'} p={0}>
    //                 {children} 
    //             </Container>
    //         </Portal>

    //         </>
    //     );
    // }

    // const useStyles = createStyles((theme) => ({
    //     link: {
    //         display: 'flex',
    //         alignItems: 'center',
    //         height: '100%',
    //         paddingLeft: theme.spacing.md,
    //         paddingRight: theme.spacing.md,
    //         textDecoration: 'none',
    //         color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    //         fontWeight: 500,
    //         fontSize: theme.fontSizes.sm,

    //         [theme.fn.smallerThan('sm')]: {
    //             height: rem(42),
    //             display: 'flex',
    //             alignItems: 'center',
    //             width: '100%',
    //         },

    //         ...theme.fn.hover({
    //             backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    //         }),
    //     },

    //     subLink: {
    //         width: '100%',
    //         padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    //         borderRadius: theme.radius.md,

    //         ...theme.fn.hover({
    //             backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    //         }),

    //         '&:active': theme.activeStyles,
    //     },

    //     dropdownFooter: {
    //         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    //         margin: `calc(${theme.spacing.md} * -1)`,
    //         marginTop: theme.spacing.sm,
    //         padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    //         paddingBottom: theme.spacing.xl,
    //         borderTop: `${rem(1)} solid ${
    //             theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    //         }`,
    //     },

    //     hiddenMobile: {
    //         [theme.fn.smallerThan('sm')]: {
    //             display: 'none',
    //         },
    //     },

    //     hiddenDesktop: {
    //         [theme.fn.largerThan('sm')]: {
    //             display: 'none',
    //         },
    //     },
    // }));
}