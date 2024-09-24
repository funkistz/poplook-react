<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderInvoice extends Model
{
    use HasFactory;
    protected $table      = 'ps_order_invoice';
    protected $primaryKey = 'id_order_invoice';

	/**
	 * Rest Paid
	 * @since 1.5.0.2
	 * @return float Rest Paid
	 */
	public function getRestPaid()
	{
		return round($this->total_paid_tax_incl + $this->getSiblingTotal() - $this->getTotalPaid(), 2);
	}


	/**
	 * Return collection of order invoice object linked to the payments of the current order invoice object
	 * 
	 * @since 1.5.0.14
	 */
	public function getSibling()
	{
		$query = new DbQuery();
		$query->select('oip2.id_order_invoice');
		$query->from('order_invoice_payment', 'oip1');
		$query->innerJoin('order_invoice_payment', 'oip2',
			'oip2.id_order_payment = oip1.id_order_payment AND oip2.id_order_invoice <> oip1.id_order_invoice');
		$query->where('oip1.id_order_invoice = '.$this->id);
		
		$invoices = Db::getInstance()->executeS($query);
		if (!$invoices)
			return array();
		
		$invoice_list = array();
		foreach ($invoices as $invoice)
			$invoice_list[] = $invoice['id_order_invoice'];
		
		$payments = new Collection('OrderInvoice');
		$payments->where('id_order_invoice', 'IN', $invoice_list);
		
		return $payments;
	}
	

	/**
	 * Return total to paid of sibling invoices
	 * 
	 * @param int $mod TAX_EXCL, TAX_INCL, DETAIL
	 * 
	 * @since 1.5.0.14
	 */
	public function getSiblingTotal($mod = OrderInvoice::TAX_INCL)
	{
		$query = new DbQuery();
		$query->select('SUM(oi.total_paid_tax_incl) as total_paid_tax_incl, SUM(oi.total_paid_tax_excl) as total_paid_tax_excl');
		$query->from('order_invoice_payment', 'oip1');
		$query->innerJoin('order_invoice_payment', 'oip2',
			'oip2.id_order_payment = oip1.id_order_payment AND oip2.id_order_invoice <> oip1.id_order_invoice');
		$query->leftJoin('order_invoice', 'oi',
			'oi.id_order_invoice = oip2.id_order_invoice');
		$query->where('oip1.id_order_invoice = '.$this->id);
		
		$row = Db::getInstance()->getRow($query);
		
		switch ($mod)
		{
			case OrderInvoice::TAX_EXCL:
				return $row['total_paid_tax_excl'];
			case OrderInvoice::TAX_INCL:
				return $row['total_paid_tax_incl'];
			default:
				return $row;
		}
	}
}
