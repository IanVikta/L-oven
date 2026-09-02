<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'avatar_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /* -------------------------------------------------------------------------- */
    /* RELATIONSHIPS                                                              */
    /* -------------------------------------------------------------------------- */

    public function addresses(): HasMany
    {
        return $table = $this->hasMany(Address::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function loyaltyAccount(): HasOne
    {
        return $this->hasOne(LoyaltyAccount::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /* -------------------------------------------------------------------------- */
    /* ROLE HELPERS                                                               */
    /* -------------------------------------------------------------------------- */

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isBarista(): bool
    {
        return $this->role === 'barista';
    }

    public function isKitchen(): bool
    {
        return $this->role === 'kitchen';
    }

    public function isDriver(): bool
    {
        return $this->role === 'driver';
    }

    public function isCustomer(): bool
    {
        return $this->role === 'customer';
    }
}
