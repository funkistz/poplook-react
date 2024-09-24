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
        Schema::table('home_banners', function (Blueprint $table) {
            $table->boolean('active')->after('data')->nullable();
            $table->dateTime('start_at')->after('active')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('home_banners', function (Blueprint $table) {
            $table->dropColumn(['active', 'start_at']);
        });
    }
};
