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
        Schema::create('customer_phone_numbers', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_customer');
            $table->string('country_code');
            $table->bigInteger('phone_number')->unique();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();

            $table->foreign('id_customer')->references('id_customer')->on('ps_customer');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_phone_numbers');
    }
};
