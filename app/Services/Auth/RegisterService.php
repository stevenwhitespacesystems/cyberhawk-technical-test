<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Contracts\Services\Auth\RegisterServiceContract;
use App\DTO\RegisterRequestDTO;
use App\DTO\RegisterResponseDTO;
use App\Factories\UserFactory;
use App\Models\User;

final class RegisterService implements RegisterServiceContract
{
    public function __construct(
        private readonly UserFactory $userFactory
    ) {
    }

    public function register(RegisterRequestDTO $requestDto): RegisterResponseDTO
    {
        /** @var User $user */
        $user = $this->userFactory->register($requestDto);
        $token = $user->createToken('app-token')->plainTextToken;

        return new RegisterResponseDTO($user, $token);
    }
}
