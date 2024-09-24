export const exampleListData = {
    current_page: 1,
    data: [
        {
            status: 'Completed',
            id: 123,
            name: '220124 Kelopak P1 Early Access ',
            type: 'Single',
            starts_on: '19.01.2024',
            ends_on: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            id: 123,
            name: '220124 Kelopak P2 Early Access ',
            type: 'Single',
            starts_on: '16.01.2024',
            ends_on: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            id: 123,
            name: '220123 Kelopak P1 Early Access ',
            type: 'Single',
            starts_on: '20.01.2024',
            ends_on: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            id: 123,
            name: '220124 Kelopak P1 Early Access ',
            type: 'Single',
            starts_on: '19.01.2024',
            ends_on: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            id: 123,
            name: '220124 Kelopak P2 Early Access ',
            type: 'Single',
            starts_on: '16.01.2024',
            ends_on: '22.01.2024',
            tag: ''
        },

    ],
    first_page_url: '',
    from: 1,
    last_page: 2,
    next_page_url: '',
    order_by: '',
    path: '',
    per_page: 5,
    prev_page_url: '',
    search: null,
    sort_by: '',
    to: 5,
    total: 9
}

export const data = (id: number) => {
    return [
        { title: 'Create your message', href: route('app_notification.createNew', { id: id }) },
        { title: 'Select segment', href: route('app_notification.segment', { id: id }) },
        { title: 'Edit Campaign options', href: route('app_notification.option', { id: id }) },
        { title: 'launch', href: route('app_notification.launch', { id: id }) },
    ]
}

export const WebPush = (id: number) => {
    return [
        { title: 'Segments', href: route('web_push.segment', { id: id }) },
        { title: 'Design', href: route('web_push.design', { id: id }) },
        { title: 'launch', href: route('web_push.lauch', { id: id }) },
    ]
}