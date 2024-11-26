<?php

declare(strict_types=1);

namespace App\Contracts\Base;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

/**
 * All methods should findOrFail() by default.
 * @template T of Model
 */
interface Repository
{
    public function getModelClass(): string;
    
    public function createQueryBuilder(): Builder;

    /**
     * Finds a single BaseModel by ID
     * @param  string $id Document id as string
     * @return T
     * @throws ModelNotFoundException This method may throw a ModelNotFoundException if no model was found.
     */
    public function find(string $id);

    /**
     * @return Collection<T>
     */
    public function findBy(iterable $attributes, iterable $columns = ['*']): Collection;

    /**
     * @return T
     */
    public function findOneBy(iterable $attributes, iterable $columns = ['*']);

    /**
     * @return T|null
     */
    public function findOneOrNullBy(iterable $attributes = [], iterable $columns = ['*']);
}
