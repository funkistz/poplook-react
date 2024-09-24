<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\RedirectResponse;

class EmployeeAuthController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Auth/Login', []);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        $employee = Employee::where('email', $request->email)
            ->where('passwd', md5($request->password))
            ->first();

        if ($employee) {
            if($employee->active) {
                Auth::guard('admin')->login($employee);
                // return to_route('dashboard.index');
                // return redirect()->intended('dashboard')->with([

                //set cookie here 
                $cookie = Cookie::make('id_shop', 0);

                return redirect('admin')->withCookie($cookie)->with([
                    'type' => 'success',
                    'message' => 'Signed in',
                ]);
            }

            return back()->with([
                'type' => 'error',
                'message' => 'Account Inactive. Contact tech support for help.',
            ]);
            
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Login details are not valid',
            ])->withErrors([
                'email' => 'Login details are not valid'
            ]);
        }

        // return redirect('/');
    }

    public function login2(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->intended('dashboard')
                ->with([
                    'type' => 'error',
                    'message' => 'Signed in',
                ]);
        }

        return redirect("login")->with([
            'type' => 'error',
            'message' => 'Login details are not valid',
        ]);
    }

    public function registration()
    {
        return view('auth.registration');
    }

    public function customRegistration(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $data = $request->all();
        $check = $this->create($data);

        return redirect("dashboard")->withSuccess('You have signed-in');
    }

    public function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
    }

    public function dashboard()
    {
        if (Auth::check()) {
            return view('dashboard');
        }

        return redirect("login")->withSuccess('You are not allowed to access');
    }

    public function logout()
    {
        Session::flush();
        Auth::guard('admin')->logout();

        // $response = new RedirectResponse('admin');
        // $response->withCookie(Cookie::forget('id_shop'));

        // return $response;

        return Redirect('admin');
    }

    public function setCookie(Request $request)
    {
        $cookie = Cookie::make('id_shop', $request->shop);
        return back()->withCookie($cookie);
    }
}
