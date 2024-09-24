<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Seo extends Model
{
    use HasFactory;

    protected $table = 'ps_cms';
    protected $primaryKey = 'id_cms';

    public static function FindCms($id,$id_lang,$id_shop,$id_cms_category){
        // return [$id,$id_lang,$id_shop];

        // $cms = SEO::where('active', 1)
        //         ->where('id_cms', $id)->first();
        // return $cms;

        DB::enableQueryLog();
        $active = 1;
        $id_cms_category = 1;

        if(!$id_shop){
			// $id_shop = Configuration::get('PS_SHOP_DEFAULT');
            $id_shop = 1;
		}	
        // $cms = Seo::select('c.id_cms', 's.id_shop', 'c.id_cms_category', 'c.position', 'c.active', 'l.id_lang', 'l.meta_title', 'l.meta_description', 'l.meta_keywords', 'l.content', 'l.link_rewrite');
        // if ($id_lang) {
        //     $cms->leftJoin('ps_cms_lang AS l', function($join) use ($id_lang)
        //     {
        //         $join->on('c.id_cms', '=', 'l.id_cms');
        //         $join->on('l.id_lang','=',Seo::raw("'".$id_lang."'"));
        //     });
        // }
		// $cms->join('ps_cms_shop AS s', 'c.id_cms', '=', 's.id_cms');
        // if ($active) {
        //     $cms->where('c.active', $active);
        // }
        // $cms->where('s.id_shop', $id_shop)
        // ->orderBy('position')
        // ->from('ps_cms AS c')
        // ->get();
		// if ($id_cms_category){
		// 	$sql->where('c.id_cms_category = '.(int)$id_cms_category);
		// }
        DB::enableQueryLog();

        $cms = DB::table('ps_cms AS c')->select('c.id_cms', 'c.id_cms_category', 'c.position', 'c.active', 'l.id_lang', 's.id_shop', 'l.id_lang', 'l.meta_title', 'l.meta_description', 'l.meta_keywords', 'l.content', 'l.link_rewrite')
        ->when($id_lang, function($query) use ($id_lang) {
            return $query->leftJoin('ps_cms_lang AS l', function($join) use ($id_lang)
                {
                    $join->on('c.id_cms', '=', 'l.id_cms');
                    $join->on('l.id_lang','=',DB::raw("'".$id_lang."'"));
                });
          })
        ->join('ps_cms_shop AS s', 'c.id_cms', '=', 's.id_cms')
        ->where('c.id_cms', $id)
        ->when($active, function($query) use ($active) {
            return $query->where('c.active', $active);
        })
        ->when($id_cms_category, function($query) use ($id_cms_category) {
            return $query->where('c.id_cms_category', $id_cms_category);
        })
        ->where('s.id_shop', $id_shop)
        ->orderBy('position')
        ->get();

        $query = DB::getQueryLog();

		return $cms;
    }
}