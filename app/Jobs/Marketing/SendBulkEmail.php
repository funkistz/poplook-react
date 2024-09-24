<?php

namespace App\Jobs\Marketing;

use App\Http\Middleware\Redis\RateLimitEmail;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class SendBulkEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Batchable;
    public $tries = 3;
    public $backoff = [60, 180, 300]; // Wait 1, 3, 5 minutes between attempts
    /**
     * Create a new job instance.
     */
    protected $dataset;

    public function __construct(Collection $dataset)
    {
        $this->dataset = $dataset;
    }

    public function middleware(): array
    {
        return [new RateLimitEmail];
    }
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->batch() && $this->batch()->cancelled()) {
            return;
        }

        $this->dataset->each(function ($user) {
            try {
                // Send email to each user
                // Log success
                Log::info("Email sent successfully to: " . $user->email);
            } catch (\Exception $e) {
                // Log error
                Log::error("Failed to send email to: " . $user->email . ". Error: " . $e->getMessage());

                // You might want to handle the failure (e.g., retry logic, marking the user, etc.)
            }
        });
    }


}
