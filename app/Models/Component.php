<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ComponentType;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string             $id
 * @property string             $site_id
 * @property Site               $site
 * @property string             $equipment_id
 * @property Equipment          $equipment
 * @property string             $serial_number
 * @property ComponentType      $type
 * @property ?string             $specifications
 */
class Component extends Model
{
    use HasFactory;
    use HasUlids;

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'type' => ComponentType::class,
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    public function inspectedComponents(): HasMany
    {
        return $this->hasMany(InspectedComponent::class);
    }
}
