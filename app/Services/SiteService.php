<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\SiteServiceContract;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeoJsonDTO;
use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;
use App\Models\Site;
use App\Repositories\SiteRepository;
use Illuminate\Cache\Repository as CacheRepository;
use Illuminate\Support\Collection;

final class SiteService implements SiteServiceContract
{
    public function __construct(
        private readonly SiteRepository $siteRepository,
        private readonly CacheRepository $cache
    ) {
    }

    final public function allGeoJsonDataOnly(): GeoJsonDTO
    {
        /** @var Collection<Site> $sites */
        $sites = $this->siteRepository->findBy([], ['id', 'name', 'longitude', 'latitude']);

        /** @var Collection<FeatureDTO> $features */
        $features = $sites->map(static function (Site $site) {
            return $site->makeHidden(['id', 'name', 'longitude', 'latitude'])->append('feature');
        })
            ->pluck('feature');

        return new GeoJsonDTO($features);
    }

    final public function getTableData(TableRequest $request): TableDataDTO
    {
        $tableService = new TableService($this->siteRepository, $this->cache);
        return $tableService->getData($request);
    }
}
