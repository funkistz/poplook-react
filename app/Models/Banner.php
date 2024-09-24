<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Banner extends Model
{
    use HasFactory;

    protected $table = 'ps_banners_categories';

    public static function lookbook_banner($banner_category_name, $id_shop = 1, $param = [])
    {

        DB::enableQueryLog();
        $query = Banner::join('ps_banners_items AS i', 'i.category', 'c.id')->when($param, function ($query) use ($param) {
            return $query->where('i.position', $param['order']);
        })
            ->when($banner_category_name, function ($where) use ($banner_category_name) {
                return $where->where('c.name', 'LOOKBOOK ' . $banner_category_name);
            })
            ->where('i.id_shop', $id_shop)
            ->orderBy('i.position', 'ASC')
            ->select('i.position', 'i.href', 'i.link', 'i.col_no')
            ->from('ps_banners_categories AS c')
            ->get();
        $qlog = DB::getQueryLog();

        return $query;
    }
}
