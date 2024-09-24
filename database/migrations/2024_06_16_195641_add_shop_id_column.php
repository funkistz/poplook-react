<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    protected $connection = 'mysql_marketing';

    public function up(): void
    {
        Schema::table('campaign_segments', function (Blueprint $table) {
            $table->integer('shop_id')->nullable()->after('segment_group_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campaign_segments', function (Blueprint $table) {
            //
        });
    }
};
