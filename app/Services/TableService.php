<?php

declare(strict_types=1);

namespace App\Services;

use App\Base\Repository;
use App\Contracts\Services\TableServiceContract;
use App\DTO\Table\TableDataDTO;
use App\DTO\Table\TableMetaDTO;
use App\Http\Requests\Table\TableRequest;
use App\Models\Site;
use Illuminate\Support\Collection;

final class TableService implements TableServiceContract
{
    public function __construct(
        private readonly Repository $repository,
    ) {
    }

    final public function getData(TableRequest $request): TableDataDTO
    {
        $pageSize = (int) $request->get('pageSize', 10);
        $columns = array_merge(['id'], $request->get('columns', []));
        
        $query = $this->repository->createQueryBuilder();
        
        if ($request->has('sort')) {
            $sortParams = json_decode($request->get('sort'), true) ?? [];
            foreach ($sortParams as $sortParam) {
                $desc = $sortParam['desc'] ?? false;
                $direction = $desc ? 'desc' : 'asc';
                $query->orderBy($sortParam['id'], $direction);
            }
        }
        
        $hasFilters = false;
        if ($request->has('filters')) {
            $filterParams = json_decode($request->get('filters'), true) ?? [];

            if (!empty($filterParams)) {
                $hasFilters = true;
            }

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
                            
        $page = $hasFilters ? 1 : (int) $request->get('page', 1);
        $total = $query->count();

        /** @var Collection<Site> $result */
        $result = $query
            ->skip(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get($columns);

        $tableMeta = new TableMetaDTO($page, $pageSize, $total, (int) ceil($total / $pageSize));

        return new TableDataDTO($result->toArray(), $tableMeta);
    }
}
