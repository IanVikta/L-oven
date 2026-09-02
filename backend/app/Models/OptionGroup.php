<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OptionGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'is_required',
        'min_selectable',
        'max_selectable',
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'min_selectable' => 'integer',
        'max_selectable' => 'integer',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OptionItem::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_options');
    }
}
