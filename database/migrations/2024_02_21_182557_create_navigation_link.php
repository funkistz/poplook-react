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
        Schema::create('navigation_link', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('icon')->nullable();
            $table->smallInteger('active')->default(0);
            $table->boolean('initially_open')->default(0);
            $table->text('link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('navigation_link');
    }
};
