<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortColumn = $request->input('sort_by', 'date_upd');
        $sortOrder = $request->input('order_by', 'desc');
        $pagination = $request->input('per_page', 5);
        $searchTerm = $request->input('search');
        $searchBy = $request->input('search_by', 'id_product');

        if($request->cookie('shop') == 0) {
            $query = Product::query()
                ->with('productLang')
                ->with('productAvailability')
                ->with('specificPrice', function ($q) {
                    $q->where([
                        ['from', '<=', now()],
                        ['to', '>=', now()],
                    ])->first();
                });
        } else {
            $query = Product::query()
                ->with('productLang')
                ->with('productAvailability')
                ->with('specificPrice', function ($q) {
                    $q->where([
                        ['from', '<=', now()],
                        ['to', '>=', now()],
                    ])->first();
                })
                ->where('id_shop_default', $request->cookie('shop'));
        }

       


        if ($searchTerm) {
            if($searchBy == 'name') {
                $query->whereHas('productLang', function ($subquery) use ($searchTerm, $searchBy) {
                    $subquery->where($searchBy, 'like', '%' . $searchTerm . '%');
                });
            } else {
                $query->where(function ($subquery) use ($searchBy, $searchTerm) {
                    $subquery->where($searchBy, 'like', '%' . $searchTerm . '%');
                });
            }
        }

        $query->orderBy($sortColumn, $sortOrder);
        $list = $query->paginate($pagination);

        $custom = collect([
            'sort_by' => $sortColumn,
            'order_by' => $sortOrder,
            'search' => $searchTerm,
            'search_by' => $searchBy,
        ]);

        $list = $custom->merge($list);
        $domain = str_replace('webapi/', '', $_SERVER['API_URL']);

        return Inertia::render('Admin/Catalog/Products/Index', [
            'list' => $list,
            'domain'=> $domain
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Admin/Catalog/Products/View', [
            // 'list' => $list
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $result = Product::find($id);
        // if ($result) {
        //     $result->delete();
        //     return back()->with([
        //         'type'    => 'success',
        //         'message' => 'Successfully Deleted',
        //     ]);
        // }

        return back()->with([
            'type'    => 'success',
            'message' => 'Successfully Deleted',
        ]);
    }

    public function tongleStatus(Request $req) 
    {
    
        $product = Product::find($req->id);
        try {
            if (!empty($product)) {
                $product->active = $req->active;
                $product->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Status with ID '. $req->id .' has been successfully updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
