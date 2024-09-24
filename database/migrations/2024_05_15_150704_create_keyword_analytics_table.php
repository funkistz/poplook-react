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
        Schema::create('keyword_analytics', function (Blueprint $table) {
            $table->id();
            $table->string('keyword');
            $table->json('clicks')->nullable();
            $table->json('searches')->nullable();
            $table->foreignId('query_analytic_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keyword_analytics');
    }
};
