<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OptionItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'option_group_id',
        'name',
        'price_modifier',
        'is_available',
    ];

    protected $casts = [
        'price_modifier' => 'decimal:2',
        'is_available' => 'boolean',
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(OptionGroup::class, 'option_group_id');
    }
}
