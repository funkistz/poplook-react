
// export const theme: MantineThemeOverride = {
//     colorScheme: 'light',
//     colors: {
//         'primary': ['#a4dfb6', '#8ed7a4', '#77ce92', '#60c680', '#49be6d', '#33b65b', '#1cae49', '#199d42', '#168b3a', '#147a33'],
//         'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
//     },
// };

import { MantineProvider, MantineThemeOverride, MantineColorsTuple } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

const primary: MantineColorsTuple = [
    '#a4dfb6', '#8ed7a4', '#77ce92', '#60c680', '#49be6d', '#33b65b', '#1cae49', '#199d42', '#168b3a', '#147a33'
];

export const theme: MantineThemeOverride = {
    colors: {
        primary,
    },
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <MantineProvider defaultColorScheme="light" theme={theme} >
            <Notifications position="top-right" zIndex={2077} />
            {children}
        </MantineProvider>
    );
}