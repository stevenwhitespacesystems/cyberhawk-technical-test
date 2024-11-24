<?php

declare(strict_types=1);

namespace App\Http\Controllers\Equipment;

use App\Contracts\Services\EquipmentServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\Table\TableRequest;
use App\Http\Responses\ApiResponses;

class TableController extends Controller
{
    public function __invoke(
        TableRequest $request,
        EquipmentServiceContract $equipmentService
    ) {
        $tableData = $equipmentService->getTableData($request);

        return ApiResponses::success(['table_data' => $tableData]);
    }
}
