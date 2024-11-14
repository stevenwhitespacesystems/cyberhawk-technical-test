<?php

declare(strict_types=1);

namespace App\Contracts\Services\Auth;

use App\DTO\RegisterDTO;
use App\Models\User;

interface RegisterServiceContract
{
    public function register(RegisterDTO $dto): User;
}
