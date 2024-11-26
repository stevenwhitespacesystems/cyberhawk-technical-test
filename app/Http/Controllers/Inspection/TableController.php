<?php

declare(strict_types=1);

namespace App\Http\Controllers\Inspection;

use App\Contracts\Services\InspectionServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\Table\TableRequest;
use App\Http\Responses\ApiResponses;

class TableController extends Controller
{
    public function __invoke(
        TableRequest $request,
        InspectionServiceContract $inspectionService
    ) {
        $tableData = $inspectionService->getTableData($request);

        return ApiResponses::success(['table_data' => $tableData]);
    }
}
