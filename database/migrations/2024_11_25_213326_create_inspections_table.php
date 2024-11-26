<?php

use App\Models\Equipment;
use App\Models\Site;
use App\Models\User;
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
        Schema::create('inspections', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignIdFor(Site::class)->constrained();
            $table->foreignIdFor(Equipment::class)->constrained();
            $table->date('scheduled_date')->nullable();
            $table->date('completed_date')->nullable();
            $table->unsignedDecimal('grade', 4, 1)->nullable();
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
        Schema::dropIfExists('inspections');
    }
};
