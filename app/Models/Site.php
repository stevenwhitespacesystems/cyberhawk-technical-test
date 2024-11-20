<?php

declare(strict_types=1);

namespace App\Models;

use App\DTO\GeoJSON\GeoJsonDTO;
use App\DTO\GeoJSON\GeometryDTO;
use App\DTO\GeoJSON\PropertiesDTO;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Site extends Model
{
    use HasFactory;
    use HasUlids;

    public function equipment(): HasMany
    {
        return $this->hasMany(Equipment::class);
    }

    final protected function geoJson(): Attribute
    {
        return Attribute::make(
            get: static function (mixed $value, array $attributes): GeoJsonDTO {
                return new GeoJsonDTO(
                    type: 'Feature',
                    properties: new PropertiesDTO($attributes['id']),
                    geometry: new GeometryDTO(
                        type: 'Point',
                        coordinates: [
                            (float) $attributes['longitude'],
                            (float) $attributes['latitude'],
                        ],
                    ),
                );
            }
        );
    }
}
