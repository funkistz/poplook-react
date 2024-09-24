<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\CategoryProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortColumn = $request->input('sort_by', 'id_category');
        $sortOrder = $request->input('order_by', 'asc');
        $pagination = $request->input('per_page', 5);
        $searchTerm = $request->input('search');
        $query = Categories::query()->with('categoriesLang');

        if ($searchTerm) {
            $query->whereHas('categoriesLang', function ($subquery) use ($searchTerm) {
                $subquery->where('name', 'like', '%' . $searchTerm . '%');
                $subquery->where('id_shop', '=', '1');
                $subquery->where('id_lang', '=', '1');
                
                
            });
        }

        $query->orderBy($sortColumn, $sortOrder);
        $list = $query->paginate($pagination);

        $custom = collect([
            'sort_by' => $sortColumn,
            'order_by' => $sortOrder,
            'search' => $searchTerm,
        ]);

        $categories = $custom->merge($list);

        // dd($list, $categories);
        return Inertia::render('Admin/Catalog/Categories/Index', [
            // 'list' => [],
            'category_list' => $categories,
            'search'        => '',
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
    public function show(string $id, Request $request)
    {
        $sortColumn   = $request->input('sort', 'position');
        $sortOrder    = $request->input('order', 'asc');
        $pagination   = $request->input('perpage', 50);
        $searchTerm   = $request->input('search');
        $current_page = $request->input('page');
        // DB::enableQueryLog();
        $category     = Categories::getCategoryName($id);
        $product_list = CategoryProduct::getCategoryProduct($id, $sortColumn, $sortOrder, $pagination, $searchTerm);
        // $query        = DB::getRawQueryLog();
        // dd(($current_page > 1) ? $current_page * $pagination - $pagination : 0);
        $domain = str_replace('webapi/', '', $_SERVER['API_URL']);
        return Inertia::render('Admin/Category/View', [
            'product_list' => $product_list,
            'param'        => [
                'domain'        => $domain,
                'category'      => $category,
                'position_init' => ($current_page > 1) ? $current_page * $pagination - $pagination : 0,
            ],
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
        $product_sort  = $request->input('product_sort');
        $product_arr = [];
        foreach ($product_sort as $key => $value) {
            # code...
            $product_arr[$value['id_product']]['position'] = $value['init_position'] + $key;
        }
        // dd($product_arr);
        CategoryProduct::updatePosition($id, $product_arr);

        return response()->json([
            "status"  => 200,
            "message" => "Record successfully updated.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $product_del  = $request->input('product_del');
        return $result = CategoryProduct::deleteProduct($id, $product_del);
        return response()->json([
            "status"  => 200,
            "message" => "Record successfully deleted.",
        ]);
    }
}
