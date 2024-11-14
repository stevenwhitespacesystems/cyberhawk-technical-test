<?php

declare(strict_types=1);

namespace App\Contracts\Services\Auth;

use App\DTO\RegisterRequestDTO;
use App\DTO\RegisterResponseDTO;

interface RegisterServiceContract
{
    public function register(RegisterRequestDTO $dto): RegisterResponseDTO;
}
