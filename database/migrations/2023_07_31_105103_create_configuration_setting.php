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
        Schema::create('configuration_setting', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('label');
            $table->boolean('active');
            $table->integer('position');
            $table->text('option')->nullable();
            $table->string('value_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configuration_setting');
    }
};
