<?php

declare(strict_types=1);

namespace App\Base;

use App\Contracts\Base\Factory as FactoryInterface;
use App\Contracts\Base\Model as ModelInterface;

/**
 * @template T of ModelInterface
 */
class Factory implements FactoryInterface
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

    /**
     * Subclasses can extend this method but should not change the signature
     * Additional methods added in subclasses to should call this method
     * to obtain their instance to populate
     *
     * @return T
     */
    public function create()
    {
        $className = $this->modelClass;
        return new $className();
    }
}
