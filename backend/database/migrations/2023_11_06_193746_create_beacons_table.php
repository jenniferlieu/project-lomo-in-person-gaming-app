<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('beacons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('host_id')->references('id')->on('users')->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->text('title');
            $table->text('game_title');
            $table->text('game_system');
            $table->text('description')->nullable();
            $table->timestamp('start_date_time');
            $table->timestamp('end_date_time');
            $table->text('address');
            $table->magellanGeography('coordinates');
            $table->integer('num_players')->nullable();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beacons');
    }
};
