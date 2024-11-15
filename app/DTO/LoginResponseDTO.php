<?php

declare(strict_types=1);

namespace App\DTO;

use App\Models\User;

final class LoginResponseDTO
{
    public function __construct(
        public readonly User $user,
        public readonly string $token,
    ) {
    }
}
