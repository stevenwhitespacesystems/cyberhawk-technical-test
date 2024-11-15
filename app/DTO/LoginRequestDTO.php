<?php

declare(strict_types=1);

namespace App\DTO;

final class LoginRequestDTO
{
    public function __construct(
        public readonly string $email,
        public readonly string $password,
    ) {
    }
}
