<?php

declare(strict_types=1);

namespace App\Services;

use App\Base\Repository;
use App\Contracts\Services\TableServiceContract;
use App\DTO\Table\TableDataDTO;
use App\DTO\Table\TableMetaDTO;
use App\Http\Requests\Table\TableRequest;
use App\Models\Site;
use Illuminate\Cache\Repository as CacheRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;

// TODO: Filter over relationships
final class TableService implements TableServiceContract
{
    public function __construct(
        private readonly Repository $repository,
        private readonly CacheRepository $cache
    ) {
    }

    final public function getData(TableRequest $request): TableDataDTO
    {
        $pageSize = (int) $request->get('pageSize', 10);
        $columns = $request->get('columns', []);
        
        $query = $this->repository->createQueryBuilder();
        
        $relationFields = $this->getRequiredRelationFields($columns);
        foreach ($relationFields as $relation => $fields) {
            $query->with([$relation => function ($query) use ($fields) {
                $query->select(['id', ...$fields]);
            }]);
        }
        
        $requiredForeignKeys = $this->getRequiredForeignKeys(array_keys($relationFields));
        $baseFields = $this->getBaseFields($columns);
        $fieldsToSelect = array_unique([
            'id',
            ...$baseFields,
            ...$requiredForeignKeys
        ]);
        
        $query->select($fieldsToSelect);

        if ($request->has('sort')) {
            $sortParams = json_decode($request->get('sort'), true) ?? [];
            $query = $this->applySorting($query, $sortParams);
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
            ->get();

        $tableMeta = new TableMetaDTO($page, $pageSize, $total, (int) ceil($total / $pageSize));

        return new TableDataDTO($result->toArray(), $tableMeta);
    }
    
    private function getBaseFields(array $columns): array
    {
        return array_filter($columns, fn ($column) => !str_contains($column, '.'));
    }
    private function getRequiredRelationFields(array $columns): array
    {
        $relationFields = [];
        
        foreach ($columns as $column) {
            if (str_contains($column, '.')) {
                [$relation, $field] = explode('.', $column);
                if (!isset($relationFields[$relation])) {
                    $relationFields[$relation] = [];
                }
                $relationFields[$relation][] = $field;
            }
        }

        return $relationFields;
    }

    private function getRequiredForeignKeys(array $relations): array
    {
        $modelName = $this->repository->getModelClass();
        /** @var Model $model */
        $model = new $modelName();
        $foreignKeys = [];
        
        $reflection = new ReflectionClass($model);
        
        foreach ($relations as $relation) {
            if ($reflection->hasMethod($relation)) {
                $method = $reflection->getMethod($relation);
                
                $foreignKey = $this->getForeignKeyFromRelation($model, $method, $relation);
                
                if ($foreignKey) {
                    $foreignKeys[] = $foreignKey;
                }
            }
        }
        
        return $foreignKeys;
    }

    private function getForeignKeyFromRelation(Model $model, ReflectionMethod $method, string $relationName): ?string
    {
        $cacheKey = get_class($model) . '.' . $relationName;
        if ($this->cache->has($cacheKey)) {
            return $this->cache->get($cacheKey);
        }

        $relation = $method->invoke($model);
        
        if ($relation instanceof BelongsTo) {
            $foreignKey = $relation->getForeignKeyName();
            $this->cache->set($cacheKey, $foreignKey);
            return $foreignKey;
        }
        
        // Add support for other relationship types as needed
        // HasOne, HasMany would use different methods to get the foreign key

        return null;
    }

    private function applySorting(Builder $query, array $sorting): Builder
    {
        foreach ($sorting as $sort) {
            $field = $sort['id'];
            $desc = $sort['desc'] ?? false;
            $direction = $desc ? 'desc' : 'asc';

            if (str_contains($field, '.')) {
                [$relation, $column] = explode('.', $field);
                
                // Join the related table if not already joined
                $relationTable = Str::plural(Str::snake($relation));
                $baseTable = $query->getModel()->getTable();
                
                $query->leftJoin(
                    $relationTable,
                    "{$baseTable}.{$relation}_id",
                    '=',
                    "{$relationTable}.id"
                )
                ->orderBy("{$relationTable}.{$column}", $direction)
                ->select("{$baseTable}.*"); // Avoid duplicate columns
            } else {
                $query->orderBy($field, $direction);
            }
        }

        return $query;
    }
}
