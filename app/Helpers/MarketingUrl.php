<?php

namespace App\Helpers;

class MarketingUrl
{

    public static function urlConverter($type, $link)
    {
        if($type == 'category') {
            return env('API_DOMAIN') . 'en/' . $link;;
        }

        if($type == 'product') {
            return env('API_DOMAIN') . 'en/web-notification/' . $link . '-web-notification';
        }

        if($type == 'page') {
            return env('API_DOMAIN') . 'page/' . $link;
        }

        if($type == 'external') {
            return $link;
        }

        return null;
    }
}
