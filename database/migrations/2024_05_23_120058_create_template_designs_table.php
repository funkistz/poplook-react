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
        Schema::create('template_designs', function (Blueprint $table) {
            $table->id();
            $table->string('template_name');
            $table->string('template_type');
            $table->longText('content')->nullable();
            $table->longText('html')->nullable();
            $table->boolean('is_dynamic')->default(false);
            $table->string('sg_id')->nullable();
            $table->string('tw_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_designs');
    }
};
