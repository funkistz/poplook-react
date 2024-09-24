import { Button, Group, Text, Box, Card } from "@mantine/core";

function AppCard({ title, children, rightComponents }: any) {
    return (
        <Card shadow="sm" radius="md" p="xl" mb='xl'>
            <Card.Section withBorder inheritPadding py="xs">
                <Group position="apart">
                    <Text size="lg" weight={600}>
                        {title}
                    </Text>
                    {rightComponents}
                </Group>
            </Card.Section>
            <Box pt={"xl"}>
                {children}
            </Box>
        </Card>
    );
}

export default AppCard;