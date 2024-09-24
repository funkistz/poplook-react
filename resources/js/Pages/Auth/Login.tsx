import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { Paper, Text, rem, Title, Button, Center, Anchor, BackgroundImage, Group, TextInput, Flex, Box, Checkbox } from '@mantine/core';
import { Image } from '@mantine/core';

interface LoginProps {
    status: string;
    canResetPassword: boolean;
}

export default function Login(args: LoginProps) {

    // const { classes } = useStyles();
    const { status, canResetPassword } = args;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

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

        post(route('login'));
    };

    return (
        <>
            <Center h='100vh' w='100%' bg='#2b2627'>
                {/* <BackgroundImage src="/sinarautologo.jpeg" h='100vh'> */}
                <Flex
                    h='100%'
                    // bg="rgba(0, 0, 0, .3)"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    <Box>
                        <Image maw={400} mx="auto" src="/sinarautologo.jpeg" alt="logo" style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, overflow: 'hidden', border: '1px solid #fff' }} />
                    </Box>
                    <Box>
                        <form onSubmit={submit}>
                            {status && <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>}


                            {/* <Text color="dimmed" size="sm" align="center" mt={5}>
                            Do not have an account yet?{' '}
                            <Anchor size="sm" component="button">
                                Create account
                            </Anchor>
                        </Text> */}

                            <Paper withBorder shadow="md" p={30} w={400} h={400} style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                <Title mb='xl'>Login</Title>
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
                                <TextInput
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
                                />
                                <Group justify='space-between' mt="lg">
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

                                </Group>
                                <Button fullWidth mt="xl" type='submit'>
                                    Sign in
                                </Button>
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

Login.layout = (page: React.ReactNode) => {
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