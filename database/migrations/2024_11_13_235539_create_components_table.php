<?php

use App\Models\Equipment;
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
        Schema::create('components', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignIdFor(Equipment::class)
                ->constrained()
                ->cascadeOnDelete();
            $table->string('serial_number');
            $table->string('nickname')->nullable();
            $table->string('type');
            $table->string('status');
            $table->string('specifications')->nullable();
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
        Schema::dropIfExists('components');
    }
};
