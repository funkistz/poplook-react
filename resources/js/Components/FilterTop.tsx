import { Button, Group, Text, Box, Card, Grid, Select, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

function FilterTop({ title, children, rightComponents , opened}: any) {
    return (
        <Card withBorder radius="md" style={{ overflow: 'visible' }}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify={'space-between'}>
                    <Text size="lg" fw={500}>
                        {title}
                    </Text>
                    {rightComponents}
                </Group>
            </Card.Section>
            <Box pt={"xs"}>
                <Collapse in={opened}>
                    <Grid>
                        <>
                            {children}
                        </>
                    </Grid>
                </Collapse>
            </Box>
        </Card>
    );
}

export default FilterTop;