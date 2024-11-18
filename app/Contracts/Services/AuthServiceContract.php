<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\LoginRequestDTO;
use App\DTO\LoginResponseDTO;
use App\DTO\RegisterRequestDTO;
use App\DTO\RegisterResponseDTO;

interface AuthServiceContract
{
    public function login(LoginRequestDTO $dto): LoginResponseDTO;

    public function register(RegisterRequestDTO $dto): RegisterResponseDTO;

    public function logout(): void;
}
