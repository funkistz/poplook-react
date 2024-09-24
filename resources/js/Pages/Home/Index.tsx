import { BackgroundImage, Box, Container, Text, Image, Center, Grid, rem, Stack, SimpleGrid, List } from '@mantine/core';
import HomeLayout from '@/Layouts/HomeLayout';
import { Link } from '@inertiajs/react';

export default function HomePage() {
    return (
        <>
            <Image src={'https://poplook.com/modules/banners/banner_img/e8abd5d3470b3607627723408479e3e0.jpg'} pb={10} />
            <Image src={'https://poplook.com/modules/banners/banner_img/3f62b159072f518d8478d93bc1ea297d.jpg'} pb={10} />
            <Image src={'https://poplook.com/modules/banners/banner_img/d57864f9cd70ede8887b428c883d56e1.jpg'} pb={10} />
            <Image src={'https://poplook.com/modules/banners/banner_img/d9632d697ac250cf6cf8aa226a9ce323.jpg'} pb={10} />
            <Image src={'https://poplook.com/modules/banners/banner_img/a551d83979f50ba7c0e89657bbf8079a.jpg'} pb={10} />

            <Center>
                <h1 className='text-center'>Visit Our Stores</h1>
            </Center>


            <SimpleGrid
                cols={3}
                spacing="lg"
            // breakpoints={[
            // { maxWidth: '62rem', cols: 3, spacing: 'md' },
            // { maxWidth: '48rem', cols: 2, spacing: 'sm' },
            // { maxWidth: '36rem', cols: 1, spacing: 'sm' },
            // ]}
            >
                <Image src={'https://poplook.com/modules/banners/banner_img/c0ce001dc8d6dec5eadb85cb741dcc9a.jpg'} pb={10} />
                <Image src={'https://poplook.com/modules/banners/banner_img/f01105609dcf624db4a2f579100d5e99.jpg'} pb={10} />
                <Image src={'https://poplook.com/modules/banners/banner_img/b5ab7bf686499e9542ebf5aede316caa.jpg'} pb={10} />
                <Image src={'https://poplook.com/modules/banners/banner_img/cbe149aa70d6e180b698ec2bffac1c9d.jpg'} pb={10} />
                <Image src={'https://poplook.com/modules/banners/banner_img/ac01a2e012857bcf6f427d91f9846dda.jpg'} pb={10} />
                <Image src={'https://poplook.com/modules/banners/banner_img/344e4aaab907414130a81709eb81cb65.jpg'} pb={10} />
                <Image src={'https://poplook.com/modules/banners/banner_img/387d35ab98c97992a85810671a32d552.jpg'} pb={10} />
            </SimpleGrid>

            <Grid justify='center' bg={'pink'} m={0} p={0} align="flex-start">
                <Grid.Col span={11}>
                    <Grid justify="space-between" mt={100}>
                        <Grid.Col span={9} bg={'#efefef'}>
                            <Grid>
                                <Grid.Col span='content' bg={'cyan'}>
                                    <Text>SERVICES</Text>
                                    <List style={{ listStyle: 'none' }}>
                                        <List.Item>Contact Us</List.Item>
                                        <List.Item>Shipping Information</List.Item>
                                        <List.Item>Returns/Exchanges</List.Item>
                                        <List.Item>Gift Cards</List.Item>
                                        <List.Item>FAQs</List.Item>
                                    </List>
                                </Grid.Col>

                                <Grid.Col span='content' bg={'violet'}>
                                    <Text>INFORMATION</Text>
                                    <List style={{ listStyle: 'none' }}>
                                        <List.Item>About Us</List.Item>
                                        <List.Item>Media</List.Item>
                                        <List.Item>Terms &  Conditions</List.Item>
                                        <List.Item>Careers</List.Item>
                                        <List.Item>Visit Our Stores</List.Item>
                                        <List.Item>POPLOOK Rewards</List.Item>
                                    </List>
                                </Grid.Col>

                                <Grid.Col span='content' bg={'lime'}>
                                    <Text>ON THE GO</Text>
                                    <Text>Download the Poplook App - <a href={'https://poplook.com/poplook_app'} target='blank'>Find out more</a></Text>
                                    <Box style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                        <Image src="https://poplook.com/assets/img/logo/playstore.png" style={{ width: 100 }} />
                                        <Image src="https://poplook.com/assets/img/logo/appstore.svg" style={{ width: 100 }} ml={5} />
                                    </Box>
                                    <Image src={"https://poplook.com/assets/img/Poplook's%20APP%20QR%20Code.png"} style={{ width: 100 }} mt={10} />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>

                        <Grid.Col span={3} bg={'yellow'}>3</Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>






        </>
    );
}

// HomePage.layout = (page: any) => <HomeLayout children={page} title='Home' />;
