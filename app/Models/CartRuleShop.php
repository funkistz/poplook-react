<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\hasOne;

class CartRuleShop extends Model
{
    use HasFactory;

    protected $table = 'ps_cart_rule_shop';
    protected $primaryKey = 'id_cart_rule';

   
    public function CartRule(): BelongsTo
    {
        // return $this->belongsTo(CartRule::class, 'id_cart_rule', 'id_cart_rule');
        return $this->belongsTo(CartRule::class, 'id_cart_rule', 'id_cart_rule');
    }


    
}
