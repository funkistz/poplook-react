import { Badge, Text } from "@mantine/core";

export default function getStatusMarketing(campaign_status: any) {
    const variant = 'light';

    if(campaign_status.toLowerCase() == 'draft') {
        return <Badge variant={variant} color="gray">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'pause') {
        return <Badge variant={variant} color="orange">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'completed') {
        return <Badge variant={variant} color="green">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'in progress') {
        return <Badge variant={variant} color="blue">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'ready') {
        return <Badge variant={variant} color="violet">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'scheduled') {
        return <Badge variant={variant} color="yellow">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'error') {
        return <Badge variant={variant} color="red">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'active') {
        return <Badge variant={variant} color="cyan">{campaign_status}</Badge>
    } else {
        return <Text tt={'capitalize'} fz={14}>{campaign_status}</Text>
    }
}

export function getListSelect(){
    let list =  [
        { label: 'All', value: ''},
        { label: 'Active', value: 'active'},
        { label: 'Completed', value: 'completed'},
        { label: 'Draft', value: 'draft'},
        { label: 'Error', value: 'error'},
        { label: 'In Progress', value: 'in progress'},
        { label: 'Pause', value: 'pause'},
        { label: 'Ready', value: 'ready'},
        { label: 'Scheduled', value: 'scheduled'},
    ];

    return list;
}

export function getStatusEInvoice(campaign_status: any) {
    const variant = 'light';

    if(campaign_status.toLowerCase() == 'draft') {
        return <Badge variant={variant} color="gray">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'pause') {
        return <Badge variant={variant} color="orange">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'completed') {
        return <Badge variant={variant} color="green">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'in progress') {
        return <Badge variant={variant} color="blue">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'ready') {
        return <Badge variant={variant} color="violet">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'scheduled') {
        return <Badge variant={variant} color="yellow">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'error') {
        return <Badge variant={variant} color="red">{campaign_status}</Badge>
    } else if(campaign_status.toLowerCase() == 'active') {
        return <Badge variant={variant} color="cyan">{campaign_status}</Badge>
    } else {
        return <Text tt={'capitalize'} fz={14}>{campaign_status}</Text>
    }
}

export function getListEIvoice({withFilter = false}){
    let list =  [
        { label: 'Active', value: 'active'},
        { label: 'Completed', value: 'completed'},
        { label: 'Draft', value: 'draft'},
        { label: 'Error', value: 'error'},
        { label: 'In Progress', value: 'in progress'},
    ]; // Need to Confirm

    if (withFilter) {
        list.unshift({ label: 'All', value: '' });
    }

    return list;
}