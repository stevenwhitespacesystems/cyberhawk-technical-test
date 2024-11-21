<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\SiteServiceContract;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeoJsonDTO;
use App\Models\Site;
use App\Repositories\SiteRepository;
use Illuminate\Http\Request;
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
        $sites = $this->siteRepository->findBy([], ['id', 'name', 'longitude', 'latitude']);

        /** @var Collection<FeatureDTO> $features */
        $features = $sites->map(static function (Site $site) {
            return $site->makeHidden(['id', 'name', 'longitude', 'latitude'])->append('feature');
        })
            ->pluck('feature');

        return new GeoJsonDTO($features);
    }

    // TODO: Start work on method that will search the sites table
    // /**
    //  * @return Collection<Site>
    //  */
    // final public function tableData(Request $request): Collection
    // {
    //     $query = $this->siteRepository->createQueryBuilder();
    // }
}
