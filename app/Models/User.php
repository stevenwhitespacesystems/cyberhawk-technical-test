<?php

declare(strict_types=1);

namespace App\Models;

use App\Contracts\Base\Model as ModelInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property string             $id
 * @property string             $name
 * @property string             $email
 * @property ?Carbon            $email_verified_at
 * @property string             $password
 * @property ?string            $remember_token
 */
final class User extends Authenticatable implements ModelInterface
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
        'password',
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
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function password(): Attribute
    {
        return new Attribute(
            get: fn (string $value) => $value,
            set: fn (string $value) => Hash::make($value, ['rounds' => 12]),
        );
    }

    public function inspectedComponents(): HasMany
    {
        return $this->hasMany(InspectedComponent::class);
    }
}
