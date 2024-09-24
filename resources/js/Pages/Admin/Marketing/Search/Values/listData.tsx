import moment from "moment"

export const exampleListData = {
    current_page: 1,
    data: [
        {
            keyword: 'raya',
            trend: [
                { date: moment(new Date()).subtract(6, 'days').format('DD MMM'), Click: 1200, Search: 900 },
                { date: moment(new Date()).subtract(5, 'days').format('DD MMM'), Click: 1900, Search: 1200 },
                { date: moment(new Date()).subtract(4, 'days').format('DD MMM'), Click: 400, Search: 1000 },
                { date: moment(new Date()).subtract(3, 'days').format('DD MMM'), Click: 1000, Search: 200 },
                { date: moment(new Date()).subtract(2, 'days').format('DD MMM'), Click: 800, Search: 1400 },
                { date: moment(new Date()).subtract(1, 'days').format('DD MMM'), Click: 750, Search: 600 },
            ],
            monthly: 210,
        },
        {
            keyword: 'poplook',
            trend: [
                { date: moment(new Date()).subtract(6, 'days').format('DD MMM'), Click: 1200, Search: 900 },
                { date: moment(new Date()).subtract(5, 'days').format('DD MMM'), Click: 1900, Search: 1200 },
                { date: moment(new Date()).subtract(4, 'days').format('DD MMM'), Click: 400, Search: 1000 },
                { date: moment(new Date()).subtract(3, 'days').format('DD MMM'), Click: 1000, Search: 200 },
                { date: moment(new Date()).subtract(2, 'days').format('DD MMM'), Click: 800, Search: 1400 },
                { date: moment(new Date()).subtract(1, 'days').format('DD MMM'), Click: 750, Search: 600 },
            ],
            monthly: 210,
        },
        {
            keyword: 'sahmura',
            trend: [
                { date: moment(new Date()).subtract(6, 'days').format('DD MMM'), Click: 1200, Search: 900 },
                { date: moment(new Date()).subtract(5, 'days').format('DD MMM'), Click: 1900, Search: 1200 },
                { date: moment(new Date()).subtract(4, 'days').format('DD MMM'), Click: 400, Search: 1000 },
                { date: moment(new Date()).subtract(3, 'days').format('DD MMM'), Click: 1000, Search: 200 },
                { date: moment(new Date()).subtract(2, 'days').format('DD MMM'), Click: 800, Search: 1400 },
                { date: moment(new Date()).subtract(1, 'days').format('DD MMM'), Click: 750, Search: 600 },
            ],
            monthly: 210,
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

export const WebPush = (id: number) => {
    return [
        { title: 'Segments', href: route('web_push.segment', { id: id }) },
        { title: 'Design', href: route('web_push.design', { id: id }) },
        { title: 'launch', href: route('web_push.launch', { id: id }) },
    ]
}