<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Base\Repository;
use App\Models\InspectedComponent;

final class InspectedComponentRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(InspectedComponent::class);
    }
}
