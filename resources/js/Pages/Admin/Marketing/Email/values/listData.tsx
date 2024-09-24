export const exampleListData = {
    current_page: 1,
    data: [
        {
            status: 'Completed',
            name: '220124 Kelopak P1 Early Access ',
            type: 'Single',
            created_on: '19.01.2024',
            send_date: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            name: '220124 Kelopak P2 Early Access ',
            type: 'Single',
            created_on: '16.01.2024',
            send_date: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            name: '220123 Kelopak P1 Early Access ',
            type: 'Single',
            created_on: '20.01.2024',
            send_date: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            name: '220124 Kelopak P1 Early Access ',
            type: 'Single',
            created_on: '19.01.2024',
            send_date: '22.01.2024',
            tag: ''
        },
        {
            status: 'Completed',
            name: '220124 Kelopak P2 Early Access ',
            type: 'Single',
            created_on: '16.01.2024',
            send_date: '22.01.2024',
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
        { title: 'Recipients', href: route('email_analytics.recipients', { id: id }) },
        { title: 'Design', href: route('email_analytics.design', { id: id }) },
        { title: 'Launch', href: route('email_analytics.launch', { id: id }) },
    ]
}