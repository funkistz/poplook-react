<?php

namespace App\Http\Controllers\Marketing\Email;

use App\Http\Controllers\Controller;
use App\Services\Marketing\Email\DesignService;
use Illuminate\Http\Request;

class EmailDesignController extends Controller
{
    public $service;
    public function __construct()
    {
        $this->service = new DesignService();
    }

    public function upload(Request $request)
    {
        return $this->service->extractUploadAndModifyHtml($request);
    }
}
