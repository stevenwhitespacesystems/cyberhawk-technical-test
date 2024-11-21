<?php

declare(strict_types=1);

namespace App\Http\Controllers\Site;

use App\Contracts\Services\SiteServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;

class AllGeoJsonDataController extends Controller
{
    public function __invoke(SiteServiceContract $siteService): JsonResponse
    {
        $geoJsonData = $siteService->allGeoJsonDataOnly();
        
        return ApiResponses::success(['geo_json' => $geoJsonData]);
    }
}
