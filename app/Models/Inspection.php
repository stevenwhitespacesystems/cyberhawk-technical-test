<?php

declare(strict_types=1);

namespace App\Models;

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
 * @property int                $reference
 * @property ?Carbon            $scheduled_date
 * @property ?Carbon            $completed_date
 * @property ?float             $grade
 */
class Inspection extends Model
{
    use HasFactory;
    use HasUlids;

    protected $casts = [
        'reference' => 'integer',
        'scheduled_date' => 'date',
        'completed_date' => 'date',
        'grade' => 'float',
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
