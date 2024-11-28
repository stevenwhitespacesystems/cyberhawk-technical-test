<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string             $id
 * @property string             $inspection_id
 * @property Inspection         $inspection
 * @property string             $component_id
 * @property Component          $component
 * @property ?string            $user_id
 * @property ?User              $user
 * @property ?Carbon            $scheduled_date
 * @property ?Carbon            $completed_date
 * @property ?int               $grade
 */
class InspectedComponent extends Model
{
    use HasFactory;
    use HasUlids;

    protected $casts = [
        'scheduled_date' => 'date',
        'completed_date' => 'date',
        'grade' => 'integer',
    ];

    public function component(): BelongsTo
    {
        return $this->belongsTo(Component::class);
    }

    public function inspection(): BelongsTo
    {
        return $this->belongsTo(Inspection::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
