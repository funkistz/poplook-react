import { Card, Image, Text, Group, Badge, createStyles, Center, Button, rem } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { router } from '@inertiajs/react';

const mockdata = [
    { label: '4 passengers', icon: IconUsers },
    { label: '100 km/h in 4 seconds', icon: IconGauge },
    { label: 'Automatic gearbox', icon: IconManualGearbox },
    { label: 'Electric', icon: IconGasStation },
];

function VehicleStats({ statuses, total }: any) {
    const { classes } = useStyles();
    const features = mockdata.map((feature) => (
        <Center key={feature.label}>
            <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs">{feature.label}</Text>
        </Center>
    ));

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src="tesla.png" alt="Tesla Model S" />
            </Card.Section>

            <Group position="apart" mt="md">
                <div>
                    <Text fw={500}>Total Vehicle</Text>
                    <Text fz="xs" c="dimmed">
                        All Status
                    </Text>
                </div>
                <Text fz={40} weight='bolder'>{total}</Text>
            </Group>

            {statuses && statuses.map((status: any, index: any) => {

                return <Card.Section key={index} className={classes.section}>
                    <Group position="apart" className={classes.list}>
                        <Text fw={500} color={status.color}>{status.name}:</Text>

                        <Badge color={status.color} variant="dot" size='lg'>{status.vehicles_count}</Badge>
                        {/* <Button radius="xl" >
                            {status.vehicles_count}
                        </Button> */}
                    </Group>
                </Card.Section>

            })}

            <Card.Section className={classes.section}>
                <Group spacing={30}>
                    {/* <div>
                        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                            $168.00
                        </Text>
                        <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                            per day
                        </Text>
                    </div> */}

                    <Button radius="xl" style={{ flex: 1 }} onClick={() => router.visit(route('vehicle.index'))}>
                        View All
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );
}

export default VehicleStats;

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: 400
    },

    imageSection: {
        padding: theme.spacing.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: rem(-0.25),
        textTransform: 'uppercase',
    },

    section: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingTop: theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
        borderTop: '1px solid #e1e1e1',
        borderBottom: '1px solid #e1e1e1',
    },

    icon: {
        marginRight: rem(5),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },
    list: {
        // borderBottom: '1px solid #999'
    }
}));