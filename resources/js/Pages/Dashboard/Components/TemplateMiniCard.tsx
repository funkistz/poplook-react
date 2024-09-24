import { Text, Group, Paper, RingProgress, Center } from "@mantine/core";
import { useEffect, useState } from "react";

function MiniCard({ color, progress, percentage, label, total }: any) {

    useEffect(() => {

    }, [])

    return <>
        <Paper withBorder radius="md" p="xs">
            <Group>
                <RingProgress
                    size={80}
                    // roundCaps
                    thickness={8}
                    sections={[{ value: progress, color: color }]}
                    label={
                        <Center>
                            <Text color="dark" size={'xs'} fw={600}>{progress}%</Text>
                        </Center>
                    }
                />

                <div>
                    <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                        {label}
                    </Text>
                    <Text weight={700} size="xl">
                        {total}
                    </Text>
                </div>
            </Group>
        </Paper>
    </>
}

export default MiniCard;
