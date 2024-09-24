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
        Schema::create('customer_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('ps_customer_id')->nullable()->index();
            $table->string('name');
            $table->string('email');
            $table->boolean('is_subscribed_email')->default(false);
            $table->boolean('is_subscribed_whatsapp')->default(false);
            $table->boolean('is_web_notifications')->default(false);
            $table->boolean('is_app_notifications')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_profiles');
    }
};
