<?php

namespace App\Helpers;

use Intervention\Image\Facades\Image;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class UploadFile
{

    public function uploadFile($req, $isApp = false)
    {
        // $this->validate($request, [
        //     'file' => 'required|image|mimes:jpg,jpeg,png,gif,svg,mp4|max:10240000',
        // ]);
        $manager = new ImageManager(new Driver());

        $converted_size = $this->fileSize($req);

        $image         = $req;
        $input['file'] = time() + $req->getSize() . '.' . $image->getClientOriginalExtension();
        if ($isApp)
        {
            $input['image'] = time() + $req->getSize() . '.'.$image->getClientOriginalExtension();
        }else{
            $input['image'] = time() + $req->getSize() . '.webp';


        }


        $file_ext      = $image->getClientOriginalExtension();
        $oriMaxSize    = 1920;
        $thumbMaxSize  = 300;
        $path = "storage/uploads/";

        if ($file_ext == 'mp4') {
            # code...
            $name            = $image->getClientOriginalName();
            $destinationPath = public_path($path . 'video');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath);
            }
            // normal
            $image->move($destinationPath, $input['file']);
            // end
            $url  = $path . 'video/' . $input['file'];
            return [
                'name'          => $name,
                'url'           => $url,
                'thumbnail_url' => '',
                'mime'          => $file_ext,
                'size'          => $converted_size,
                'type'          => 'video',
            ];
        }

        $thumbDirPath    = public_path($path . 'thumbnail');
        $destinationPath = public_path($path . 'images');
        $mime            = $image->getMimeType();
        $name            = $image->getClientOriginalName();
        $imgFile         = $manager->read($image);

        //intervention
        $img = $manager->read($image);
        // dd($thumbDirPath);

        if (!file_exists($thumbDirPath)) {
            mkdir($thumbDirPath);
        }
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath);
        }

        if ($file_ext == 'gif')
        {
            $imgFile->scaleDown(width: $thumbMaxSize)->save($thumbDirPath."/".$input['file']);
            $img->save($destinationPath."/".$input['file']);
            $thumbnailUrl = $path . 'thumbnail/' .$input['file'] ;
            $url          = $path . 'images/' .  $input['file'];
        }elseif ($isApp == true)
        {
            $imgFile->scaleDown(width: $thumbMaxSize)->save($thumbDirPath."/".$input['image']);
            $img->save($destinationPath."/".$input['image']);
            $thumbnailUrl = $path . 'thumbnail/' .$input['image'];
            $url          = $path . 'images/' . $input['image'];
        }
        else{
            //thumbnail
            $imgFile->scaleDown(width: $thumbMaxSize)->toWebp(75)->save($thumbDirPath."/".$input['image']);
            //normnal
            $img->toWebp(75)->save($destinationPath."/".$input['image']);
            $thumbnailUrl = $path . 'thumbnail/' .$input['image'];
            $url          = $path . 'images/' . $input['image'];
        }


        return [
            'name'          => $name,
            'url'           => $url,
            'thumbnail_url' => $thumbnailUrl,
            'mime'          => $mime,
            'size'          => $converted_size,
            'type'          => 'image',
        ];
    }

    public function fileSize($file, $precision = 2)
    {
        $size = $file->getSize();


        if ($size > 0) {
            $size = (int) $size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');

            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        }

        return $size;
    }
}
