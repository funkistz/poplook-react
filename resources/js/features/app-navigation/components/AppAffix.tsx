import { Affix, Transition, ActionIcon, rem } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';

export default function AppAffix() {

    const [scroll, scrollTo] = useWindowScroll();
    return (
        <>
            <Affix position={{ bottom: 30, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <ActionIcon size={'xl'} color={'dark'} style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
                            <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
                        </ActionIcon>
                    )}
                </Transition>
            </Affix>
        </>
    )
}
