<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderPayment extends Model
{
    use HasFactory;
    protected $table      = 'ps_order_payment';
    protected $primaryKey = 'id_order_payment';

    public function orderByReference(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_reference', 'reference');
    }

    public static function updateOrderPayment($order, $pis_config, $data)
    {
        $id_order              = $order->id_order;
        $order_invoice_payment = OrderInvoicePayment::where('id_order', $order->id_order)->first();
        $order_invoice         = OrderInvoice::getRestPaid();
        $order_payment         = OrderPayment::insert([
            'order_reference'  => $order->reference,
            'id_currency'      => $order->id_currency,
            'id_order_payment' => $invoice->id_order_payment,
        ]);
        return true;
    }

    public static function getPISOrderPayment($pis_list)
    {
        $pis_payment_method = [];
        $total              = 0;
        $name_init          = '';
        $count              = 0;
        $total_count        = 1;
        // dump($pis_list);
        foreach ($pis_list as $key => $row) {
            // dump([$row->orderPaymentByReference, $total]);
            $test[]            = $row->orderPaymentByReference->payment_method;
            $test[]            = $row->orderPaymentByReference->order_reference;
            $payment_type      = str_replace('pay in store ', '', strtolower($row->orderPaymentByReference->payment_method));
            $payment_type      = str_replace(array('(', ')'), '', $payment_type);
            $payment_type      = str_replace('/', '_', $payment_type);
            $payment_type      = str_replace(' ', '_', $payment_type);
            $payment_type      = str_replace('-', '_', $payment_type);
            $payment_type_list = str_replace('Pay In Store ', '', $row->orderPaymentByReference->payment_method);
            $payment_type_list = str_replace(array('(', ')'), '', $payment_type_list);
            // dump($name_init);
            if ($name_init != $payment_type) {
                $count     = 0;
                $total     = 0;
                $name_init = $payment_type;
            }
            $total                                                  = $total + $row->orderPaymentByReference->amount;
            $pis_payment_method[$payment_type]                      = $total;
            $pis_payment_method[$payment_type . '_entry']           = 0;
            $pis_payment_method[$payment_type . '_variance']        = 0 - $total;
            $pis_payment_method[$payment_type . '_list'][$count]    = $row;
            $pis_payment_method['payment_type_list'][$payment_type] = $payment_type_list;
            $pis_payment_method['outlet']                           = $row->payment;
            $pis_payment_method['total_count']                      = $total_count++;
            $count++;
        }
        // dd($pis_payment_method);
        return $pis_payment_method;
    }
}
