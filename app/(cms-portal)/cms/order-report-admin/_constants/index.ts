interface Columns {
    header: string;
    headerStyle: React.CSSProperties;
    field: string;
    sortable: boolean;
}

export const dataColumns: Columns[] = [
    {
        header: 'Actions',
        headerStyle: { minWidth: '10rem' },
        field: 'actions',
        sortable: false
    },
    {
        header: 'วันที่ทำรายการ',
        headerStyle: { minWidth: '10rem' },
        field: 'requestDate',
        sortable: true
    },
    {
        header: 'ชื่อ',
        headerStyle: { minWidth: '10rem' },
        field: 'name',
        sortable: true
    },
    {
        header: 'นามสกุล',
        headerStyle: { minWidth: '10rem' },
        field: 'lastName',
        sortable: true
    },
    {
        header: 'เบอร์โทร',
        headerStyle: { minWidth: '10rem' },
        field: 'tel',
        sortable: true
    },
    {
        header: 'Email',
        headerStyle: { minWidth: '10rem' },
        field: 'email',
        sortable: true
    },
    {
        header: 'Channel',
        headerStyle: { minWidth: '10rem' },
        field: 'channel',
        sortable: true
    },
    {
        header: 'OrderNo',
        headerStyle: { minWidth: '10rem' },
        field: 'orderNo',
        sortable: true
    },
    {
        header: 'OrderStatus',
        headerStyle: { minWidth: '10rem' },
        field: 'orderStatus',
        sortable: true
    },
    {
        header: 'PaymentNO',
        headerStyle: { minWidth: '10rem' },
        field: 'paymentNo',
        sortable: true
    },
    {
        header: 'ทะเบียนรถ',
        headerStyle: { minWidth: '10rem' },
        field: 'licensePlate',
        sortable: true
    },
    {
        header: 'insOrderNo',
        headerStyle: { minWidth: '10rem' },
        field: 'insOrderNo',
        sortable: true
    },
    {
        header: 'Message',
        headerStyle: { minWidth: '10rem' },
        field: 'message',
        sortable: true
    }
];
