<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\InspectedComponentServiceContract;
use App\Contracts\Services\InspectionServiceContract;
use App\Models\InspectedComponent;
use App\Repositories\InspectedComponentRepository;

final class InspectedComponentService implements InspectedComponentServiceContract
{
    public function __construct(
        private readonly InspectionServiceContract $inspectionService,
        private readonly InspectedComponentRepository $inspectedComponentRepository
    ) {
    }

    final public function updateGrade(string $id, int $grade): void
    {
        /** @var InspectedComponent $inspectedComponent */
        $inspectedComponent = $this->inspectedComponentRepository->find($id, ['id', 'grade', 'inspection_id']);
        $inspectedComponent->grade = $grade;
        $inspectedComponent->save();

        $this->inspectionService->evaluateAverageGrade($inspectedComponent->inspection_id);
    }
}
