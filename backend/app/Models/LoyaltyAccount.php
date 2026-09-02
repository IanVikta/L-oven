<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoyaltyAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'current_points',
        'lifetime_points',
        'tier',
    ];

    protected $casts = [
        'current_points' => 'integer',
        'lifetime_points' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
