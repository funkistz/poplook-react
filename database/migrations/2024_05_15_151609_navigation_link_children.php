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
        Schema::table('role', function (Blueprint $table) {
            $table->string('action')->default(1)->after('name');
        });

        Schema::table('navigation_link_role', function (Blueprint $table) {
            $table->integer('id_navigation_link_children')->after('id_navigation_link');
        });

        Schema::create('navigation_link_children', function (Blueprint $table) {
            $table->id();
            $table->integer('id_navigation_link');
            $table->string('label');
            $table->string('link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('role', function (Blueprint $table) {
            $table->dropColumn('action');
        });
        Schema::table('navigation_link_role', function (Blueprint $table) {
            $table->dropColumn('id_navigation_link_children');
        });
        Schema::dropIfExists('navigation_link_children');
    }
};
