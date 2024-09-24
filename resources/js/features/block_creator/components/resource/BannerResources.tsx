import { Flex, Text, Group, Button } from "@mantine/core";
import BannerResource from "./BannerResource";
import { addResource, setChildBLock } from "../../redux/blockSlice";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";


function BannerResources({ childBlock }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // Define
    var oneResourceType = ['block', 'vimeo', 'text', 'countdown'];

    const onAddResource = () => {
        dispatch(addResource({ type: childBlock.type }));
    }

    const setPosition = (attr: any, index: any) => {
        if (attr == 'down') {
            if (index < childBlock.resource.length - 1) {
                const updatedArray = [...childBlock.resource];
                const indexCal = index + 1;
                [updatedArray[index], updatedArray[indexCal]] = [updatedArray[index + 1], updatedArray[index]];
                const result = { ...childBlock, resource: updatedArray };
                dispatch(setChildBLock(result))

            }
        } else {
            if (index > 0) {
                const updatedArray = [...childBlock.resource];
                const indexCal = index - 1;
                [updatedArray[index], updatedArray[indexCal]] = [updatedArray[index - 1], updatedArray[index]];
                const result = { ...childBlock, resource: updatedArray };
                dispatch(setChildBLock(result))
            }
        }
    };

    return (<>
        <Flex justify={'space-between'} pt={20}>
            <Text mb='xs' fz={16} fw={600}>Contents</Text>
            {!(oneResourceType.indexOf(childBlock.type) > -1) && <Group justify='flex-end' mb='sm'>
                <Button size='xs' color='blue' w={'full'} onClick={() => onAddResource()}>Add Item</Button>
            </Group>}
        </Flex>

        {(oneResourceType.indexOf(childBlock.type) > -1) &&
            <BannerResource resource={childBlock.resource} childBlock={childBlock} />
        }
        {(oneResourceType.indexOf(childBlock.type) == -1) &&
            <>
                {childBlock.resource && childBlock.resource.map((resource: any, index: any) => {
                    return <BannerResource
                        key={index}
                        index={index}
                        resource={resource}
                        childBlock={childBlock}
                        setPosition={setPosition}
                        lastIndex={childBlock.resource.length}
                    />
                })}
            </>
        }
    </>);
}

export default BannerResources;