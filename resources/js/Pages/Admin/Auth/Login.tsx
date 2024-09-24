import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Paper, Text, rem, Title, Button, Center, Anchor, BackgroundImage, Group, TextInput, Flex, Box, Checkbox, Loader, Grid, LoadingOverlay, PasswordInput, Stack } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import AppLogo from '@/Components/AppLogo';

interface LoginProps {
    status: string;
    canResetPassword: boolean;
}

export default function LoginPage(args: LoginProps) {

    const { status, canResetPassword } = args;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });
    const [loading, setLoading] = useState<any>(false);

    useEffect(() => {
        setLoading(false);
    }, [errors])

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onChange = (event: { target: { name: any; value: any } }) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        post(route('admin.login'));
    };

    return (
        <>
            <Center h='100vh' w='100%' style={{backgroundImage : "url('/bg-admin.jpg')"}}>
                {/* <Image src="/sinarautologo.jpeg" h='100vh'> */}
                <Flex
                    h='100%'
                    // bg="rgba(0, 0, 0, .3)"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    <Box pos="relative">
                        <form onSubmit={submit}>
                            {status && <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>}
                            <Paper withBorder shadow="md" p={40} w={500} style={{ borderRadius: 20 }}>
                                <LoadingOverlay visible={loading}
                                    zIndex={1000}
                                    overlayProps={{ radius: 'sm', blur: 1 }}
                                    loaderProps={{ color: 'green', type: 'dots' }}
                                    style={{ borderRadius: 20 }}
                                />
                                <Stack h={100} align={'center'}>
                                    <AppLogo width={200} />
                                </Stack>
                                
                                {/* <Text mt={50} mb='md' fz={30}>Login</Text> */}
                                <TextInput
                                    name='email'
                                    placeholder="Email"
                                    label="Email"
                                    type='text'
                                    value={data.email}
                                    onChange={onChange}
                                    autoComplete='username'
                                    autoFocus
                                    error={errors.email}
                                    required
                                    withAsterisk
                                />
                                {/* <TextInput
                                    name='password'
                                    label="Password"
                                    placeholder="Password"
                                    type='password'
                                    value={data.password}
                                    autoComplete='current-password'
                                    onChange={onChange}
                                    required
                                    mt="md"
                                    error={errors.password}
                                /> */}
                                <PasswordInput
                                    name='password'
                                    label="Password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={onChange}
                                    required
                                    error={errors.password}
                                    mt="md"
                                />
                                {/* <Group justify='space-between' mt="lg">
                                    <Checkbox
                                        label='Remember'
                                        name='remember'
                                        value={data.remember}
                                        onChange={(e: { target: { checked: any } }) => e.target.checked}
                                    />
                                    {canResetPassword && (
                                        <Link href='/forgot-password' className='text-sm text-slate-600 underline hover:text-slate-900'>
                                            <Anchor component="button" size="sm">
                                                Forgot password?
                                            </Anchor>
                                        </Link>
                                    )}
                                </Group> */}

                                <Button bg={'green'} loading={loading} loaderProps={{ type: 'dots' }} id='login-button' fullWidth mt="xl" type='submit'>
                                    Sign in
                                </Button>
                                {/* <Loader className='loader' id={'loader-login'} style={{ width: '100%', display: 'none', flexDirection: 'row', justifyContent: 'center', }} /> */}
                            </Paper>
                        </form>
                    </Box>
                </Flex>
                {/* </BackgroundImage> */}
            </Center>
            {/* <Head title='Log in' />


            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput='email' value='Email' />

                    <TextInput
                        type='text'
                        name='email'
                        value={data.email}
                        autoComplete='username'
                        autoFocus
                        onChange={onChange}
                    />

                    <InputError message={errors.email} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel forInput='password' value='Password' />

                    <TextInput
                        type='password'
                        name='password'
                        value={data.password}
                        autoComplete='current-password'
                        onChange={onChange}
                    />

                    <InputError message={errors.password} className='mt-2' />
                </div>

                <div className='mt-4 block'>
                    <label className='flex items-center'>
                        <Checkbox
                            name='remember'
                            value={data.remember}
                            onChange={(e: { target: { checked: any } }) => e.target.checked}
                        />

                        <span className='ml-2 text-sm text-slate-600'>Remember me</span>
                    </label>
                </div>

                <div className='mt-4 flex items-center justify-end'>
                    {canResetPassword && (
                        <Link href='/forgot-password' className='text-sm text-slate-600 underline hover:text-slate-900'>
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className='ml-4' disabled={processing} type='submit'>
                        Log in
                    </PrimaryButton>
                </div>
            </form> */}
        </>
    );
}

LoginPage.layout = (page: React.ReactNode) => {
    return (
        <GuestLayout
            children={page}
        />
    );
};

// const useStyles = createStyles((theme) => ({
//     wrapper: {
//         minHeight: rem(900),
//         backgroundSize: 'cover',
//         backgroundImage:
//             'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
//     },

//     form: {
//         borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
//             }`,
//         minHeight: rem(900),
//         maxWidth: rem(450),
//         paddingTop: rem(80),

//         [theme.fn.smallerThan('sm')]: {
//             maxWidth: '100%',
//         },
//     },

//     title: {
//         color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//         fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//     },
// }));