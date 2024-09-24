import { Button, rem, Text, Kbd, Loader } from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { AdminNavLink } from "../values/AdminLinks";
import { usePage } from "@inertiajs/react";

export default function AppSearch({ }: any) {

    const { auth }: any = usePage().props;
    const [data, setData] = useState<any[]>([]);
    const shortcut = 'K';

    const flattenLinks = (links: any, parentId = '') => {
        let result: any[] = [];

        for (const link of links) {
            const id = parentId ? `${parentId}_${link.link}` : link.link;

            const convertedData = {
                id,
                label: link.label,
                onClick: () => window.location = id,
                leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            };

            result.push(convertedData);

            if (link.links && link.links.length > 0) {
                result = result.concat(flattenLinks(link.links, id));
            }
        }

        return result;
    };

    useEffect(() => {
        const adminNavLinks = AdminNavLink(auth);
        const flattenedData = flattenLinks(adminNavLinks);
        const filteredData = flattenedData.filter(item => item.id !== undefined && item.id !== null);
        const orderedData = filteredData.slice().sort((a, b) => a.label.localeCompare(b.label));
        setData(orderedData);
    }, []);

    return <>
        <Button
            variant="light" color="gray"
            leftSection={<IconSearch style={{ width: rem(20), height: rem(20), color: 'black' }} stroke={2} />}
            rightSection={<><Kbd style={{ width: 80 }}>Ctrl + {shortcut}</Kbd></>}
            size='sm' mt={10}
            visibleFrom="sm" radius={'xl'}
            w={250}
            onClick={spotlight.open}
        >
            <Text w={250} fw={400} fz={14} c={'dimmed'} ta={'left'}> Search here....</Text>
        </Button>


        <Spotlight
            actions={data}
            highlightQuery
            searchProps={{
                leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
                placeholder: 'Search...',
            }}
            limit={5}
            shortcut={`mod + ${shortcut}`}
            nothingFound={'Nothing found...'}
        />
    </>
}