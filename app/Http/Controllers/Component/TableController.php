<?php

declare(strict_types=1);

namespace App\Http\Controllers\Component;

use App\Contracts\Services\ComponentServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\Table\TableRequest;
use App\Http\Responses\ApiResponses;

class TableController extends Controller
{
    public function __invoke(
        TableRequest $request,
        ComponentServiceContract $componentService
    ) {
        $tableData = $componentService->getTableData($request);

        return ApiResponses::success(['table_data' => $tableData]);
    }
}
