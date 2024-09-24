<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categories;
use App\Models\CustomPage;
use App\Http\Resources\DefaultResource;

class CustomPageController extends Controller
{
    public function index()
    {
        $data = CustomPage::with([])->paginate(1000);
        $data = DefaultResource::collection($data);

        return Inertia::render('Admin/CustomPage/Index', [
            'customPages' =>  $data,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'unique:custom_pages',
            'url' => 'unique:custom_pages',
        ]);

        $attr = $request->toArray();
        $attr['active'] = 1;

        try {
            $custompage = CustomPage::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Custom Page been created',
                'params' =>  $custompage,
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function show(string $id)
    {
        $page = CustomPage::find($id);
        $category   = Categories::get_select_data();
        $pages      = CustomPage::get_select_data();

        return Inertia::render('Admin/CustomPage/View', [
            'customPage' =>  $page,
            'categoryList' => $category,
            'pagesList' => $pages,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $CustomPage = CustomPage::find($id);
        $attr = $request->toArray();

        $CustomPage->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Custom Page has been updated',
        ]);
    }
}
