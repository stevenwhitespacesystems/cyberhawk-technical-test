<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\SiteServiceContract;
use App\DTO\Site\AllGeoJsonDataResponseDTO;
use App\Models\Site;
use App\Repositories\SiteRepository;
use Illuminate\Support\Collection;

final class SiteService implements SiteServiceContract
{
    public function __construct(
        private readonly SiteRepository $siteRepository,
    ) {
    }

    final public function allGeoJsonDataOnly(): AllGeoJsonDataResponseDTO
    {
        /** @var Collection<Site> $sites */
        $sites = $this->siteRepository->findBy([], ['id', 'longitude', 'latitude']);

        $geoJsonData = $sites->map(static function (Site $site) {
            return $site->makeHidden(['id', 'longitude', 'latitude'])->append('geo_json');
        })
            ->pluck('geo_json');

        return new AllGeoJsonDataResponseDTO($geoJsonData);
    }
}
