<?php

declare(strict_types=1);

namespace App\Contracts\Services;

interface InspectedComponentServiceContract
{
    public function updateGrade(string $id, int $grade): void;
}
