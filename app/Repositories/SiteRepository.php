<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Base\Repository;
use App\Models\Site;

final class SiteRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(Site::class);
    }
}
