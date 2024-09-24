<?php

namespace App\Services\Marketing\Email;

use App\Models\Marketing\Campaign;
use App\Models\Marketing\Design\TemplateDesign;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class DesignService
{
    public function uploadDesignTemplate($data)
    {

        $fileName = Carbon::now()->format('YmdHis');
        $extractPath = storage_path('/app/marketing/email/design/'.$fileName);

        $campaign = Campaign::where('uuid', $data->campaign_id)->first();

        $zip = new \ZipArchive();

        if ($zip->open($data->design[0]) == TRUE)
        {
            $zip->extractTo($extractPath);
            $zip->close();
        }else{
            return response()->json(['error' => 'Failed to open ZIP file.'], 500);
        }

        $files = scandir($extractPath);
//        print_r($files);
        $resp = [];
        foreach ($files as $file)
        {
            if ($file != '.' && $file != '..') {
                $filePath = $extractPath . '/' . $file;


                if (is_file($filePath)) {
                    $extension = pathinfo($filePath, PATHINFO_EXTENSION);
                    $s3BaseUrl = Storage::disk('s3')->url('email/assets/'.$fileName.'/');

//                    print_r($extension);
                    if ($extension == 'html') {
                        $content = file_get_contents($filePath);
                        $update  = $this->replaceImageSrcWithS3($content, $s3BaseUrl);
//                        $reuest = json_encode([
//                            "name" => $fileName,
//                            "editor" => "design",
//                            "subject" => "Test",
//                            "html_content" => "".$update."",
//                        ]);
//                        $p = $sendGrid->client->designs()->post(json_decode($reuest));
//
//                        array_push($resp, [
//                            'response' => $p->body()
//                        ]);
                        $template = TemplateDesign::create([
                            'template_name' => $campaign->campaign_name.'-'.$fileName,
                            'template_type' => 'email',
                            'html' => $update,

                        ]);

                        $campaignDesign = Campaign\CampaignDesign::where([
                            'campaign_id' => $campaign->id,
                        ])->first();

                        if (empty($campaignDesign)){
                            $template->campaign()->create([
                                'campaign_id' => $campaign->id,
                            ]);
                        }else{
                            $campaignDesign->update([
                                'template_design_id' => $template->id,
                            ]);
                        }
                    }
                }

                if (is_dir($filePath)) {

                    $current = 'marketing/email/design/'.$fileName.'/'.$file;
                    $newLocation = 'public/email/campaign/'.$fileName.'/images';

                    $inFiles = Storage::allFiles($current);

                    foreach ($inFiles as $inFile)
                    {
                        $fp = storage_path('/app/'.$inFile);
                        $move = str_replace($current, 'email/assets/'.$fileName.'/images', $inFile);

                        $t = Storage::disk('s3')->put($move, file_get_contents($fp));

                        $v = Storage::disk('s3')->setVisibility($move, 'public');

                        array_push($resp, $t);
                    }

                    Storage::deleteDirectory($current);


                }


            }
        }

        return true;
    }

    public function extractUploadAndModifyHtml($request)
    {
        $campaign = Campaign::where('uuid', $request->campaign_id)->first();

        // Path to the uploaded zip file
        $zipFilePath = $request->design[0];
        $fileName = Carbon::now()->format('YmdHis');
        $extractToPath = storage_path('/app/marketing/email/design/'.$fileName);
//        $extractToPath = storage_path('app/public/extracted');

        // Ensure the extract path exists
        if (!Storage::exists('/app/marketing/email/design/')) {
            Storage::makeDirectory('/app/marketing/email/design/');
        }

        // Extract the ZIP file
        $this->extractZipFile($zipFilePath, $extractToPath);

        // Process the extracted files
        $this->processExtractedFiles('/app/marketing/email/design/'.$fileName, $fileName, $campaign);

        return response()->json(['message' => 'Files processed and uploaded to S3 successfully.']);
    }

    private function extractZipFile($zipFilePath, $extractToPath)
    {
        $zip = new \ZipArchive();
        if ($zip->open($zipFilePath) === TRUE) {
            $zip->extractTo($extractToPath);
            $zip->close();
        } else {
            throw new \Exception('Failed to open ZIP file.');
        }

        // Check for nested zip files and extract them
        $files = scandir($extractToPath);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) == 'zip') {
                $nestedZipPath = $extractToPath . '/' . $file;
                $nestedExtractToPath = $extractToPath . '/' . pathinfo($file, PATHINFO_FILENAME);
                $this->extractZipFile($nestedZipPath, $nestedExtractToPath);
            }
        }
    }

    private function processExtractedFiles($directory, $filename, $campaign)
    {
        $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator(storage_path($directory)));
        $meow = [];
        $s3 = [];
        foreach ($iterator as $file) {
            if ($file->isFile()) {
                $filePath = $file->getPathname();

//                dd(str_replace(storage_path('app/'), '', $filePath));
//                $s3BaseUrl = Storage::disk('s3')->url(str_replace(storage_path('app/'), '', $filePath));
//                array_push($s3, $s3BaseUrl);
//                exit();
                if (pathinfo($filePath, PATHINFO_EXTENSION) == 'html') {
                    // Process HTML files
                    $htmlContent = file_get_contents($filePath);
                    $updatedHtmlContent = $this->replaceImageSrcWithS3($htmlContent, $filePath);

                    //remove empty hidden file
                    if ($updatedHtmlContent == "\n"){
                        return;
                    }

                    $template = TemplateDesign::create([
                        'template_name' => $file->getFilename(),
                        'html' =>  htmlentities($updatedHtmlContent),
                        'template_type' => 'email',
                    ]);
                    $campaignDesign = Campaign\CampaignDesign::where([
                        'campaign_id' => $campaign->id,
                    ])->first();

                    if (empty($campaignDesign)){
                        $template->campaign()->create([
                            'campaign_id' => $campaign->id,
                        ]);
                    }else{
                        $campaignDesign->update([
                            'template_design_id' => $template->id,
                        ]);
                    }

                } else {
                    $relativePath = str_replace(storage_path('app/'), '', $filePath);

                    if (!empty($relativePath)) {
                        $store = Storage::disk('s3')->put($relativePath, file_get_contents($filePath));

                    }
                }
            }
        }

    }

    private function replaceImageSrcWithS3($htmlContent, $filePath)
    {
        // Use DOMDocument to parse and modify HTML

        $dom = new \DOMDocument();
        @$dom->loadHTML($htmlContent, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $images = $dom->getElementsByTagName('img');
        $base = [];
        foreach ($images as $img) {
            $src = $img->getAttribute('src');
            if (!empty($src)) {
                // Determine the relative path of the image
                $relativeImagePath = $this->normalizePath($filePath, $src);
                $relativePath = str_replace(storage_path('app/'), '', $relativeImagePath);

//                if (!empty($relativePath))
//                {
//                    array_push($base, $relativePath);
//                }
                $s3Url = null;

                if (!empty($relativePath))
                {
                    $s3Url = Storage::disk('s3')->url($relativePath);
                }


                $img->setAttribute('src', $s3Url);
            }

        }

        return $dom->saveHTML();
    }

    private function normalizePath($filePath, $src)
    {
        // Ensure correct handling of relative paths
        $directory = dirname($filePath);
        return realpath($directory . '/' . $src);
    }
}
