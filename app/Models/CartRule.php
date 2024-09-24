<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CartRule extends Model
{
    use HasFactory;

    protected $table = 'ps_cart_rule';
    protected $primaryKey = 'id_cart_rule';

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function cartRuleShop(): HasOne
    {
        return $this->hasOne(CartRuleShop::class, 'id_cart_rule', 'id_cart_rule');
    }

    public static function getVoucherByUser($id_customer, $req = null)
    {
        $pagination = $req->input('per_page', 5);
        $query = CartRule::where('id_customer', $id_customer)
            ->with('cartRuleShop')
            ->orderBy('date_add', 'desc')
            ->paginate($pagination);

        return $query;
    } 
}
