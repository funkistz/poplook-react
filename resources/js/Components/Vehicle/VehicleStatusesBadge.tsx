import { Badge } from "@mantine/core";

function VehicleStatusesBadge({ statuses }: any) {
    return (<>
        {statuses && statuses.map((status: any, index: any) => {
            return <Badge mr='xs' key={index} color={status.color} variant="outline">{status.name}{status.label ? ': ' + status.label : ''}</Badge>
        })}
    </>);
}

export default VehicleStatusesBadge;