<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\EquipmentType;
use App\Enums\InspectionStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    public function components(): HasMany
    {
        return $this->hasMany(Component::class);
    }
}
