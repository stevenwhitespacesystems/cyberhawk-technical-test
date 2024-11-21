<?php

declare(strict_types=1);

namespace App\Http\Controllers\Equipment;

use App\Contracts\Services\EquipmentServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;

class AllGeoJsonDataController extends Controller
{
    public function __invoke(EquipmentServiceContract $equipmentService): JsonResponse
    {
        $geoJsonData = $equipmentService->allGeoJsonDataOnly();
        
        return ApiResponses::success(['geo_json' => $geoJsonData]);
    }
}
