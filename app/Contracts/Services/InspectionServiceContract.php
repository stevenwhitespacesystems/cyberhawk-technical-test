<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;
use App\Models\Inspection;

interface InspectionServiceContract
{
    public function getTableData(TableRequest $request): TableDataDTO;

    public function viewInspection(string $inspectionId): Inspection;
}
