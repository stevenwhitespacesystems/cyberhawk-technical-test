<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;

interface ComponentServiceContract
{
    public function getTableData(TableRequest $request): TableDataDTO;
}
