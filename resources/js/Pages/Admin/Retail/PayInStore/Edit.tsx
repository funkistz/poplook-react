import { usePage } from '@inertiajs/react';
import AdminLayout from '@/Components/layout/AdminLayout';
import { OrderDetails } from '../../Order/Components/Index';

export default function OrderPage() {
    const { order } = usePage<any>().props;
 
    return  <>
        <OrderDetails order={order} isPayInStore={true}  />
    </>

}

OrderPage.layout = (page: any) => <AdminLayout children={page} title={'Order Details #' + window.location.href.substring(window.location.href.lastIndexOf('/') + 1)} back={true} />;
