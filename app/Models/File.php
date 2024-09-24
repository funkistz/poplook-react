<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $table      = 'files';
    protected $primaryKey = 'id';

    protected function url(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => str_replace('/storage', '', $value),
        );
    }

    protected function thumbnailUrl(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => str_replace('/storage', '', $value),
        );
    }

    public static function getAllFile()
    {
        $files = File::orderBy('created_at', 'desc')->get();

        return $files;
    }

    public static function getAllFileGroupByMime()
    {
        $files     = File::orderBy('created_at', 'desc')->get();
        $file_mime = [];
        foreach ($files as $key => $value) {
            $file_mime[$value->mime][$value['id']]['name']          = $value->name;
            $file_mime[$value->mime][$value['id']]['url']           = $value->url();
            $file_mime[$value->mime][$value['id']]['thumbnail_url'] = $value->thumbnailUrl();
            // $file_mime[$value->id_parent]['children'][$value->id_category] = $value->id_category . ' - ' . $value->categoriesLang()->shop()->first()->name;
        }
        $collection = collect(
            $file_mime,
        );

        return $collection;
    }

    public static function fileUpload($data)
    {
        $id = File::insert(
            [
                'type'          => $data['type'],
                'name'          => $data['name'],
                'url'           => $data['url'],
                'thumbnail_url' => $data['thumbnail_url'],
                // 'description' => 0,
                'mime'          => $data['mime'],
                'size'          => $data['size'],
                'created_at'    => now(),
                'updated_at'    => now(),
            ]
        );
    }
}
