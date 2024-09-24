<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class NavigationLinkChildren extends Model
{
    use HasFactory;

    protected $table    = 'navigation_link_children';
    protected $fillable = [
        'id',
        'id_navigation_link',
        'label',
        'link',
    ];

    public function NavigationLink(): BelongsTo
    {
        return $this->belongsTo(NavigationLink::class, 'id', 'id_navigation_link');
    }

    public static function getSelection()
    {
        // if (empty($search)) {
        //     return [];
        // }
        $query = NavigationLinkChildren::leftJoin('navigation_link', function ($join) {
            $join->on('navigation_link.id', '=', 'navigation_link_children.id_navigation_link');
        })
        ->where('navigation_link.active', 1)
        ->select(DB::raw('navigation_link_children.id AS id, navigation_link_children.label AS label, navigation_link.label AS group_name, CONCAT_WS("-",navigation_link_children.id_navigation_link, navigation_link_children.id) AS value'))->get();
        
        $data = [];
        foreach ($query as $key => $value) {
            $data[$value->group_name][] = $value;
        }
        return $data;
    }
}
