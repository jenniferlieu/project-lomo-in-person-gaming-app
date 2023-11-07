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
        Schema::create('profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->references('id')->on('users')->contrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->text('about_me');
            $table->text('preferred_games'); // array of text
            $table->text('preference_tags');  // array of text
            $table->timestampsTz();
        });

        // convert columns to array of text
        DB::statement('ALTER TABLE profiles ALTER COLUMN preferred_games TYPE text[] USING ARRAY[preferred_games]');
        DB::statement('ALTER TABLE profiles ALTER COLUMN preference_tags TYPE text[] USING ARRAY[preference_tags]');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
