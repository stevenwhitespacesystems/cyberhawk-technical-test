<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\SiteServiceContract;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeoJsonDTO;
use App\Models\Site;
use App\Repositories\SiteRepository;
use Illuminate\Support\Collection;

final class SiteService implements SiteServiceContract
{
    public function __construct(
        private readonly SiteRepository $siteRepository,
    ) {
    }

    final public function allGeoJsonDataOnly(): GeoJsonDTO
    {
        /** @var Collection<Site> $sites */
        $sites = $this->siteRepository->findBy([], ['id', 'longitude', 'latitude']);

        /** @var Collection<FeatureDTO> $features */
        $features = $sites->map(static function (Site $site) {
            return $site->makeHidden(['id', 'longitude', 'latitude'])->append('feature');
        })
            ->pluck('feature');

        return new GeoJsonDTO($features);
    }
}
