<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\InspectionServiceContract;
use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;
use App\Models\Inspection;
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

    final public function viewInspection(string $inspectionId): Inspection
    {
        $inspection = $this->inspectionRepository->viewInspection($inspectionId);
        $inspection->site
            ->append('address_comma')
            ->makeHidden([
                'address_line_1',
                'address_line_2',
                'city',
                'state',
                'postal_code',
                'country',
            ]);

        return $inspection;
    }

    final public function evaluateAverageGrade(string $inspectionId): void
    {
        $inspection = $this->inspectionRepository->findAvgGradeWithInspectedComponentsGrade($inspectionId);
        $averageGrade = $inspection->inspectedComponents->avg('grade');
        $inspection->grade = $averageGrade;
        $inspection->save();
    }
}
