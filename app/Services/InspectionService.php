<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\InspectionServiceContract;
use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;
use App\Repositories\InspectionRepository;
use Illuminate\Cache\Repository as CacheRepository;

final class InspectionService implements InspectionServiceContract
{
    public function __construct(
        private readonly InspectionRepository $inspectionRepository,
        private readonly CacheRepository $cache
    ) {
    }

    final public function getTableData(TableRequest $request): TableDataDTO
    {
        $tableService = new TableService($this->inspectionRepository, $this->cache);
        return $tableService->getData($request);
    }
}
