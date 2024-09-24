<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    protected $connection = 'mysql_marketing';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('segment_group_targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('segment_group_id')->constrained();
            $table->foreignId('customer_profile_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segment_group_targets');
    }
};
