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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('ps_employee_id')->nullable()->index();
            $table->uuid('uuid');
            $table->string('campaign_name');
            $table->string('campaign_category');
            $table->string('campaign_type')->default('single');
            $table->string('activation_status')->default('draft');
            $table->string('campaign_status')->default('draft');
            $table->date('start_date')->nullable();
            $table->time('start_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
