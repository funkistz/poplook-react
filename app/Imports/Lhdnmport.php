<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Pagination\LengthAwarePaginator;

class Lhdnmport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    protected $rows;

    public function collection(Collection $collection)
    {
        $this->rows = $collection;
    }

   

    // public function getData($perPage = 5)
    // {
    //     // Paginate the data manually with adjusted index
    //     $currentPage = LengthAwarePaginator::resolveCurrentPage();
    //     $currentPageItems = $this->rows->slice(($currentPage - 1) * $perPage)->take($perPage)->values();
    //     $paginatedData = new LengthAwarePaginator($currentPageItems, count($this->rows), $perPage);

    //     return $paginatedData;
    // }

    public function getData($perPage = 5, $searchTerm = 87.20)
    {
        // Filter the data based on the search term if provided
        // if ($searchTerm) {
        //     $filteredData = $this->rows->filter(function ($row) use ($searchTerm) {
        //         // Adjust this logic based on your actual data structure and search criteria
        //         // Example: Check if 'name' column contains the search term (case-insensitive)
        //         return stripos($row['amount'], $searchTerm) !== false;
        //     });
        // } else {
        //     $filteredData = $this->rows;
        // }

        $filteredData = $this->rows;

        // Paginate the filtered data
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentPageItems = $filteredData->slice(($currentPage - 1) * $perPage)->take($perPage)->values();
        $paginatedData = new LengthAwarePaginator($currentPageItems, $filteredData->count(), $perPage, $currentPage, [
            'path' => LengthAwarePaginator::resolveCurrentPath(),
        ]);

        return $paginatedData;
    }
}
