<?php

declare(strict_types=1);

namespace App\Http\Controllers\Site;

use App\Contracts\Services\SiteServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\Table\TableRequest;
use App\Http\Responses\ApiResponses;

class TableController extends Controller
{
    public function __invoke(
        TableRequest $request,
        SiteServiceContract $siteService
    ) {
        $tableData = $siteService->tableData($request);

        return ApiResponses::success(['table_data' => $tableData]);
    }
}
