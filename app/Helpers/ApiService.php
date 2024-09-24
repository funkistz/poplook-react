<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class ApiService
{

    public static function injectParams($params)
    {
        $params['apikey'] = env("API_KEY");

        return $params;
    }

    public static function getDomain($params)
    {
        if (!empty($params['api_url'])) {
            return $params['api_url'];
        }

        if (!empty($params['dev'])) {
            return env("API_URL_DEV");
        } else {
            return env("API_URL");
        }
    }

    public static function get($url, $params = null)
    {
        $response = Http::withoutVerifying()->get(self::getDomain($params) . $url, self::injectParams($params));

        // dd(self::injectParams($params));

        $response = $response->json();

        if (!empty($response) && $response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }

    public static function post($url, $params = null)
    {

        $response = Http::withoutVerifying()->asForm()->post(self::getDomain($params) . $url, self::injectParams($params));
        $response = $response->json();

        if ($response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }

    public static function put($url, $params = null)
    {
        $response = Http::withoutVerifying()->asForm()->put(self::getDomain($params) . $url, self::injectParams($params));
        $response = $response->json();

        if ($response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }

    public static function delete($url, $params = null)
    {
        $response = Http::withoutVerifying()->asForm()->delete(self::getDomain($params) . $url, self::injectParams($params));
        $response = $response->json();

        if ($response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }
}
