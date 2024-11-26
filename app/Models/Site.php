<?php

declare(strict_types=1);

namespace App\Models;

use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeometryDTO;
use App\DTO\GeoJSON\SitePropertiesDTO;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $name
 * @property float $latitude
 * @property float $longitude
 */
class Site extends Model
{
    use HasFactory;
    use HasUlids;

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function equipment(): HasMany
    {
        return $this->hasMany(Equipment::class);
    }

    public function components(): HasMany
    {
        return $this->hasMany(Component::class);
    }

    public function inspections(): HasMany
    {
        return $this->hasMany(Inspection::class);
    }

    final protected function feature(): Attribute
    {
        return Attribute::make(
            get: static function (mixed $value, array $attributes): FeatureDTO {
                return new FeatureDTO(
                    properties: new SitePropertiesDTO($attributes['id'], $attributes['name']),
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

    final public function addressComma(): Attribute
    {
        return Attribute::make(
            get: static function (mixed $value, array $attributes): string {
                return implode(', ', array_filter([
                    $attributes['address_line_1'],
                    $attributes['address_line_2'],
                    $attributes['city'],
                    $attributes['state'],
                    $attributes['postal_code'],
                    $attributes['country'],
                ]));
            }
        );
    }
}
