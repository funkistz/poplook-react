<?php

namespace App\Http\Controllers;

use App\Helpers\UploadFile;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Inertia\Inertia;

class FileUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $sortColumn = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('order_by', 'desc');
        $pagination = $request->input('per_page', 20);
        $searchTerm = $request->input('search');
        $query = File::query();

        if ($searchTerm) {
            $query->where(function ($subquery) use ($searchTerm) {
                $subquery->where('name', 'like', '%' . $searchTerm . '%');
            });
        }

        $query->orderBy($sortColumn, $sortOrder);
        $list = $query->paginate($pagination);

        $custom = collect([
            'sort_by' => $sortColumn,
            'order_by' => $sortOrder,
            'search' => $searchTerm,
        ]);

        $list = $custom->merge($list);


        // $media = File::getAllFile();
        $files = File::getAllFileGroupByMime();

        $path = public_path('storage/tk8Ci8Saux3P2JfD7oILzTWCZf3fvVoBZgR7BeUa.png');
        $file = File::get('url');

        $media = File::paginate(20);

        return Inertia::render('Admin/Settings/FileUpload/Index', [
            'files' => $files,
            'media' => $list,
            'path'  => $path,
            'domain' => env('APP_URL') . '/'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $files = File::getAllFile();
        // $files = File::getAllFileGroupByMime();

        return response()->json([
            "files"   => $files,
            "message" => "Success",
        ])->setStatusCode(200);
    }

    public function fileList()
    {
        $files = File::orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            "files"   => $files,
            "message" => "Success",
        ])->setStatusCode(200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $uploadManager = new UploadFile();

        // Multi Upload
        if (is_array($request->file('file'))) {
            foreach ($request->file('file') as $item) {
                $data = $uploadManager->uploadFile($item, $request->app);

                File::fileUpload($data);
            }
            return back()->with([
                'type'    => 'success',
                'message' => 'File Successfully Updated.',
            ]);
        }

        $data = $uploadManager->uploadFile($request->file('file'), $request->app == 1 ? true : false);
        File::fileUpload($data);

        return back()->with([
            'type'    => 'success',
            'message' => 'File Successfully Updated.',
        ]);
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
