<?php

declare(strict_types=1);

namespace App\DTO\TableData;

use Illuminate\Database\Eloquent\Model;

/**
 * @template T of Model
 */
final class TableDataDTO
{
    /**
     * @param array<int, T> $data
     */
    public function __construct(
        public readonly array $data,
        public readonly TableMetaDTO $meta
    ) {
    }
}
