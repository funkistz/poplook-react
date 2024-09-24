<?php

namespace App\Exports;

use App\Models\LoyaltyListFilter;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Excel;

class LoyaltyListExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;

    protected $year;
    protected $tier;
    protected $id_shop;
    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'invoices.xlsx';
    
    /**
    * Optional Writer Type
    */
    private $writerType = Excel::XLSX;
    
    /**
    * Optional headers
    */
    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    public function __construct(int $year, int $tier, int $id_shop)
    {
        $this->year    = $year;
        $this->tier    = $tier;
        $this->id_shop = $id_shop;
    }  
    /**
    * @param LoyaltListFilter $loyaltylistfilter
    */
    public function map($loyaltylistfilter): array
    {
        $data = json_decode($loyaltylistfilter->content);
        $country = $data->country;
        if ($data->currency == 1) {
            if (!$data->country) {
                $country = 'MY';
            }
            $currency_label = 'MYR';
        } else if ($data->currency == 5) {
            if (!$data->country) {
                $country = 'SG';
            }
            $currency_label = 'SGD';
        } else if ($data->currency == 2) {
            if (!$data->country) {
                $country = 'INTL';
            }
            $currency_label = 'USD';
        }

        if ($loyaltylistfilter->tier == 3) {
            $tier = 'GOLD';
        }elseif ($loyaltylistfilter->tier == 2) {
            $tier = 'SILVER';
        }else{
            $tier = 'BRONZE';
        }

        if ($loyaltylistfilter->tier_now == 3) {
            $tier_now = 'GOLD';
        }elseif ($loyaltylistfilter->tier_now == 2) {
            $tier_now = 'SILVER';
        }else{
            $tier_now = 'BRONZE';
        }

        if ($loyaltylistfilter->tier_prev == 3) {
            $tier_prev = 'GOLD';
        }elseif ($loyaltylistfilter->tier_prev == 2) {
            $tier_prev = 'SILVER';
        }else{
            $tier_prev = 'BRONZE';
        }
        return [
            // $loyaltylistfilter->internal_id,
            $data->internalid,
            $data->name,
            $loyaltylistfilter->email,
            $country,
            $loyaltylistfilter->year,
            $tier,
            // $tier_now,
            // $tier_prev,
            $currency_label,
            // $loyaltylistfilter->amount_prev,
            $loyaltylistfilter->amount_now,
            // Date::dateTimeToExcel($invoice->created_at),
        ];
    }

    public function headings(): array
    {
        return [
            'Internal ID',
            'Name',
            'Email',
            'Country',
            'Year',
            'Tier',
            // 'Previous Tier',
            // 'Current Tier',
            'Currency',
            // 'Previous Amount',
            'Current Amount',
        ];
    }

    public function query()
    {
        return LoyaltyListFilter::query()->where('year', $this->year)->where('tier', $this->tier)->where('id_shop', $this->id_shop);
    }
}
