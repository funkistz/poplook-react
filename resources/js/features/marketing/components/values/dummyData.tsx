import { IconBriefcase, IconCalendar, IconChartBar, IconChartDots, IconFaceId, IconLayoutGrid, IconPointer, IconShoppingBag, IconUser } from "@tabler/icons-react";


export const standard = [
    {title: 'Purchasing Behavior', desc: 'Target the users based on their shopping frequency, amount, and value.', icon: IconShoppingBag},
    {title: 'Visiting Behavior', desc: 'Target the users based on their previous visits to your website.', icon: IconPointer},
    {title: 'Attribute', desc: 'Target the users based on if they have an Attribute you select.', icon: IconBriefcase},
    {title: 'Events', desc: 'Target the users based on if they performed an Event you select.', icon: IconCalendar},
]

export const predictive = [
    {title: 'Likelihood to Purchase', desc: 'Target the users based on their potential of purchasing.', icon: IconPointer},
    {title: 'User Engagement', desc: 'Target the users based on their potential of opening and interacting with your messages.', icon: IconLayoutGrid},
]

export const saved = [
    {title: ' Dynamic Segments ', desc: 'Target users based on their actions, events and dynamic attributes.', icon: IconChartBar},
    {title: ' Static Segments ', desc: 'Target the users included in a static Contact List that you uploaded as a CSV file in your Saved Segments.', icon: IconChartDots},
    {title: ' First-Party Segments ', desc: "Target the users included in the Segment based on the list of attribute values you've previously uploaded.", icon: IconUser},
]