<?php

declare(strict_types=1);

namespace App\Http\Controllers\Inspection;

use App\Contracts\Services\InspectionServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\Inspection\ViewRequest;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;

class ViewController extends Controller
{
    public function __invoke(
        ViewRequest $request,
        InspectionServiceContract $inspectionService
    ): JsonResponse {
        $payload = $request->validated();
        $id = $payload[ViewRequest::ID];
        $inspection = $inspectionService->viewInspection($id);

        return ApiResponses::success(['inspection' => $inspection]);
    }
}
