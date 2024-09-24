<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = Auth::user()->id_employee;
        $employee = Employee::with(['role'])->find($id);
        $role       = Role::get(['id AS value', 'name AS label']);

        if ($employee) {
            return Inertia::render('Admin/Profile/Index', [
                'employee' => $employee,
                'role'     => $role,
            ]);
        }
        
        return back()->with([
            'type'    => 'error',
            "message" => "Something went wrong.",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            Employee::find($id)->update_profile($request);
            return back()->with([
                'type'    => 'success',
                'message' => 'Profile Changed!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Something Wrong!',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function changePassword(Request $request)
    {
        try {
            $employee = Employee::find($request->id_employee);
            $employee->update_password($request);
            return back()->with([
                'type'    => 'success',
                'message' => 'Password Changed!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                "message" => "Something went wrong.",
            ]);
        }
    }
}
