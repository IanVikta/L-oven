<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItemOption extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'order_item_id',
        'option_item_id',
        'option_group_name',
        'option_item_name',
        'price_modifier',
    ];

    protected $casts = [
        'price_modifier' => 'decimal:2',
    ];

    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }

    public function optionItem(): BelongsTo
    {
        return $this->belongsTo(OptionItem::class);
    }
}
