<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Base\Repository;
use App\Models\Inspection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class InspectionRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(Inspection::class);
    }

    final public function findAvgGradeWithInspectedComponentsGrade(string $id): Inspection
    {
        /** @var Inspection */
        return $this->createQueryBuilder()
            ->with('inspectedComponents', static function (HasMany $query) {
                $query->select('id', 'grade', 'inspection_id');
            })
            ->findOrFail($id, ['id', 'grade']);
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
            ->with('inspectedComponents', static function (HasMany $query) {
                $query->select(
                    'id',
                    'completed_date',
                    'component_id',
                    'grade',
                    'inspection_id',
                    'scheduled_date',
                    'user_id',
                )
                ->with('component', static function (BelongsTo $query) {
                    $query->select(
                        'id',
                        'serial_number',
                        'type',
                    );
                })
                ->with('user', static function (BelongsTo $query) {
                    $query->select(
                        'id',
                        'name',
                    );
                });
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
