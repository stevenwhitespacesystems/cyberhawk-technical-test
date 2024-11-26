<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Base\Repository;
use App\Models\Inspection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class InspectionRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(Inspection::class);
    }

    final public function viewInspection(string $id): Inspection
    {
        /** @var Inspection */
        return $this->createQueryBuilder()
            ->with('site', static function (BelongsTo $query): void {
                $query->select([
                    'id',
                    'name',
                    'short_identifier',
                    'address_line_1',
                    'address_line_2',
                    'city',
                    'state',
                    'postal_code',
                    'country',
                    'latitude',
                    'longitude',
                ]);
            })
            ->with('equipment', static function (BelongsTo $query): void {
                $query->select([
                    'id',
                    'type',
                    'serial_number',
                    'nickname',
                    'installation_date',
                    'latitude',
                    'longitude',
                ]);
            })
            ->findOrFail($id, [
                'id',
                'site_id',
                'equipment_id',
                'reference',
                'scheduled_date',
                'completed_date',
                'grade',
            ]);
    }
}
