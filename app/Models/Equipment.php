<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\EquipmentType;
use App\Enums\InspectionStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Equipment extends Model
{
    use HasFactory;
    use HasUlids;

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'type' => EquipmentType::class,
        'status' => InspectionStatus::class,
    ];

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
}
