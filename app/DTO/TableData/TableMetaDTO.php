<?php

declare(strict_types=1);

namespace App\DTO\TableData;

final class TableMetaDTO
{
    public function __construct(
        public readonly int $page,
        public readonly int $pageSize,
        public readonly int $total,
        public readonly int $pageCount
    ) {
    }
}
