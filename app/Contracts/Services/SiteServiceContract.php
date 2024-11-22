<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\GeoJSON\GeoJsonDTO;
use App\DTO\TableData\TableDataDTO;
use App\Http\Requests\Site\TableRequest;

interface SiteServiceContract
{
    public function allGeoJsonDataOnly(): GeoJsonDTO;

    public function tableData(TableRequest $request): TableDataDTO;
}
