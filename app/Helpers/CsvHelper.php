<?php

namespace App\Helpers;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class CsvHelper
{

    public static function readCsv($filePath, $filter = null, $readLineNo = 6, $orderBy = 'Poplook Transaction #', $orderDirection = 'asc')
    {
        if (!file_exists($filePath) || !is_readable($filePath)) {
            return false;
        }

        $header = null;
        $data = [];
        $poplookTransactions = [];
        $credits = [];

        if (($handle = fopen($filePath, 'r')) !== FALSE) {
            $lineNumber = 0; // Initialize line number counter

            while (($row = fgetcsv($handle, 1000, ',')) !== FALSE) {
                $lineNumber++;

                // Skip lines until the desired header line (e.g., line 6)
                if ($lineNumber < $readLineNo) {
                    continue;
                }

                if (!$header) {
                    // Set the header row (line 6)
                    $header = $row;
                } else {
                    // Combine header with current row data
                    $rowData = array_combine($header, $row);

                    // Apply the filter condition if provided
                    if ($filter === null || self::applyFilter($rowData, $filter)) {
                        $data[] = $rowData;

                        // Collect values from the "Poplook Transaction #" column
                        if (isset($rowData['Poplook Transaction #'])) {
                            $poplookTransactions[] = $rowData['Poplook Transaction #'];
                            $credits[$rowData['Poplook Transaction #']] = self::parseCredit($rowData['Credit']);
                        }
                    }
                }
            }
            fclose($handle);
        }

        // Apply ordering if specified
        if ($orderBy !== null && in_array($orderDirection, ['asc', 'desc'])) {
            usort($data, function($a, $b) use ($orderBy, $orderDirection) {
                $valueA = $a[$orderBy] ?? '';
                $valueB = $b[$orderBy] ?? '';
                
                if ($orderDirection === 'asc') {
                    return strcmp($valueA, $valueB);
                } else {
                    return strcmp($valueB, $valueA);
                }
            });
        }

        // Group consecutive Poplook Transaction # values and calculate credit sum
        $poplookTransactions = array_unique($poplookTransactions);
        sort($poplookTransactions);

        $groupedTransactions = self::groupConsecutive($poplookTransactions, $credits);

        return $groupedTransactions;
    }

    // Helper method to apply the filter
    public static function applyFilter($rowData, $filter)
    {
        foreach ($filter as $key => $value) {
            if (!isset($rowData[$key]) || $rowData[$key] != $value) {
                return false;
            }
        }
        return true;
    }

    // Helper method to group consecutive values and calculate credit sum
    public static function groupConsecutive(array $values, array $credits)
    {
        $grouped = [];
        $currentGroup = [];
        $currentSum = 0;

        foreach ($values as $value) {
            if (empty($currentGroup)) {
                $currentGroup[] = $value;
                $currentSum += $credits[$value] ?? 0;
            } else {
                // Check if the current value is consecutive
                $lastValue = end($currentGroup);
                if (self::isConsecutive($lastValue, $value)) {
                    $currentGroup[] = $value;
                    $currentSum += $credits[$value] ?? 0;
                } else {
                    // Finalize the previous group
                    $grouped[] = self::formatGroup($currentGroup, $currentSum);
                    $currentGroup = [$value];
                    $currentSum = $credits[$value] ?? 0;
                }
            }
        }

        // Add the last group if not empty
        if (!empty($currentGroup)) {
            $grouped[] = self::formatGroup($currentGroup, $currentSum);
        }

        return $grouped;
    }

    // Helper method to check if values are consecutive
    public static function isConsecutive($lastValue, $currentValue)
    {
        $lastNumber = substr($lastValue, -4);
        $currentNumber = substr($currentValue, -4);

        return (int)$currentNumber === (int)$lastNumber + 1;
    }

    // Helper method to format a group as a range or single value
    public static function formatGroup(array $group, $sum)
    {
        $description = count($group) === 1 
            ? $group[0] 
            : $group[0] . ' - ' . end($group);

        return (object) [
            'classification' => '004',
            'description' => $description,
            'quantity' => 1,
            'unit_price' => round((double)$sum, 2),
            'amount' => round((double)$sum, 2),
            'discount' => '-',
            'tax' => '-',
            'total_price_inc_tax' => round((double)$sum, 2),
        ];
    }

    // Helper method to parse credit values
    public static function parseCredit($credit)
    {
        // Check if the value is null or an empty string
        if (empty($credit)) {
            return 0;
        }
        
        // Remove non-numeric characters (e.g., currency symbols and commas)
        $cleanedCredit = preg_replace('/[^\d.]/', '', $credit);

        // Convert to float and return 
        return floatval($cleanedCredit);
    }

    public static function filter()
    {
        $result = [
            [ 
                'group' => '',
                'items' => [
                    [ 'label' => 'All', 'value' => ''],
                ] 
            ],[ 
                'group' => 'Shop',
                'items' => [
                    [ 'label' => 'Malaysia', 'value' => 'MYR'],
                    [ 'label' => 'Singapore', 'value' => 'SGD'],
                    [ 'label' => 'International', 'value' => 'USD'],
                ] 
            ],
            [
                'group' => 'Retails',
                'items' => [
                    [ 'label' => 'Aeon Shah Alam', 'value' => 'Aeon Shah Alam'],
                    [ 'label' => 'Aeon Tebrau', 'value' => 'Aeon Tebrau'],
                    [ 'label' => 'IOI City  Mall', 'value' => 'IOI City Mall'],
                    [ 'label' => 'Kl East Mall', 'value' => 'KL East Mall'],
                    [ 'label' => 'Setia City Mall', 'value' => 'Setia City'],
                    [ 'label' => 'Sogo', 'value' => 'Sogo'],
                    [ 'label' => 'The Curve', 'value' => 'The Curve'],
                ] 
            ], [ 
                'group' => 'Others',
                'items' => [
                    [ 'label' => 'Others', 'value' => 'Others'],
                ] 
            ]

        ];

        return $result;
    }

    public static function download($filename = 'new-excel')
    {
        $csvFilePath = base_path('resources/js/Pages/Admin/lhdn/ConsolidationInvoice/Values/POPLOOKGLEinvoice.csv');
        $directory = "storage/LHDN/E-Invoice/";

        $excelFilePath = $directory . $filename . '.xlsx';

        // Ensure the directory exists
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        } 

        // Check if the CSV file exists
        if (!file_exists($csvFilePath) || !is_readable($csvFilePath)) {
            return back()->with([
                'type'    => 'error',
                'message' => 'CSV file not found or not readable: ' . $csvFilePath
            ]);
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Define styles
        $headerStyle = [
            'font' => ['bold' => true],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'color' => ['rgb' => 'FFFF00']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000']
                ]
            ]
        ];

        // Set header
        $headers = [
            'Account', 'Type', 'Date', 'Document Number', 'Poplook Transaction #', 
            'Name', 'Debit', 'Credit', 'Balance', 'Channel', 'Location: Name', 
            'Initial Order from HQ'
        ];
        $sheet->fromArray($headers, null, 'A1');
        $sheet->getStyle('A1:L1')->applyFromArray($headerStyle);

        $rowNumber = 2; // Start from row 2 after the header

        if (($handle = fopen($csvFilePath, 'r')) !== FALSE) {
            // Skip metadata rows
            for ($i = 0; $i < 4; $i++) {
                fgetcsv($handle); // Read and discard
            }

            // Process actual data
            while (($row = fgetcsv($handle, 1000, ',')) !== FALSE) {
                if (!empty(array_filter($row))) { // Skip empty rows
                    $sheet->fromArray($row, null, 'A' . $rowNumber++);
                }
            }
            fclose($handle);
        } else {
            return back()->with([
                'type'    => 'error',
                'message' => 'Failed to open CSV file: ' . $csvFilePath
            ]);
        }

        // Apply number formatting
        $sheet->getStyle('G2:G' . ($rowNumber - 1))->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_NUMBER);
        $sheet->getStyle('H2:H' . ($rowNumber - 1))->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_NUMBER);
        $sheet->getStyle('I2:I' . ($rowNumber - 1))->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_NUMBER);

        // Save the file
        try {
            $writer = new Xlsx($spreadsheet);
            $writer->save($excelFilePath);

            if (file_exists($excelFilePath)) {
                return $excelFilePath;
            } else {
                return back()->with([
                    'type'    => 'error',
                    'message' => 'Failed to save Excel file: ' . $excelFilePath,
                ]);
            }
        } catch (\Exception $e) {
            return back()->with([
                'type'    => 'error',
                'message' => 'Error saving Excel file: ' . $e->getMessage(),
            ]);
        }
    }
    
}
