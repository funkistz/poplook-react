<?php

namespace App\Services\Marketing\Email;
use App\Mail\Campaign\Email\BirthdayEdm;
use App\Models\Marketing\Campaign;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Picqer\Barcode\BarcodeGeneratorHTML;
use Picqer\Barcode\BarcodeGeneratorJPG;

class DynamicEmailService
{
    public function birthdayEmailSendOut($data)
    {
        $generator = new BarcodeGeneratorHTML();

        $campaignTier = Campaign\CampaignPresetSetting::where([
            'loyalty_level' => $data['tier'],
            'shop_id' => $data['shop_id'],
        ])->first();

        $campaign = Campaign::find($campaignTier->campaign_id);

        $name = str_replace("{{name}}", ucwords( $data['name']), $campaign->mail->subject);

        $decode = html_entity_decode($campaign->template->template->html);
        $imgTag = '<img src="' . $this->generateBarcodeImage($data['code']) . '" alt="Barcode: ' . htmlspecialchars($data['code']) . '" style="width: 200px; height: 48px;">';

        $html = str_replace("{{voucher_code}}", $data['code'], $decode);
        $htmllad = str_replace("{{voucher_barcode}}",
            $imgTag
            , $html);
//        $htmlfix = str_replace("position:relative;", "position:absolute;margin-left:30px;", $htmllad);

        Mail::to($data['email'], $data['name'])->send(new BirthdayEdm($name,$htmllad));
    }

    public function generateBarcodeImage($code)
    {
        $generator = new BarcodeGeneratorJPG();
        $barcodeImage = $generator->getBarcode($code, $generator::TYPE_CODE_128);

        $filename = $code . '.jpg';

        $folderPath = 'birthday/barcode/';
        $filePath = $folderPath . $filename;

        Storage::disk('public')->put($filePath, $barcodeImage);

        return Storage::disk('public')->url($filePath);


    }
}
