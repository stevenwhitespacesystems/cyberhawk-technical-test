<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Base\Repository;
use App\Models\Inspection;

final class InspectionRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(Inspection::class);
    }
}
