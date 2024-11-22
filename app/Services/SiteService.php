<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\SiteServiceContract;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeoJsonDTO;
use App\DTO\TableData\TableDataDTO;
use App\DTO\TableData\TableMetaDTO;
use App\Http\Requests\Site\TableRequest;
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
        $sites = $this->siteRepository->findBy([], ['id', 'name', 'longitude', 'latitude']);

        /** @var Collection<FeatureDTO> $features */
        $features = $sites->map(static function (Site $site) {
            return $site->makeHidden(['id', 'name', 'longitude', 'latitude'])->append('feature');
        })
            ->pluck('feature');

        return new GeoJsonDTO($features);
    }

    final public function tableData(TableRequest $request): TableDataDTO
    {
        $page = $request->get('page', 1);
        $pageSize = $request->get('pageSize', 10);

        $query = $this->siteRepository->createQueryBuilder();

        if ($request->has('sort')) {
            $sortParams = json_decode($request->get('sort'), true) ?? [];
            foreach ($sortParams as $sortParam) {
                $direction = $sortParam['direction'] ?? 'asc';
                $query->orderBy($sortParam['id'], $direction);
            }
        }

        if ($request->has('filters')) {
            $filterParams = json_decode($request->get('filters'), true) ?? [];
            foreach ($filterParams as $filterParam) {
                $id = $filterParam['id'];
                $value = $filterParam['value'];

                switch ($filterParam['type'] ?? 'text') {
                    case 'text':
                        $query->where($id, 'like', "%{$value}%");
                        break;
                    case 'number':
                        $query->where($id, '=', $value);
                        break;
                    case 'select':
                        $query->whereIn($id, (array) $value);
                        break;
                    case 'range':
                        if (isset($value['min'])) {
                            $query->where($id, '>=', $value['min']);
                        }
                        if (isset($value['max'])) {
                            $query->where($id, '<=', $value['max']);
                        }
                        break;

                    case 'date':
                        if (isset($value['from'])) {
                            $query->whereDate($id, '>=', $value['from']);
                        }
                        if (isset($value['to'])) {
                            $query->whereDate($id, '<=', $value['to']);
                        }
                        break;
                }
            }
        }

        $total = $query->count();
        /** @var Collection<Site> $result */
        $result = $query
            ->skip(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get($request->get('columns'));

        $tableMeta = new TableMetaDTO($page, $pageSize, $total, (int) ceil($total / $pageSize));

        return new TableDataDTO($result->toArray(), $tableMeta);
    }
}
