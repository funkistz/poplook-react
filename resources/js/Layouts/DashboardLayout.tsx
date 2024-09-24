import {
    AppShell,
    Title,
} from '@mantine/core';
import { Head, usePage } from '@inertiajs/react';
import { notifications } from '@mantine/notifications';
import { Text, Transition } from '@mantine/core';
import { useEffect, useState, useMemo } from 'react';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarAction } from '@/Redux/Slices/AppState';

export default function DashboardLayout({ children, title, hidden, aside, sideBarShow = true }: any) {

    // const { classes, cx } = useStyles();
    const { flash }: any = usePage().props;
    const [opened, setOpened] = useState(false);
    const { height, width } = useViewportSize();
    const widthMemo = useMemo(() => width, [width])
    const appState = useSelector((storeState: any) => storeState.appState);
    const dispatch = useDispatch();

    useEffect(() => {

        // setOpened(true);
        if (width > 768) {
            dispatch(sideBarAction(true))
        } else {
            dispatch(sideBarAction(false))
        }
        // console.log('width', width);

    }, [widthMemo])

    const openSideBar = () => {
        dispatch(sideBarAction(!appState.sideBarOpen))
    }

    return (
        <AppShell
            // layout='alt'
            hidden={hidden}
            p='lg'
            // navbarOffsetBreakpoint="sm"
            // asideOffsetBreakpoint="sm"
            // navbar={
            //     <Transition mounted={appState.sideBarOpen} transition="slide-right" duration={200} timingFunction="ease">
            //         {(styles) =>
            //             <AppSideBar styles={styles}></AppSideBar>
            //         }
            //     </Transition>
            // }
            aside={
                !!aside && aside
            }
        // aside={
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //         <AppSideBar></AppSideBar>
        //     </Aside>
        // }
        // className={classes.app}
        // aside={
        //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        //         <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //             <AppSideBar />
        //         </Aside>
        //     </MediaQuery>
        // }
        // footer={
        //     <Footer height={60} p="md">
        //         Application footer
        //     </Footer>
        // }
        // header={
        //     <AppNavBar openSideBar={openSideBar}></AppNavBar>
        // }
        >
            {children}
        </AppShell>
        // <div className='min-h-screen bg-white'>
        //     <ResponsiveNavbar />
        //     <Navbar />
        //     <main>{children}</main>
        //     <Footer />
        // </div>
    );
}

// const useStyles = createStyles((theme) => ({
//     app: {
//         backgroundColor: '#f8f9fa'
//     }
// }));