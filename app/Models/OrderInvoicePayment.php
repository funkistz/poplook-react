<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderInvoicePayment extends Model
{
    use HasFactory;
    protected $table      = 'ps_order_invoice_payment';
    protected $primaryKey = 'id_order_invoice';
    
}
