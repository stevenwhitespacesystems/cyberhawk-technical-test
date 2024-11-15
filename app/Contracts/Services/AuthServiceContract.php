<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\RegisterRequestDTO;
use App\DTO\RegisterResponseDTO;

interface AuthServiceContract
{
    public function register(RegisterRequestDTO $dto): RegisterResponseDTO;
}
