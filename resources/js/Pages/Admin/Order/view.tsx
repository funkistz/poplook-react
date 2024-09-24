import { usePage } from '@inertiajs/react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { OrderDetails } from './Components/Index';

export default function OrderPage({ close }: any) {
    const { order } = usePage<any>().props;
 
    return  <>
        <OrderDetails order={order} />
    </>

}

OrderPage.layout = (page: any) => <AdminLayout children={page} title={'Order Details #' + window.location.href.substring(window.location.href.lastIndexOf('/') + 1)} back={true} />;
