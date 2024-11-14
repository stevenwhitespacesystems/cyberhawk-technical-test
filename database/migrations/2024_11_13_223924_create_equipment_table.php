<?php

use App\Models\Location;
use App\Models\Site;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::create('equipment', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignIdFor(Site::class)
                ->constrained()
                ->cascadeOnDelete();
            $table->string('type');
            $table->string('serial_number')->nullable();
            $table->string('nickname')->nullable();
            $table->date('installation_date')->nullable();
            $table->string('status');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->softDeletesTz();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipment');
    }
};
