<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\Site\AllGeoJsonDataResponseDTO;

interface SiteServiceContract
{
    public function allGeoJsonDataOnly(): AllGeoJsonDataResponseDTO;
}
