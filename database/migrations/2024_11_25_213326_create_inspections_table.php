<?php

use App\Models\Equipment;
use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inspections', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignIdFor(Site::class)->constrained();
            $table->foreignIdFor(Equipment::class)->constrained();
            $table->unsignedInteger('reference')->unique();
            $table->date('scheduled_date')->nullable();
            $table->date('completed_date')->nullable();
            $table->unsignedDecimal('grade', 4, 1)->nullable();
            $table->softDeletesTz();
            $table->timestampsTz();
        });

        DB::statement('ALTER TABLE inspections MODIFY reference INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT');
        DB::statement('ALTER TABLE inspections AUTO_INCREMENT = 10000');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inspections');
    }
};
