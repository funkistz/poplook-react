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
        Schema::create('loyalty_list_filter', function (Blueprint $table) {
            $table->id();
            $table->integer('year')->nullable();
            $table->tinyInteger('tier')->nullable();
            $table->tinyInteger('tier_now')->nullable();
            $table->tinyInteger('tier_prev')->nullable();
            $table->float('amount_now',8,2)->nullable();
            $table->float('amount_prev',8,2)->nullable();
            $table->tinyInteger('id_shop')->nullable();
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
        Schema::dropIfExists('loyalty_list_filter');
    }
};
