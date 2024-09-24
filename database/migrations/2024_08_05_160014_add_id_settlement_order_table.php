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
        Schema::table('ps_orders', function (Blueprint $table) {
            $table->integer('id_settlement')->nullable()->after('id_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ps_orders', function($table) {
            $table->dropColumn('id_settlement');
        });
    }
};
