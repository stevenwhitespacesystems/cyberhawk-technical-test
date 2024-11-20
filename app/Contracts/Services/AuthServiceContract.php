<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\Auth\LoginRequestDTO;
use App\DTO\Auth\LoginResponseDTO;
use App\DTO\Auth\RegisterRequestDTO;
use App\DTO\Auth\RegisterResponseDTO;

interface AuthServiceContract
{
    public function login(LoginRequestDTO $dto): LoginResponseDTO;

    public function register(RegisterRequestDTO $dto): RegisterResponseDTO;

    public function logout(): void;
}
