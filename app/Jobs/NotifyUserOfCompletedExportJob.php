<?php

namespace App\Jobs;

use App\Mail\LoyaltyListExport;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class NotifyUserOfCompletedExportJob implements ShouldQueue
{
    use Queueable, SerializesModels;
    
    public $employee;
    public $attachment;
    
    public function __construct($employee)
    {
        $this->employee = $employee;
    }

    public function handle()
    {
        // echo json_encode($this->employee->email);
        // $this->employee->notify(new LoyaltyListExport($this->employee->email, ''));
        Mail::to($this->employee->email)->send(new \App\Mail\LoyaltyListExport($this->employee->email, 2024, [5,6,7], '', $this->attachment));
    }

}
