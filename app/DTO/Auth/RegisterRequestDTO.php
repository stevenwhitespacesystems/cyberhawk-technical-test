<?php

declare(strict_types=1);

namespace App\DTO\Auth;

final class RegisterRequestDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $password,
    ) {
    }
}
