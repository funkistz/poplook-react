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
        Schema::create('segment_groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_employee');
            $table->string('group_name');
            $table->string('status')->default('draft');
            $table->unsignedBigInteger('id_shop');
            $table->string('generate_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segment_groups');
    }
};
