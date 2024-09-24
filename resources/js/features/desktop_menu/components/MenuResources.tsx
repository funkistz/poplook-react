import MenuResource from "./MenuResource";

function MenuResources({ menuParent }: any) {

    // Define
    var oneResourceType = ['block'];

    return (<>
        {(oneResourceType.indexOf(menuParent.type) > -1) &&
            <MenuResource resource={menuParent.resource} childBlock={menuParent} />
        }
        {(oneResourceType.indexOf(menuParent.type) == -1) &&
            <>
                {menuParent.resource && menuParent.resource.map((resource: any, index: any) => {
                    return <MenuResource key={index} index={index} resource={resource} childBlock={menuParent} />
                })}
            </>
        }
    </>);
}

export default MenuResources;