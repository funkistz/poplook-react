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
        Schema::create('campaign_tags', function (Blueprint $table) {
            $table->id();
            $table->string('tag_name');
            $table->string('tag_color')->nullable();
            $table->json('relationships')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_tags');
    }
};
