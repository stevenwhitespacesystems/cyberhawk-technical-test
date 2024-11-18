<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\AuthServiceContract;
use App\DTO\LoginRequestDTO;
use App\DTO\LoginResponseDTO;
use App\DTO\RegisterRequestDTO;
use App\DTO\RegisterResponseDTO;
use App\Exceptions\BadUserCredentialsException;
use App\Factories\UserFactory;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Contracts\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;

final class AuthService implements AuthServiceContract
{
    public function __construct(
        private readonly UserFactory $userFactory,
        private readonly UserRepository $userRepository,
        private readonly Guard $auth
    ) {
    }

    /**
     * @throws BadUserCredentialsException
     */
    public function login(LoginRequestDTO $dto): LoginResponseDTO
    {
        $user = $this->userRepository->findOneByEmail($dto->email);
        if (!Hash::check($dto->password, $user->password)) {
            throw new BadUserCredentialsException();
        }

        $token = $this->generateToken($user);

        return new LoginResponseDTO($user, $token);
    }

    public function register(RegisterRequestDTO $dto): RegisterResponseDTO
    {
        /** @var User $user */
        $user = $this->userFactory->register($dto);
        $token = $this->generateToken($user);

        return new RegisterResponseDTO($user, $token);
    }

    public function logout(): void
    {
        /** @var User|HasApiTokens $user */
        $user = $this->auth->user();
        /** @var PersonalAccessToken $accessToken */
        $accessToken = $user->currentAccessToken();
        $accessToken->delete();
    }

    private function generateToken(User $user): string
    {
        return $user->createToken('app-token')->plainTextToken;
    }
}
