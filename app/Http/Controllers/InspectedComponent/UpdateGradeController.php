<?php

declare(strict_types=1);

namespace App\Http\Controllers\InspectedComponent;

use App\Contracts\Services\InspectedComponentServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\InspectedComponent\UpdateGradeRequest;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;

class UpdateGradeController extends Controller
{
    public function __invoke(
        UpdateGradeRequest $request,
        InspectedComponentServiceContract $inspectedComponentService
    ): JsonResponse {
        $payload = $request->validated();
        $id = $payload[UpdateGradeRequest::ID];
        $grade = (int) $payload[UpdateGradeRequest::GRADE];

        $inspectedComponentService->updateGrade($id, $grade);

        return ApiResponses::success();
    }
}
