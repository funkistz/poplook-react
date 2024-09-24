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
        Schema::create('campaign_email_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained();
            $table->foreignId('customer_profile_id')->constrained();
            $table->string('email');
            $table->string('status')->default('pending');
            $table->boolean('is_open')->default(false);
            $table->boolean('is_clicked')->default(false);
            $table->string('mail_status')->nullable();
            $table->dateTime('delivered_at')->nullable();
            $table->json('error_logs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_email_logs');
    }
};
