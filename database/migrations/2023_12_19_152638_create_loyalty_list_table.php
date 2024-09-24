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
        Schema::create('temp_loyalty_list', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('tier')->nullable();
            $table->tinyInteger('id_shop')->nullable();
            $table->integer('year')->nullable();
            $table->string('email')->nullable();
            $table->json('content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temp_loyalty_list');
    }
};
