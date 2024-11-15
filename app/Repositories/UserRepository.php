<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Base\Repository;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

final class UserRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(User::class);
    }

    /**
     * @throws ModelNotFoundException
     */
    public function findOneByEmail(string $email): User
    {
        /** @var User */
        return $this->findOneBy(['email' => $email]);
    }
}
