<?php

namespace App\Http\Controllers\LHDN;

use App\Helpers\CsvHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ConsolodationEinvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/lhdn/ConsolidationInvoice/Index', [
            // 'list' => $importedData
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

        // $filePath = storage_path('app/public/POPLOOKGLEinvoice.csv');

        // Filter
        $filter = CsvHelper::filter();
        $filterBy = $request->input('filterBy', '');

        // Temporary
        $filePath = base_path('resources/js/Pages/Admin/lhdn/ConsolidationInvoice/Values/POPLOOKGLEinvoice.csv');

        // Column Define
        $channel = 'Channel';
        $retails = 'Retail';
        $location = 'Location: Name';
        $shop = ['MYR', 'SGD', 'USD', 'Others'];
        
        if(empty($filterBy)) {
            $others = CsvHelper::readCsv($filePath, [$channel => 'Others']);
            $myr = CsvHelper::readCsv($filePath, [$channel => 'MYR']); 
            $sgd = CsvHelper::readCsv($filePath, [$channel => 'SGD']); 
            $usd = CsvHelper::readCsv($filePath, [$channel => 'USD']); 
    
            // Retails
            $aeonShahAlam = CsvHelper::readCsv($filePath, [$channel => $retails, $location => 'Aeon Shah Alam']); 
            $aeonTerbau = CsvHelper::readCsv($filePath, [$channel => $retails, $location => 'Aeon Tebrau']); 
            $ioiCityMall = CsvHelper::readCsv($filePath, [$channel => $retails, $location => 'IOI City Mall']); 
            $klEastMall = CsvHelper::readCsv($filePath, [$channel => $retails, $location => 'KL East Mall']);
            $setiaCity = CsvHelper::readCsv($filePath, [$channel => $retails, $location => 'Setia City']); 
            $sogo = CsvHelper::readCsv($filePath, [$channel => $retails, $location => 'Sogo']); 
            $theCurve = CsvHelper::readCsv($filePath, [$channel => $retails, $location => 'The Curve']);

            $result = array_merge($others, $myr, $sgd, $usd, $aeonShahAlam, $aeonTerbau, $ioiCityMall, $klEastMall, $setiaCity, $sogo, $theCurve);

        } else {

            $find = array_search($filterBy, $shop);
            if ($find !== false) {
                $result = CsvHelper::readCsv($filePath, [$channel => $filterBy]); 
            } else {
                $result = CsvHelper::readCsv($filePath, [$channel => $retails, $location => $filterBy]); 
            }

        }

        

        

       

        return Inertia::render('Admin/lhdn/ConsolidationInvoice/Edit', [
            'list' => $result,
            'filters' => $filter,
            'filterBy' => $filterBy
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
        return back()->with([
            'type'    => 'success',
            'message' => 'Successfully Sent to LHDN',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function downloadExcel(Request $request)
    {
        $result = CsvHelper::download($request->filename);
        if (file_exists($result)) {
           return response()->download($result);
        } else {
            return back()->with([
                'type'    => 'error',
                'message' => 'File not found.!',
            ]);
        }
    }

}
