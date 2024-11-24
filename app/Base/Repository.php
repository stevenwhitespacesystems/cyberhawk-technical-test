<?php

declare(strict_types=1);

namespace App\Base;

use App\Contracts\Base\Repository as RepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @template T of Model
 */
class Repository implements RepositoryInterface
{
    /**
     * @var class-string<T>|string
     */
    protected string $modelClass;

    /**
     * @param class-string<T>|string $modelClass
     */
    public function __construct(string $modelClass)
    {
        $this->modelClass = $modelClass;
    }

    public function getModelClass(): string
    {
        return $this->modelClass;
    }

    public function createQueryBuilder(): Builder
    {
        return forward_static_call([$this->modelClass, 'query']);
    }

    /**
     * @return T
     */
    public function find(string $id, iterable $columns = ['*'])
    {
        return forward_static_call([$this->modelClass, 'findOrFail'], (string) $id, $columns);
    }

    /**
     * @return Collection<T>
     */
    public function findBy(iterable $attributes = [], iterable $columns = ['*']): Collection
    {
        if (empty($attributes)) {
            return forward_static_call([$this->modelClass, 'all'], $columns);
        }

        /** @var Collection<T> */
        return $this->createQueryBuilder()->where($attributes)->get($columns);
    }

    /**
     * @return T
     */
    public function findOneBy(iterable $attributes = [], iterable $columns = ['*'])
    {
        /** @var T */
        return $this->createQueryBuilder()->where($attributes)->firstOrFail($columns);
    }

    /**
     * @return T|null
     */
    public function findOneOrNullBy(iterable $attributes = [], iterable $columns = ['*'])
    {
        /** @var T|null */
        return $this->createQueryBuilder()->where($attributes)->first($columns);
    }

    public function raw(callable $closure): Collection
    {
        return forward_static_call([$this->modelClass, 'raw'], $closure);
    }

    public function aggregate(array $pipeline): Collection
    {
        return $this->raw(static function ($collection) use ($pipeline) {
            return $collection->aggregate($pipeline);
        });
    }
}
