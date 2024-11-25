<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ComponentType;
use App\Enums\InspectionStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Component extends Model
{
    use HasFactory;
    use HasUlids;

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'type' => ComponentType::class,
        'status' => InspectionStatus::class,
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }
}
