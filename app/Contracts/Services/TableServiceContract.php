<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;

interface TableServiceContract
{
    public function getData(TableRequest $request): TableDataDTO;
}
