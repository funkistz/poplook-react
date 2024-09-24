<?php

namespace App\Http\Controllers;

use App\Helpers\DataTableCustom;
use App\Models\Employee;
use App\Models\EmployeeShop;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // $sortColumn = $request->input('sort_by', 'firstname');
        // $sortOrder  = $request->input('order_by', 'asc');
        // $pagination = $request->input('per_page', 5);
        // $searchTerm = $request->input('search');
        // $filterBy = $request->input('filter_by', null);
        // if($filterBy == null) {
        //     $query = Employee::query()->with('role');
        // } else {
        //     $query = Employee::query()->with('role')->where('id_role', $filterBy);
        // }

        // if ($searchTerm) {
        //     $query->where(function ($subquery) use ($searchTerm) {
        //         $subquery->where('firstname', 'like', '%' . $searchTerm . '%')
        //             ->orWhere('lastname', 'like', '%' . $searchTerm . '%')
        //             ->orWhere('email', 'like', '%' . $searchTerm . '%');
        //     });
        // }

        // $query->orderBy($sortColumn, $sortOrder);
        // $list = $query->paginate($pagination);

        // $custom = collect([
        //     'sort_by'  => $sortColumn,
        //     'order_by' => $sortOrder,
        //     'search'   => $searchTerm,
        //     'filter_by' => $filterBy,
        // ]);
        
        // $list = $custom->merge($list);

        $data = collect([
            'model' => Employee::class,
            'relationships' => ['role'],
            'searchableFields' => ['firstname', 'lastname', 'email'],
            'filterField' => 'id_role',
            'column' => 'firstname',
            'order' => 'asc',
        ]);

        $list = DataTableCustom::applyFilters($request, $data->toArray());

        $role = Role::getRoleFilter();

        return Inertia::render('Admin/Employee/Index', [
            'list'   => $list,
            'role'   => $role,
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
        try {
            $checkUser = Employee::where('email', $request->email)->first();
            if ($checkUser) {
                return back()->with([
                    'type'    => 'error',
                    "message" => "Email already exists",
                ]);
            }
            $employee = new Employee();
            $result   = $employee->register($request);

            if ($result) {

                $find = Employee::where('email', $request->email)->first();
                if ($find) {

                    //Add Each Shop
                    $myr = new EmployeeShop();
                    $myr->addShopUser($find->id_employee, 1);
                    $sgd = new EmployeeShop();
                    $sgd->addShopUser($find->id_employee, 2);
                    $usd = new EmployeeShop();
                    $usd->addShopUser($find->id_employee, 3);

                    return back()->with([
                        'type'    => 'success',
                        'message' => 'Profile successfully registered!',
                    ]);
                }
            }
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Something went wrong.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        DB::enableQueryLog();
        $employee = Employee::with(['role'])->find($id);
        $role       = Role::get(['id AS value', 'name AS label']);
        if ($employee) {
            return Inertia::render('Admin/Employee/Edit', [
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

    public function changeStatus(Request $request)
    {
        try {
            $employee = Employee::find($request->id_employee);
            $employee->update_status($request);
            return back()->with([
                'type'    => 'success',
                'message' => 'Status Changed!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                "message" => "Something went wrong.",
            ]);
        }
    }

    public function changeRole(Request $request)
    {
        try {
            $employee = Employee::find($request->id_employee);
            $employee->update_role($request);
            return back()->with([
                'type'    => 'success',
                'message' => 'Role Changed!',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type'    => 'error',
                "message" => "Something went wrong.",
            ]);
        }
    }
}
