<?php

use App\Models\Component;
use App\Models\Inspection;
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
        Schema::create('inspected_components', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignIdFor(Inspection::class);
            $table->foreignIdFor(Component::class);
            $table->foreignIdFor(User::class)->nullable();
            $table->date('scheduled_date')->nullable();
            $table->date('completed_date')->nullable();
            $table->unsignedTinyInteger('grade')->nullable();
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
        Schema::dropIfExists('inspected_components');
    }
};
