<?php

declare(strict_types=1);

namespace App\Contracts\Base;

use App\Contracts\Base\Model as ModelInterface;

/**
 * @template T of ModelInterface
 */
interface Factory
{
    /**
     * @return T
     */
    public function create();
}
