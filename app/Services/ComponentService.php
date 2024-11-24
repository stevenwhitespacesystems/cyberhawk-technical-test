<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\ComponentServiceContract;
use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;
use App\Repositories\ComponentRepository;
use Illuminate\Cache\Repository as CacheRepository;

final class ComponentService implements ComponentServiceContract
{
    public function __construct(
        private readonly ComponentRepository $componentRepository,
        private readonly CacheRepository $cache
    ) {
    }

    final public function getTableData(TableRequest $request): TableDataDTO
    {
        $tableService = new TableService($this->componentRepository, $this->cache);
        return $tableService->getData($request);
    }
}
