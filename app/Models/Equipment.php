<?php

declare(strict_types=1);

namespace App\Models;

use App\DTO\GeoJSON\EquipmentPropertiesDTO;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeometryDTO;
use App\Enums\EquipmentType;
use App\Enums\InspectionStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $nickname
 * @property string $serial_number
 * @property InspectionStatus $status
 * @property EquipmentType $type
 * @property float $longitude
 * @property float $latitude
 */
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

    final protected function feature(): Attribute
    {
        return Attribute::make(
            get: static function (mixed $value, array $attributes): FeatureDTO {
                return new FeatureDTO(
                    properties: new EquipmentPropertiesDTO(
                        $attributes['id'],
                        $attributes['nickname'],
                        $attributes['serial_number'],
                        InspectionStatus::from($attributes['status']),
                        EquipmentType::from($attributes['type'])
                    ),
                    geometry: new GeometryDTO(
                        type: 'Point',
                        coordinates: [
                            (float) $attributes['longitude'],
                            (float) $attributes['latitude'],
                        ]
                    )
                );
            }
        );
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    public function components(): HasMany
    {
        return $this->hasMany(Component::class);
    }
}
