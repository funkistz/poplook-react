<?php

namespace App\Helpers;

class DataTableCustom
{
    // Define the parameters to pass to the applyFilters method
    // $params = [
    //     'model' => Campaign::class,
    //     'relationships' => ['mail', 'template', 'template.template' => function($query) {
    //         $query->select('id', 'content');
    //     }],
    //     'conditions' => [
    //         'where' => [
    //             ['campaign_category', '=', 'app_push']
    //         ],
    //         'whereIn' => [
    //             ['current_state', ['a', 'w', '3']]
    //         ]
    //     ],
    //     'searchableFields' => ['campaign_name'],
    //     'filterField' => 'campaign_status', // Table Column Name
    //     'cookieField' => $request->cookie('id_shop'), // For Now accept id_shop only
    //     'column' => 'created_at', // Default sorting column
    //     'order' => 'desc' // Default sorting order
    // ];

    public static function applyFilters($request, array $params) 
    {
        $sortColumn = $request->input('sort_by', $params['column'] ?? 'created_at');
        $sortOrder  = $request->input('order_by', $params['order'] ?? 'desc');
        $pagination = $request->input('per_page', 5);
        $searchTerm = $request->input('search');
        $filterBy = $request->input('filter_by', null);
        $filterField = $params['filterField'] ?? null;
        $searchableFields = $params['searchableFields'] ?? [];
        $relationships = $params['relationships'] ?? [];
        $cookieShop = isset($params['cookieField']) && $params['cookieField'] != 0 ? $params['cookieField'] : false;
        $conditions = isset($params['conditions']) ? $params['conditions'] : [];     

        $query = $params['model']::query()->with($relationships);

        // Apply conditions using the conditions method
        $query = self::conditions($query, $conditions);

        // Custom Filter
        if ($filterBy !== null) {
            $query->where($filterField, $filterBy);
        }

        // Filter By Shop
        if ($cookieShop !== false) {
            $query->where('id_shop', $cookieShop);
        }

        // Search List
        if ($searchTerm && !empty($searchableFields)) {
            $query->where(function ($subquery) use ($searchTerm, $searchableFields) {
                foreach ($searchableFields as $field) {
                    $subquery->orWhere($field, 'like', '%' . $searchTerm . '%');
                }
            });
        }

        // Ordering List
        $query->orderBy($sortColumn, $sortOrder);

        // Pagination List
        $list = $query->paginate($pagination);

        $custom = collect([
            'sort_by'  => $sortColumn,
            'order_by' => $sortOrder,
            'search'   => $searchTerm,
            'filter_by' => $filterBy,
        ]);

        return $custom->merge($list);
    }

    public static function conditions($query, $conditions)
    {
        // Apply 'where' conditions
        if (isset($conditions['where'])) {
            foreach ($conditions['where'] as $condition) {
                if (is_array($condition)) {
                    list($field, $operator, $value) = $condition;
                    $query->where($field, $operator, $value);
                }
            }
        }

        // Apply 'whereIn' conditions
        if (isset($conditions['whereIn'])) {
            foreach ($conditions['whereIn'] as $condition) {
                if (is_array($condition)) {
                    list($field, $values) = $condition;
                    $query->whereIn($field, $values);
                }
            }
        }

        // Apply 'whereIn' conditions
        if (isset($conditions['whereNotIn'])) {
            foreach ($conditions['whereNotIn'] as $condition) {
                if (is_array($condition)) {
                    list($field, $values) = $condition;
                    $query->whereNotIn($field, $values);
                }
            }
        }

          // Apply 'whereBetween' conditions
         if (isset($conditions['whereBetween'])) {
            foreach ($conditions['whereBetween'] as $condition) {
                if (is_array($condition)) {
                    list($field, $values) = $condition;
                    $query->whereBetween($field, $values);
                }
            }
        }

        // Apply 'whereNull' conditions
        if (isset($conditions['whereNull'])) {
            foreach ($conditions['whereNull'] as $field) {
                $query->whereNull($field);
            }
        }

         // Apply 'whereNotNull' conditions
        if (isset($conditions['whereNotNull'])) {
            foreach ($conditions['whereNotNull'] as $field) {
                $query->whereNotNull($field);
            }
        }

        return $query;
    }
}

