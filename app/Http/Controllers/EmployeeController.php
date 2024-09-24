<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\LoginController as DefaultLoginController;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    protected $redirectTo = '/employee/home';

    public function __construct()
    {
    }

    public function index()
    {
        // return view('auth.login.employee');
        // dd(Auth::guard('admin')->user());
        return Inertia::render('Admin/Index', []);
    }

    public function showLoginForm()
    {
        // return view('auth.login.employee');
        return Inertia::render('Admin/Auth/Login', []);
    }

    public function username()
    {
        return 'employee_id';
    }

    protected function guard()
    {
        return Auth::guard('employee');
    }
}
