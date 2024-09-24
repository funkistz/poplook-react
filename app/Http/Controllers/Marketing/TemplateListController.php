<?php

namespace App\Http\Controllers\Marketing;

use App\Helpers\DataTableCustom;
use App\Http\Controllers\Controller;
use App\Models\Marketing\Design\TemplateDesign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // $sortColumn = $request->input('sort_by', 'created_at');
        // $sortOrder = $request->input('order_by', 'desc');
        // $pagination = $request->input('per_page', 5);
        // $searchTerm = $request->input('search');
        // $filterBy = $request->input('filter_by', null);

        // if($filterBy == null) {
        //     $query = TemplateDesign::query();
        // } else {
        //     $query = TemplateDesign::query()->Type($filterBy);
        // }

        // if ($searchTerm) {
        //     $query->where(function ($subquery) use ($searchTerm) {
        //         $subquery->where('template_name', 'like', '%' . $searchTerm . '%');
        //     });
        // }

        // $query->orderBy($sortColumn, $sortOrder);
        // $list = $query->with(['campaign'])->paginate($pagination);

       
        // // Modify the 'Name' value for each item
        // $modifiedList = $list->getCollection()->map(function ($item) {
        //     $item->html = $item->html ? html_entity_decode($item->html) : null;
        //     return $item;
        // });

        // // Set the modified list back to the paginator
        // $list->setCollection($modifiedList);

        // $custom = collect([
        //     'sort_by' => $sortColumn,
        //     'order_by' => $sortOrder,
        //     'search' => $searchTerm,
        //     'filter_by' => $filterBy,
        // ]);

        // $list = $custom->merge($list);

        $data = collect([
            'model' => TemplateDesign::class,
            'searchableFields' => ['template_name'],
            'filterField' => 'template_type',
        ]);
        $list = DataTableCustom::applyFilters($request, $data->toArray());
        
        $modifiedItems = array_map(function ($item) {
            $item['html'] = $item['html']  ? html_entity_decode($item['html']) : null;
            return $item;
        }, $list['data']);

        $list['data'] = $modifiedItems;
    
        return Inertia::render('Admin/Marketing/Template/Index', [
            'data' => $list,
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
