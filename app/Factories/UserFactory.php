<?php

declare(strict_types=1);

namespace App\Factories;

use App\Base\Factory;
use App\DTO\Auth\RegisterRequestDTO;
use App\Models\User;

/**
 * @extends Factory<User>
 */
final class UserFactory extends Factory
{
    public function __construct()
    {
        parent::__construct(User::class);
    }

    public function register(RegisterRequestDTO $requestDto): User
    {
        /** @var User $user */
        $user = $this->create();
        $user->name = $requestDto->name;
        $user->email = $requestDto->email;
        $user->password = $requestDto->password;
        $user->save();

        return $user;
    }
}
