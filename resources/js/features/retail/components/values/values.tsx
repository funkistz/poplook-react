export const cashForm = (data:any) => [
    {
        label: '0.05',
        value: data.fiveSen,
        dataValue: 'fiveSen',
    },
    {
        label: '1',
        value: data.oneRigt,
        dataValue: 'oneRigt',
    },
    {
        label: '20',
        value: data.twentyRigt,
        dataValue: 'twentyRigt',
    },
    {
        label: '0.10',
        value: data.tenSen,
        dataValue: 'tenSen',
    },
    {
        label: '2',
        value: data.twoRigt,
        dataValue: 'twoRigt',
    },
    {
        label: '50',
        value: data.fiftyRigt,
        dataValue: 'fiftyRigt',
    },
    {
        label: '0.20',
        value: data.twentySen,
        dataValue: 'twentySen',
    },
    {
        label: '5',
        value: data.fiveRigt,
        dataValue: 'fiveRigt',
    },
    {
        label: '100',
        value: data.hundrRigt,
        dataValue: 'hundrRigt',
    },
    {
        label: '0.50',
        value: data.fiftySen,
        dataValue: 'fiftySen',
    },
    {
        label: '10',
        value: data.tenRigt,
        dataValue: 'tenRigt',
    },
    {
        label: '500',
        value: data.fiftyHundRigt,
        dataValue: 'fiftyHundRigt',
    },
]

const getRandomDateTime = (start:any, end:any) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const dummyCash = {
    current_page: 1,
    data: [
        {
           datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
           orderId: 'TST2-0000000001',
           paid: 'RM 149.00',
           total: 'RM 149.00'
        },
        {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-0000000001',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0000000001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
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

export const dummyCard = {
    current_page: 1,
    data: [
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0001',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0002',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0003',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
             datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
             orderId: 'TST2-0004',
             paid: 'RM 149.00',
             total: 'RM 149.00'
          },
          {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-00044',
            paid: 'RM 149.00',
            total: 'RM 149.00'
         },
         {
            datetime: getRandomDateTime(new Date(2024, 5, 1), new Date()),
            orderId: 'TST2-00214',
            paid: 'RM 149.00',
            total: 'RM 149.00'
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

export const payInstore = {
    current_page: 1,
    data: [
      {
         orderId: '1234',
         name: 'Jamie Lee',
         total: 'RM 149.00',
         paymentStatus: 'Pay In Store',
         status: 'Pay In Store',
         date: getRandomDateTime(new Date(2024, 5, 1), new Date()),
         shop: 1,  
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
